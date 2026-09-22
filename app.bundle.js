(()=>{var yn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},nu=0,jc=1,iu=2;var Ur=1,aa=2,Ns=3,Pi=0,tn=1,Ie=2,Vn=0,Us=1,Qc=2,tl=3,el=4,su=5;var Zi=100,ru=101,ou=102,au=103,cu=104,lu=200,hu=201,uu=202,du=203,nl=204,il=205,fu=206,pu=207,mu=208,gu=209,_u=210,xu=211,yu=212,vu=213,Mu=214,wo=0,Ao=1,Co=2,_s=3,Ro=4,Po=5,Io=6,Lo=7,sl=0,Su=1,bu=2,Rn=0,rl=1,ol=2,al=3,Fr=4,cl=5,ll=6,hl=7;var ul=300,Ii=301,Ji=302,ca=303,la=304,Or=306,xs=1e3,xn=1001,ys=1002,Ue=1003,ha=1004;var Ki=1005;var Fe=1006,Fs=1007;var kn=1008;var rn=1009,dl=1010,fl=1011,Os=1012,ua=1013,Pn=1014,In=1015,Ln=1016,da=1017,fa=1018,Bs=1020,pl=35902,ml=35899,gl=1021,_l=1022,on=1023,Bn=1026,Li=1027,xl=1028,pa=1029,Di=1030,ma=1031;var ga=1033,Br=33776,zr=33777,Vr=33778,kr=33779,_a=35840,xa=35841,ya=35842,va=35843,Ma=36196,Sa=37492,ba=37496,Ea=37488,Ta=37489,Hr=37490,wa=37491,Aa=37808,Ca=37809,Ra=37810,Pa=37811,Ia=37812,La=37813,Da=37814,Na=37815,Ua=37816,Fa=37817,Oa=37818,Ba=37819,za=37820,Va=37821,ka=36492,Ha=36494,Ga=36495,Wa=36283,Xa=36284,Gr=36285,qa=36286;var Gi=2300,vs=2301,Eo=2302,kc=2303,Hc=2400,Gc=2401,Wc=2402;var Eu=3200;var Ya=0,Tu=1,Dn="",ke="srgb",sr="srgb-linear",rr="linear",_e="srgb";var To=7680;var wu=519,Au=512,Cu=513,Ru=514,Za=515,Pu=516,Iu=517,Ja=518,Lu=519,Du=35044;var yl="300 es",Tn=2e3,Ms=2001;function cf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function lf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function or(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Nu(){let i=or("canvas");return i.style.display="block",i}var bh={},Ss=null;function vl(...i){let t="THREE."+i.shift();Ss?Ss("log",t,...i):console.log(t,...i)}function Uu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function kt(...i){i=Uu(i);let t="THREE."+i.shift();if(Ss)Ss("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Wt(...i){i=Uu(i);let t="THREE."+i.shift();if(Ss)Ss("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Hi(...i){let t=i.join(" ");t in bh||(bh[t]=!0,kt(...i))}function Fu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Ou={[wo]:Ao,[Co]:Io,[Ro]:Lo,[_s]:Po,[Ao]:wo,[Io]:Co,[Lo]:Ro,[Po]:_s},An=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Eh=1234567,tr=Math.PI/180,bs=180/Math.PI;function $i(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function Qt(i,t,e){return Math.max(t,Math.min(e,i))}function Ml(i,t){return(i%t+t)%t}function hf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function uf(i,t,e){return i!==t?(e-i)/(t-i):0}function er(i,t,e){return(1-e)*i+e*t}function df(i,t,e,n){return er(i,t,1-Math.exp(-e*n))}function ff(i,t=1){return t-Math.abs(Ml(i,t*2)-t)}function pf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function mf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function gf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function _f(i,t){return i+Math.random()*(t-i)}function xf(i){return i*(.5-Math.random())}function yf(i){i!==void 0&&(Eh=i);let t=Eh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vf(i){return i*tr}function Mf(i){return i*bs}function Sf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function bf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ef(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Tf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*d,c*u,a*l);break;case"YZY":i.set(c*u,a*h,c*d,a*l);break;case"ZXZ":i.set(c*d,c*u,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $e(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ii={DEG2RAD:tr,RAD2DEG:bs,generateUUID:$i,clamp:Qt,euclideanModulo:Ml,mapLinear:hf,inverseLerp:uf,lerp:er,damp:df,pingpong:ff,smoothstep:pf,smootherstep:mf,randInt:gf,randFloat:_f,randFloatSpread:xf,seededRandom:yf,degToRad:vf,radToDeg:Mf,isPowerOfTwo:Sf,ceilPowerOfTwo:bf,floorPowerOfTwo:Ef,setQuaternionFromProperEuler:Tf,normalize:$e,denormalize:ms},ut=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(d!==y||c!==u||l!==f||h!==m){let g=c*u+l*f+h*m+d*y;g<0&&(u=-u,f=-f,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let b=Math.acos(g),w=Math.sin(b);p=Math.sin(p*b)/w,a=Math.sin(a*b)/w,c=c*p+u*a,l=l*p+f*a,h=h*p+m*a,d=d*p+y*a}else{c=c*p+u*a,l=l*p+f*a,h=h*p+m*a,d=d*p+y*a;let b=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=b,l*=b,h*=b,d*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*d+c*f-l*u,t[e+1]=c*m+h*u+l*d-a*f,t[e+2]=l*m+h*f+a*u-c*d,t[e+3]=h*m-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),u=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d+u*f*m;break;case"YZX":this._x=u*h*d+l*f*m,this._y=l*f*d+u*h*m,this._z=l*h*m-u*f*d,this._w=l*h*d-u*f*m;break;case"XZY":this._x=u*h*d-l*f*m,this._y=l*f*d-u*h*m,this._z=l*h*m+u*f*d,this._w=l*h*d+u*f*m;break;default:kt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Th.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Th.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return gc.copy(this).projectOnVector(t),this.sub(gc)}reflect(t){return this.sub(gc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},gc=new A,Th=new je,Yt=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],b=s[1],w=s[4],_=s[7],M=s[2],S=s[5],R=s[8];return r[0]=o*y+a*b+c*M,r[3]=o*g+a*w+c*S,r[6]=o*p+a*_+c*R,r[1]=l*y+h*b+d*M,r[4]=l*g+h*w+d*S,r[7]=l*p+h*_+d*R,r[2]=u*y+f*b+m*M,r[5]=u*g+f*w+m*S,r[8]=u*p+f*_+m*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=d*y,t[1]=(s*l-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=u*y,t[4]=(h*e-s*c)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*c-l*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_c.makeScale(t,e)),this}rotate(t){return Hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_c.makeRotation(-t)),this}translate(t,e){return Hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_c.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},_c=new Yt,wh=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ah=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wf(){let i={enabled:!0,workingColorSpace:sr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===_e&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===_e&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sr]:{primaries:t,whitePoint:n,transfer:rr,toXYZ:wh,fromXYZ:Ah,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:n,transfer:_e,toXYZ:wh,fromXYZ:Ah,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),i}var oe=wf();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ns,Es=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ns===void 0&&(ns=or("canvas")),ns.width=t.width,ns.height=t.height;let s=ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=or("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=$n(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($n(e[n]/255)*255):e[n]=$n(e[n]);return{data:e,width:t.width,height:t.height}}else return kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Af=0,jn=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=$i(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xc(s[o].image)):r.push(xc(s[o]))}else r=xc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function xc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Es.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(kt("Texture: Unable to serialize Texture."),{})}var Cf=0,yc=new A,Qe=class i extends An{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=xn,s=xn,r=Fe,o=kn,a=on,c=rn,l=i.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=$i(),this.name="",this.source=new jn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yc).x}get height(){return this.source.getSize(yc).y}get depth(){return this.source.getSize(yc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ul)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xs:t.x=t.x-Math.floor(t.x);break;case xn:t.x=t.x<0?0:1;break;case ys:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xs:t.y=t.y-Math.floor(t.y);break;case xn:t.y=t.y<0?0:1;break;case ys:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=ul;Qe.DEFAULT_ANISOTROPY=1;var Re=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(l+1)/2,_=(f+1)/2,M=(p+1)/2,S=(h+u)/4,R=(d+y)/4,x=(m+g)/4;return w>_&&w>M?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=S/n,r=R/n):_>M?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=S/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=R/r,s=x/r),this.set(n,s,r,e),this}let b=Math.sqrt((g-m)*(g-m)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(d-y)/b,this.z=(u-h)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Do=class extends An{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Qe(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Fe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new jn(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},sn=class extends Do{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ar=class extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var No=class extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var he=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,d,u,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,d,u,f,m,y,g)}set(t,e,n,s,r,o,a,c,l,h,d,u,f,m,y,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),o=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,m=a*h,y=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+m*l,e[5]=u-y*l,e[9]=-a*c,e[2]=y-u*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let u=c*h,f=c*d,m=l*h,y=l*d;e[0]=u+y*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=y+u*a,e[10]=o*c}else if(t.order==="ZXY"){let u=c*h,f=c*d,m=l*h,y=l*d;e[0]=u-y*a,e[4]=-o*d,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=y-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let u=o*h,f=o*d,m=a*h,y=a*d;e[0]=c*h,e[4]=m*l-f,e[8]=u*l+y,e[1]=c*d,e[5]=y*l+u,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let u=o*c,f=o*l,m=a*c,y=a*l;e[0]=c*h,e[4]=y-u*d,e[8]=m*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+m,e[10]=u-y*d}else if(t.order==="XZY"){let u=o*c,f=o*l,m=a*c,y=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+y,e[5]=o*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=a*h,e[10]=y*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rf,t,Pf)}lookAt(t,e,n){let s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),mi.crossVectors(n,ln),mi.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),mi.crossVectors(n,ln)),mi.normalize(),to.crossVectors(ln,mi),s[0]=mi.x,s[4]=to.x,s[8]=ln.x,s[1]=mi.y,s[5]=to.y,s[9]=ln.y,s[2]=mi.z,s[6]=to.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],b=n[3],w=n[7],_=n[11],M=n[15],S=s[0],R=s[4],x=s[8],C=s[12],I=s[1],N=s[5],k=s[9],z=s[13],O=s[2],H=s[6],$=s[10],q=s[14],at=s[3],j=s[7],et=s[11],ot=s[15];return r[0]=o*S+a*I+c*O+l*at,r[4]=o*R+a*N+c*H+l*j,r[8]=o*x+a*k+c*$+l*et,r[12]=o*C+a*z+c*q+l*ot,r[1]=h*S+d*I+u*O+f*at,r[5]=h*R+d*N+u*H+f*j,r[9]=h*x+d*k+u*$+f*et,r[13]=h*C+d*z+u*q+f*ot,r[2]=m*S+y*I+g*O+p*at,r[6]=m*R+y*N+g*H+p*j,r[10]=m*x+y*k+g*$+p*et,r[14]=m*C+y*z+g*q+p*ot,r[3]=b*S+w*I+_*O+M*at,r[7]=b*R+w*N+_*H+M*j,r[11]=b*x+w*k+_*$+M*et,r[15]=b*C+w*z+_*q+M*ot,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],y=t[7],g=t[11],p=t[15],b=c*f-l*u,w=a*f-l*d,_=a*u-c*d,M=o*f-l*h,S=o*u-c*h,R=o*d-a*h;return e*(y*b-g*w+p*_)-n*(m*b-g*M+p*S)+s*(m*w-y*M+p*R)-r*(m*_-y*S+g*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],y=t[13],g=t[14],p=t[15],b=e*a-n*o,w=e*c-s*o,_=e*l-r*o,M=n*c-s*a,S=n*l-r*a,R=s*l-r*c,x=h*y-d*m,C=h*g-u*m,I=h*p-f*m,N=d*g-u*y,k=d*p-f*y,z=u*p-f*g,O=b*z-w*k+_*N+M*I-S*C+R*x;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/O;return t[0]=(a*z-c*k+l*N)*H,t[1]=(s*k-n*z-r*N)*H,t[2]=(y*R-g*S+p*M)*H,t[3]=(u*S-d*R-f*M)*H,t[4]=(c*I-o*z-l*C)*H,t[5]=(e*z-s*I+r*C)*H,t[6]=(g*_-m*R-p*w)*H,t[7]=(h*R-u*_+f*w)*H,t[8]=(o*k-a*I+l*x)*H,t[9]=(n*I-e*k-r*x)*H,t[10]=(m*S-y*_+p*b)*H,t[11]=(d*_-h*S-f*b)*H,t[12]=(a*C-o*N-c*x)*H,t[13]=(e*N-n*C+s*x)*H,t[14]=(y*w-m*M-g*b)*H,t[15]=(h*M-d*w+u*b)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,m=r*d,y=o*h,g=o*d,p=a*d,b=c*l,w=c*h,_=c*d,M=n.x,S=n.y,R=n.z;return s[0]=(1-(y+p))*M,s[1]=(f+_)*M,s[2]=(m-w)*M,s[3]=0,s[4]=(f-_)*S,s[5]=(1-(u+p))*S,s[6]=(g+b)*S,s[7]=0,s[8]=(m+w)*R,s[9]=(g-b)*R,s[10]=(1-(u+y))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=is.set(s[0],s[1],s[2]).length(),a=is.set(s[4],s[5],s[6]).length(),c=is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Sn.copy(this);let l=1/o,h=1/a,d=1/c;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,e.setFromRotationMatrix(Sn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Tn,c=!1){let l=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),m,y;if(c)m=r/(o-r),y=o*r/(o-r);else if(a===Tn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ms)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Tn,c=!1){let l=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),m,y;if(c)m=1/(o-r),y=o/(o-r);else if(a===Tn)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ms)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},is=new A,Sn=new he,Rf=new A(0,0,0),Pf=new A(1,1,1),mi=new A,to=new A,ln=new A,Ch=new he,Rh=new je,Qn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ch.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ch,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rh.setFromEuler(this),this.setFromQuaternion(Rh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var Ts=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},If=0,Ph=new A,ss=new je,qn=new he,eo=new A,Zs=new A,Lf=new A,Df=new je,Ih=new A(1,0,0),Lh=new A(0,1,0),Dh=new A(0,0,1),Nh={type:"added"},Nf={type:"removed"},rs={type:"childadded",child:null},vc={type:"childremoved",child:null},He=class i extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new A,e=new Qn,n=new je,s=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new Yt}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Ih,t)}rotateY(t){return this.rotateOnAxis(Lh,t)}rotateZ(t){return this.rotateOnAxis(Dh,t)}translateOnAxis(t,e){return Ph.copy(t).applyQuaternion(this.quaternion),this.position.add(Ph.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ih,t)}translateY(t){return this.translateOnAxis(Lh,t)}translateZ(t){return this.translateOnAxis(Dh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?eo.copy(t):eo.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Zs,eo,this.up):qn.lookAt(eo,Zs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(qn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Wt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nh),rs.child=t,this.dispatchEvent(rs),rs.child=null):Wt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nf),vc.child=t,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nh),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,Lf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,Df,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};He.DEFAULT_UP=new A(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zt=class extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}},Uf={type:"move"},ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;l.inputState.pinching&&u>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Uf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},no={h:0,s:0,l:0};function Mc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ht=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=Ml(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Mc(o,r,t+1/3),this.g=Mc(o,r,t),this.b=Mc(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let n=Bu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return oe.workingToColorSpace(qe.copy(this),t),Math.round(Qt(qe.r*255,0,255))*65536+Math.round(Qt(qe.g*255,0,255))*256+Math.round(Qt(qe.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(qe.copy(this),e);let n=qe.r,s=qe.g,r=qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=ke){oe.workingToColorSpace(qe.copy(this),t);let e=qe.r,n=qe.g,s=qe.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(gi),this.setHSL(gi.h+t,gi.s+e,gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(gi),t.getHSL(no);let n=er(gi.h,no.h,e),s=er(gi.s,no.s,e),r=er(gi.l,no.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qe=new Ht;Ht.NAMES=Bu;var Mi=class extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},bn=new A,Yn=new A,Sc=new A,Zn=new A,os=new A,as=new A,Uh=new A,bc=new A,Ec=new A,Tc=new A,wc=new Re,Ac=new Re,Cc=new Re,vi=class i{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),bn.subVectors(t,e),s.cross(bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){bn.subVectors(s,e),Yn.subVectors(n,e),Sc.subVectors(t,e);let o=bn.dot(bn),a=bn.dot(Yn),c=bn.dot(Sc),l=Yn.dot(Yn),h=Yn.dot(Sc),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(l*c-a*h)*u,m=(o*h-a*c)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return wc.setScalar(0),Ac.setScalar(0),Cc.setScalar(0),wc.fromBufferAttribute(t,e),Ac.fromBufferAttribute(t,n),Cc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(wc,r.x),o.addScaledVector(Ac,r.y),o.addScaledVector(Cc,r.z),o}static isFrontFacing(t,e,n,s){return bn.subVectors(n,e),Yn.subVectors(t,e),bn.cross(Yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),bn.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),bc.subVectors(t,n);let c=os.dot(bc),l=as.dot(bc);if(c<=0&&l<=0)return e.copy(n);Ec.subVectors(t,s);let h=os.dot(Ec),d=as.dot(Ec);if(h>=0&&d<=h)return e.copy(s);let u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(os,o);Tc.subVectors(t,r);let f=os.dot(Tc),m=as.dot(Tc);if(m>=0&&f<=m)return e.copy(r);let y=f*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(as,a);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Uh.subVectors(r,s),a=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(Uh,a);let p=1/(g+y+u);return o=y*p,a=u*p,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},zn=class{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),io.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),io.copy(n.boundingBox)),io.applyMatrix4(t.matrixWorld),this.union(io)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),so.subVectors(this.max,Js),cs.subVectors(t.a,Js),ls.subVectors(t.b,Js),hs.subVectors(t.c,Js),_i.subVectors(ls,cs),xi.subVectors(hs,ls),Bi.subVectors(cs,hs);let e=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Bi.z,Bi.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Bi.z,0,-Bi.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Bi.y,Bi.x,0];return!Rc(e,cs,ls,hs,so)||(e=[1,0,0,0,1,0,0,0,1],!Rc(e,cs,ls,hs,so))?!1:(ro.crossVectors(_i,xi),e=[ro.x,ro.y,ro.z],Rc(e,cs,ls,hs,so))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Jn=[new A,new A,new A,new A,new A,new A,new A,new A],En=new A,io=new zn,cs=new A,ls=new A,hs=new A,_i=new A,xi=new A,Bi=new A,Js=new A,so=new A,ro=new A,zi=new A;function Rc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){zi.fromArray(i,r);let a=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),c=t.dot(zi),l=e.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Ne=new A,oo=new ut,Ff=0,Ce=class extends An{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ff++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Du,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)oo.fromBufferAttribute(this,e),oo.applyMatrix3(t),this.setXY(e,oo.x,oo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var cr=class extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var lr=class extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ne=class extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}},Of=new zn,Ks=new A,Pc=new A,Wi=class{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Of.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ks.subVectors(t,this.center);let e=Ks.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ks.copy(t.center).add(Pc)),this.expandByPoint(Ks.copy(t.center).sub(Pc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Bf=0,_n=new he,Ic=new He,us=new A,hn=new zn,$s=new zn,Ve=new A,xe=class i extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(cf(t)?lr:cr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,n){return _n.makeTranslation(t,e,n),this.applyMatrix4(_n),this}scale(t,e,n){return _n.makeScale(t,e,n),this.applyMatrix4(_n),this}lookAt(t){return Ic.lookAt(t),Ic.updateMatrix(),this.applyMatrix4(Ic.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];$s.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(hn.min,$s.min),hn.expandByPoint(Ve),Ve.addVectors(hn.max,$s.max),hn.expandByPoint(Ve)):(hn.expandByPoint($s.min),hn.expandByPoint($s.max))}hn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ve));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ve.fromBufferAttribute(a,l),c&&(us.fromBufferAttribute(t,l),Ve.add(us)),s=Math.max(s,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Ce(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new A,c[x]=new A;let l=new A,h=new A,d=new A,u=new ut,f=new ut,m=new ut,y=new A,g=new A;function p(x,C,I){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,C),d.fromBufferAttribute(n,I),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,C),m.fromBufferAttribute(r,I),h.sub(l),d.sub(l),f.sub(u),m.sub(u);let N=1/(f.x*m.y-m.x*f.y);isFinite(N)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(N),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(N),a[x].add(y),a[C].add(y),a[I].add(y),c[x].add(g),c[C].add(g),c[I].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,C=b.length;x<C;++x){let I=b[x],N=I.start,k=I.count;for(let z=N,O=N+k;z<O;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let w=new A,_=new A,M=new A,S=new A;function R(x){M.fromBufferAttribute(s,x),S.copy(M);let C=a[x];w.copy(C),w.sub(M.multiplyScalar(M.dot(C))).normalize(),_.crossVectors(S,C);let N=_.dot(c[x])<0?-1:1;o.setXYZW(x,w.x,w.y,w.z,N)}for(let x=0,C=b.length;x<C;++x){let I=b[x],N=I.start,k=I.count;for(let z=N,O=N+k;z<O;z+=3)R(t.getX(z+0)),R(t.getX(z+1)),R(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new A,r=new A,o=new A,a=new A,c=new A,l=new A,h=new A,d=new A;if(t)for(let u=0,f=t.count;u<f;u+=3){let m=t.getX(u+0),y=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h),f=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*h;for(let p=0;p<h;p++)u[m++]=l[f++]}return new Ce(u,h,d)}if(this.index===null)return kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){let u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){let f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Lc=new A,zf=new A,Vf=new Yt,un=class{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Lc.subVectors(n,e).cross(zf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Lc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Vf.getNormalMatrix(t),s=this.coplanarPoint(Lc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},kf=0,ti=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=Us,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nl,this.blendDst=il,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=To,this.stencilZFail=To,this.stencilZPass=To,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){kt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ht().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new un().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Kn=new A,Dc=new A,ao=new A,co=new A,Si=class{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Dc.copy(t).add(e).multiplyScalar(.5),ao.copy(e).sub(t).normalize(),co.copy(this.origin).sub(Dc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(ao),a=co.dot(this.direction),c=-co.dot(ao),l=co.lengthSq(),h=Math.abs(1-o*o),d,u,f,m;if(h>0)if(d=o*c-a,u=o*a-c,m=r*h,d>=0)if(u>=-m)if(u<=m){let y=1/h;d*=y,u*=y,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=m?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Dc).addScaledVector(ao,u),f}intersectSphere(t,e){if(t.radius<0)return null;Kn.subVectors(t.center,this.origin);let n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,m=e.x-o.x,y=e.y-o.y,g=e.z-o.z,p=n.x-o.x,b=n.y-o.y,w=n.z-o.z,_=Math.abs(c),M=Math.abs(l),S=Math.abs(h),R,x,C,I,N,k,z,O,H,$,q,at;if(_>=M&&_>=S?(C=c,k=d,H=m,at=p,c>=0?(R=l,x=h,I=u,N=f,z=y,O=g,$=b,q=w):(R=h,x=l,I=f,N=u,z=g,O=y,$=w,q=b)):M>=S?(C=l,k=u,H=y,at=b,l>=0?(R=h,x=c,I=f,N=d,z=g,O=m,$=w,q=p):(R=c,x=h,I=d,N=f,z=m,O=g,$=p,q=w)):(C=h,k=f,H=g,at=w,h>=0?(R=c,x=l,I=d,N=u,z=m,O=y,$=p,q=b):(R=l,x=c,I=u,N=d,z=y,O=m,$=b,q=p)),C===0)return null;let j=R/C,et=x/C,ot=1/C,_t=I-j*k,xt=N-et*k,te=z-j*H,Jt=O-et*H,jt=$-j*at,nt=q-et*at,ct=jt*Jt-nt*te,mt=_t*nt-xt*jt,Ft=te*xt-Jt*_t;if(s){if(ct<0||mt<0||Ft<0)return null}else if((ct<0||mt<0||Ft<0)&&(ct>0||mt>0||Ft>0))return null;let bt=ct+mt+Ft;if(bt===0)return null;let Vt=ot*(ct*k+mt*H+Ft*at);return(bt>0?Vt<0:Vt>0)?null:this.at(Vt/bt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ei=class extends ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=sl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Fh=new he,Vi=new Si,lo=new Wi,Oh=new A,ho=new A,uo=new A,fo=new A,Nc=new A,po=new A,Bh=new A,mo=new A,ae=class extends He{constructor(t=new xe,e=new ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){po.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],d=r[c];h!==0&&(Nc.fromBufferAttribute(d,t),o?po.addScaledVector(Nc,h):po.addScaledVector(Nc.sub(e),h))}e.add(po)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lo.copy(n.boundingSphere),lo.applyMatrix4(r),Vi.copy(t.ray).recast(t.near),!(lo.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(lo,Oh)===null||Vi.origin.distanceToSquared(Oh)>(t.far-t.near)**2))&&(Fh.copy(r).invert(),Vi.copy(t.ray).applyMatrix4(Fh),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=o[g.materialIndex],b=Math.max(g.start,f.start),w=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=b,M=w;_<M;_+=3){let S=a.getX(_),R=a.getX(_+1),x=a.getX(_+2);s=go(this,p,t,n,l,h,d,S,R,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let b=a.getX(g),w=a.getX(g+1),_=a.getX(g+2);s=go(this,o,t,n,l,h,d,b,w,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=u.length;m<y;m++){let g=u[m],p=o[g.materialIndex],b=Math.max(g.start,f.start),w=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=b,M=w;_<M;_+=3){let S=_,R=_+1,x=_+2;s=go(this,p,t,n,l,h,d,S,R,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let b=g,w=g+1,_=g+2;s=go(this,o,t,n,l,h,d,b,w,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Hf(i,t,e,n,s,r,o,a){let c;if(t.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Pi,a),c===null)return null;mo.copy(a),mo.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(mo);return l<e.near||l>e.far?null:{distance:l,point:mo.clone(),object:i}}function go(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,ho),i.getVertexPosition(c,uo),i.getVertexPosition(l,fo);let h=Hf(i,t,e,n,ho,uo,fo,Bh);if(h){let d=new A;vi.getBarycoord(Bh,ho,uo,fo,d),s&&(h.uv=vi.getInterpolatedAttribute(s,a,c,l,d,new ut)),r&&(h.uv1=vi.getInterpolatedAttribute(r,a,c,l,d,new ut)),o&&(h.normal=vi.getInterpolatedAttribute(o,a,c,l,d,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new A,materialIndex:0};vi.getNormal(ho,uo,fo,u.normal),h.face=u,h.barycoord=d}return h}var Uo=class extends Qe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ue,h=Ue,d,u){super(null,o,a,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ki=new Wi,Gf=new ut(.5,.5),_o=new A,As=class{constructor(t=new un,e=new un,n=new un,s=new un,r=new un,o=new un){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],b=r[12],w=r[13],_=r[14],M=r[15];if(s[0].setComponents(l-o,f-h,p-m,M-b).normalize(),s[1].setComponents(l+o,f+h,p+m,M+b).normalize(),s[2].setComponents(l+a,f+d,p+y,M+w).normalize(),s[3].setComponents(l-a,f-d,p-y,M-w).normalize(),n)s[4].setComponents(c,u,g,_).normalize(),s[5].setComponents(l-c,f-u,p-g,M-_).normalize();else if(s[4].setComponents(l-c,f-u,p-g,M-_).normalize(),e===Tn)s[5].setComponents(l+c,f+u,p+g,M+_).normalize();else if(e===Ms)s[5].setComponents(c,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(t){ki.center.set(0,0,0);let e=Gf.distanceTo(t.center);return ki.radius=.7071067811865476+e,ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(_o.x=s.normal.x>0?t.max.x:t.min.x,_o.y=s.normal.y>0?t.max.y:t.min.y,_o.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_o)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Cs=class extends ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Fo=new A,Oo=new A,zh=new he,js=new Si,xo=new Wi,Uc=new A,Vh=new A,hr=class extends He{constructor(t=new xe,e=new Cs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Fo.fromBufferAttribute(e,s-1),Oo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Fo.distanceTo(Oo);t.setAttribute("lineDistance",new ne(n,1))}else kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xo.copy(n.boundingSphere),xo.applyMatrix4(s),xo.radius+=r,t.ray.intersectsSphere(xo)===!1)return;zh.copy(s).invert(),js.copy(t.ray).applyMatrix4(zh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=h.getX(y),b=h.getX(y+1),w=yo(this,t,js,c,p,b,y);w&&e.push(w)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=yo(this,t,js,c,y,g,m-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=yo(this,t,js,c,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){let y=yo(this,t,js,c,m-1,f,m-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function yo(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(Fo.fromBufferAttribute(a,s),Oo.fromBufferAttribute(a,r),e.distanceSqToSegment(Fo,Oo,Uc,Vh)>n)return;Uc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Uc);if(!(l<t.near||l>t.far))return{distance:l,point:Vh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var bi=class extends Qe{constructor(t,e,n,s,r,o,a,c,l,h,d,u){super(null,o,a,c,l,h,s,r,d,u),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}};var ur=class extends Qe{constructor(t=[],e=Ii,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Ei=class extends Qe{constructor(t,e,n=Pn,s,r,o,a=Ue,c=Ue,l,h=Bn,d=1){if(h!==Bn&&h!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new jn(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Bo=class extends Ei{constructor(t,e=Pn,n=Ii,s,r,o=Ue,a=Ue,c,l=Bn){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},dr=class extends Qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ye=class i extends xe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(d,2));function m(y,g,p,b,w,_,M,S,R,x,C){let I=_/R,N=M/x,k=_/2,z=M/2,O=S/2,H=R+1,$=x+1,q=0,at=0,j=new A;for(let et=0;et<$;et++){let ot=et*N-z;for(let _t=0;_t<H;_t++){let xt=_t*I-k;j[y]=xt*b,j[g]=ot*w,j[p]=O,l.push(j.x,j.y,j.z),j[y]=0,j[g]=0,j[p]=S>0?1:-1,h.push(j.x,j.y,j.z),d.push(_t/R),d.push(1-et/x),q+=1}}for(let et=0;et<x;et++)for(let ot=0;ot<R;ot++){let _t=u+ot+H*et,xt=u+ot+H*(et+1),te=u+(ot+1)+H*(et+1),Jt=u+(ot+1)+H*et;c.push(_t,xt,Jt),c.push(xt,te,Jt),at+=6}a.addGroup(f,at,C),f+=at,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ae=class i extends xe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],m=0,y=[],g=n/2,p=0;b(),o===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new ne(d,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(f,2));function b(){let _=new A,M=new A,S=0,R=(e-t)/n;for(let x=0;x<=r;x++){let C=[],I=x/r,N=I*(e-t)+t;for(let k=0;k<=s;k++){let z=k/s,O=z*c+a,H=Math.sin(O),$=Math.cos(O);M.x=N*H,M.y=-I*n+g,M.z=N*$,d.push(M.x,M.y,M.z),_.set(H,R,$).normalize(),u.push(_.x,_.y,_.z),f.push(z,1-I),C.push(m++)}y.push(C)}for(let x=0;x<s;x++)for(let C=0;C<r;C++){let I=y[C][x],N=y[C+1][x],k=y[C+1][x+1],z=y[C][x+1];(t>0||C!==0)&&(h.push(I,N,z),S+=3),(e>0||C!==r-1)&&(h.push(N,k,z),S+=3)}l.addGroup(p,S,0),p+=S}function w(_){let M=m,S=new ut,R=new A,x=0,C=_===!0?t:e,I=_===!0?1:-1;for(let k=1;k<=s;k++)d.push(0,g*I,0),u.push(0,I,0),f.push(.5,.5),m++;let N=m;for(let k=0;k<=s;k++){let O=k/s*c+a,H=Math.cos(O),$=Math.sin(O);R.x=C*$,R.y=g*I,R.z=C*H,d.push(R.x,R.y,R.z),u.push(0,I,0),S.x=H*.5+.5,S.y=$*.5*I+.5,f.push(S.x,S.y),m++}for(let k=0;k<s;k++){let z=M+k,O=N+k;_===!0?h.push(O,O+1,z):h.push(O+1,O,z),x+=3}l.addGroup(p,x,_===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var fr=class i extends xe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){let w=new A,_=new A,M=new A;for(let S=0;S<e.length;S+=3)f(e[S+0],w),f(e[S+1],_),f(e[S+2],M),c(w,_,M,b)}function c(b,w,_,M){let S=M+1,R=[];for(let x=0;x<=S;x++){R[x]=[];let C=b.clone().lerp(_,x/S),I=w.clone().lerp(_,x/S),N=S-x;for(let k=0;k<=N;k++)k===0&&x===S?R[x][k]=C:R[x][k]=C.clone().lerp(I,k/N)}for(let x=0;x<S;x++)for(let C=0;C<2*(S-x)-1;C++){let I=Math.floor(C/2);C%2===0?(u(R[x][I+1]),u(R[x+1][I]),u(R[x][I])):(u(R[x][I+1]),u(R[x+1][I+1]),u(R[x+1][I]))}}function l(b){let w=new A;for(let _=0;_<r.length;_+=3)w.x=r[_+0],w.y=r[_+1],w.z=r[_+2],w.normalize().multiplyScalar(b),r[_+0]=w.x,r[_+1]=w.y,r[_+2]=w.z}function h(){let b=new A;for(let w=0;w<r.length;w+=3){b.x=r[w+0],b.y=r[w+1],b.z=r[w+2];let _=g(b)/2/Math.PI+.5,M=p(b)/Math.PI+.5;o.push(_,1-M)}m(),d()}function d(){for(let b=0;b<o.length;b+=6){let w=o[b+0],_=o[b+2],M=o[b+4],S=Math.max(w,_,M),R=Math.min(w,_,M);S>.9&&R<.1&&(w<.2&&(o[b+0]+=1),_<.2&&(o[b+2]+=1),M<.2&&(o[b+4]+=1))}}function u(b){r.push(b.x,b.y,b.z)}function f(b,w){let _=b*3;w.x=t[_+0],w.y=t[_+1],w.z=t[_+2]}function m(){let b=new A,w=new A,_=new A,M=new A,S=new ut,R=new ut,x=new ut;for(let C=0,I=0;C<r.length;C+=9,I+=6){b.set(r[C+0],r[C+1],r[C+2]),w.set(r[C+3],r[C+4],r[C+5]),_.set(r[C+6],r[C+7],r[C+8]),S.set(o[I+0],o[I+1]),R.set(o[I+2],o[I+3]),x.set(o[I+4],o[I+5]),M.copy(b).add(w).add(_).divideScalar(3);let N=g(M);y(S,I+0,b,N),y(R,I+2,w,N),y(x,I+4,_,N)}}function y(b,w,_,M){M<0&&b.x===1&&(o[w]=b.x-1),_.x===0&&_.z===0&&(o[w]=M/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ut:new A);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new A,s=[],r=[],o=[],a=new A,c=new he;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new A)}r[0]=new A,o[0]=new A;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Qt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Qt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Rs=class extends dn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},zo=class extends Rs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Sl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var kh=new A,Hh=new A,Fc=new Sl,Oc=new Sl,Bc=new Sl,Ps=class extends dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new A){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Hh.subVectors(s[0],s[1]).add(s[0]),l=Hh);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(kh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=kh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(d),f),y=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),Fc.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,m,y,g),Oc.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,m,y,g),Bc.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(Fc.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),Oc.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Bc.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Fc.calc(c),Oc.calc(c),Bc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new A().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Gh(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Wf(i,t){let e=1-i;return e*e*t}function Xf(i,t){return 2*(1-i)*i*t}function qf(i,t){return i*i*t}function nr(i,t,e,n){return Wf(i,t)+Xf(i,e)+qf(i,n)}function Yf(i,t){let e=1-i;return e*e*e*t}function Zf(i,t){let e=1-i;return 3*e*e*i*t}function Jf(i,t){return 3*(1-i)*i*i*t}function Kf(i,t){return i*i*i*t}function ir(i,t,e,n,s){return Yf(i,t)+Zf(i,e)+Jf(i,n)+Kf(i,s)}var pr=class extends dn{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ir(t,s.x,r.x,o.x,a.x),ir(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Vo=class extends dn{constructor(t=new A,e=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ir(t,s.x,r.x,o.x,a.x),ir(t,s.y,r.y,o.y,a.y),ir(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},mr=class extends dn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ko=class extends dn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},gr=class extends dn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(nr(t,s.x,r.x,o.x),nr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_r=class extends dn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(nr(t,s.x,r.x,o.x),nr(t,s.y,r.y,o.y),nr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xr=class extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(Gh(a,c.x,l.x,h.x,d.x),Gh(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},Ho=Object.freeze({__proto__:null,ArcCurve:zo,CatmullRomCurve3:Ps,CubicBezierCurve:pr,CubicBezierCurve3:Vo,EllipseCurve:Rs,LineCurve:mr,LineCurve3:ko,QuadraticBezierCurve:gr,QuadraticBezierCurve3:_r,SplineCurve:xr}),Go=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ho[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Ho[s.type]().fromJSON(s))}return this}},Xi=class extends Go{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new mr(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new gr(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new pr(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new xr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Rs(t,e,n,s,r,o,a,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Cn=class extends Xi{constructor(t){super(t),this.uuid=$i(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Xi().fromJSON(s))}return this}};function $f(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=zu(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=np(i,t,r,e)),i.length>80*e){a=i[0],c=i[1];let h=a,d=c;for(let u=e;u<s;u+=e){let f=i[u],m=i[u+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>d&&(d=m)}l=Math.max(h-a,d-c),l=l!==0?32767/l:0}return yr(r,o,e,a,c,l,0),o}function zu(i,t,e,n,s){let r;if(s===fp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Wh(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Wh(o/n|0,i[o],i[o+1],r);return r&&Is(r,r.next)&&(Mr(r),r=r.next),r}function qi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Is(e,e.next)||Pe(e.prev,e,e.next)===0)){if(Mr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function yr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&ap(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Qf(i,n,s,r):jf(i)){t.push(c.i,i.i,l.i),Mr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=tp(qi(i),t),yr(i,t,e,n,s,r,2)):o===2&&ep(i,t,e,n,s,r):yr(qi(i),t,e,n,s,r,1);break}}}function jf(i){let t=i.prev,e=i,n=i.next;if(Pe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),d=Math.min(a,c,l),u=Math.max(s,r,o),f=Math.max(a,c,l),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Qs(s,a,r,c,o,l,m.x,m.y)&&Pe(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Qf(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Pe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,c,l),m=Math.min(h,d,u),y=Math.max(a,c,l),g=Math.max(h,d,u),p=Xc(f,m,t,e,n),b=Xc(y,g,t,e,n),w=i.prevZ,_=i.nextZ;for(;w&&w.z>=p&&_&&_.z<=b;){if(w.x>=f&&w.x<=y&&w.y>=m&&w.y<=g&&w!==s&&w!==o&&Qs(a,h,c,d,l,u,w.x,w.y)&&Pe(w.prev,w,w.next)>=0||(w=w.prevZ,_.x>=f&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Qs(a,h,c,d,l,u,_.x,_.y)&&Pe(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;w&&w.z>=p;){if(w.x>=f&&w.x<=y&&w.y>=m&&w.y<=g&&w!==s&&w!==o&&Qs(a,h,c,d,l,u,w.x,w.y)&&Pe(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;_&&_.z<=b;){if(_.x>=f&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Qs(a,h,c,d,l,u,_.x,_.y)&&Pe(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function tp(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Is(n,s)&&ku(n,e,e.next,s)&&vr(n,s)&&vr(s,n)&&(t.push(n.i,e.i,s.i),Mr(e),Mr(e.next),e=i=s),e=e.next}while(e!==i);return qi(e)}function ep(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&hp(o,a)){let c=Hu(o,a);o=qi(o,o.next),c=qi(c,c.next),yr(o,t,e,n,s,r,0),yr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function np(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=zu(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(lp(l))}s.sort(ip);for(let r=0;r<s.length;r++)e=sp(s[r],e);return e}function ip(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function sp(i,t){let e=rp(i,t);if(!e)return t;let n=Hu(e,i);return qi(n,n.next),qi(e,e.next)}function rp(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Is(i,e))return e;do{if(Is(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Vu(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);vr(e,i)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&op(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function op(i,t){return Pe(i.prev,i,t.prev)<0&&Pe(t.next,i,i.next)<0}function ap(i,t,e,n){let s=i;do s.z===0&&(s.z=Xc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,cp(s)}function cp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Xc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function lp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Vu(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Qs(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Vu(i,t,e,n,s,r,o,a)}function hp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!up(i,t)&&(vr(i,t)&&vr(t,i)&&dp(i,t)&&(Pe(i.prev,i,t.prev)||Pe(i,t.prev,t))||Is(i,t)&&Pe(i.prev,i,i.next)>0&&Pe(t.prev,t,t.next)>0)}function Pe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Is(i,t){return i.x===t.x&&i.y===t.y}function ku(i,t,e,n){let s=Mo(Pe(i,t,e)),r=Mo(Pe(i,t,n)),o=Mo(Pe(e,n,i)),a=Mo(Pe(e,n,t));return!!(s!==r&&o!==a||s===0&&vo(i,e,t)||r===0&&vo(i,n,t)||o===0&&vo(e,i,n)||a===0&&vo(e,t,n))}function vo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Mo(i){return i>0?1:i<0?-1:0}function up(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ku(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function vr(i,t){return Pe(i.prev,i,i.next)<0?Pe(i,t,i.next)>=0&&Pe(i,i.prev,t)>=0:Pe(i,t,i.prev)<0||Pe(i,i.next,t)<0}function dp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Hu(i,t){let e=qc(i.i,i.x,i.y),n=qc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Wh(i,t,e,n){let s=qc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function qc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function fp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Yc=class{static triangulate(t,e,n=2){return $f(t,e,n)}},wn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Xh(t),qh(n,t);let o=t.length;e.forEach(Xh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,qh(n,e[c]);let a=Yc.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Xh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function qh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ni=class i extends xe{constructor(t=new Cn([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new ne(s,3)),this.setAttribute("uv",new ne(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,b=e.UVGenerator!==void 0?e.UVGenerator:pp,w,_=!1,M,S,R,x;if(p){w=p.getSpacedPoints(h),_=!0,u=!1;let L=p.isCatmullRomCurve3?p.closed:!1;M=p.computeFrenetFrames(h,L),S=new A,R=new A,x=new A}u||(g=0,f=0,m=0,y=0);let C=a.extractPoints(l),I=C.shape,N=C.holes;if(!wn.isClockWise(I)){I=I.reverse();for(let L=0,T=N.length;L<T;L++){let D=N[L];wn.isClockWise(D)&&(N[L]=D.reverse())}}function z(L){let D=10000000000000001e-36,V=L[0];for(let B=1;B<=L.length;B++){let Y=B%L.length,tt=L[Y],rt=tt.x-V.x,ft=tt.y-V.y,U=rt*rt+ft*ft,Xt=Math.max(Math.abs(tt.x),Math.abs(tt.y),Math.abs(V.x),Math.abs(V.y)),qt=D*Xt*Xt;if(U<=qt){L.splice(Y,1),B--;continue}V=tt}}z(I),N.forEach(z);let O=N.length,H=I;for(let L=0;L<O;L++){let T=N[L];I=I.concat(T)}function $(L,T,D){return T||Wt("ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(T,D)}let q=I.length;function at(L,T,D){let V,B,Y,tt=L.x-T.x,rt=L.y-T.y,ft=D.x-L.x,U=D.y-L.y,Xt=tt*tt+rt*rt,qt=tt*U-rt*ft;if(Math.abs(qt)>Number.EPSILON){let P=Math.sqrt(Xt),v=Math.sqrt(ft*ft+U*U),X=T.x-rt/P,K=T.y+tt/P,it=D.x-U/v,pt=D.y+ft/v,gt=((it-X)*U-(pt-K)*ft)/(tt*U-rt*ft);V=X+tt*gt-L.x,B=K+rt*gt-L.y;let st=V*V+B*B;if(st<=2)return new ut(V,B);Y=Math.sqrt(st/2)}else{let P=!1;tt>Number.EPSILON?ft>Number.EPSILON&&(P=!0):tt<-Number.EPSILON?ft<-Number.EPSILON&&(P=!0):Math.sign(rt)===Math.sign(U)&&(P=!0),P?(V=-rt,B=tt,Y=Math.sqrt(Xt)):(V=tt,B=rt,Y=Math.sqrt(Xt/2))}return new ut(V/Y,B/Y)}let j=[];for(let L=0,T=H.length,D=T-1,V=L+1;L<T;L++,D++,V++)D===T&&(D=0),V===T&&(V=0),j[L]=at(H[L],H[D],H[V]);let et=[],ot,_t=j.concat();for(let L=0,T=O;L<T;L++){let D=N[L];ot=[];for(let V=0,B=D.length,Y=B-1,tt=V+1;V<B;V++,Y++,tt++)Y===B&&(Y=0),tt===B&&(tt=0),ot[V]=at(D[V],D[Y],D[tt]);et.push(ot),_t=_t.concat(ot)}let xt;if(g===0)xt=wn.triangulateShape(H,N);else{let L=[],T=[];for(let D=0;D<g;D++){let V=D/g,B=f*Math.cos(V*Math.PI/2),Y=m*Math.sin(V*Math.PI/2)+y;for(let tt=0,rt=H.length;tt<rt;tt++){let ft=$(H[tt],j[tt],Y);mt(ft.x,ft.y,-B),V===0&&L.push(ft)}for(let tt=0,rt=O;tt<rt;tt++){let ft=N[tt];ot=et[tt];let U=[];for(let Xt=0,qt=ft.length;Xt<qt;Xt++){let P=$(ft[Xt],ot[Xt],Y);mt(P.x,P.y,-B),V===0&&U.push(P)}V===0&&T.push(U)}}xt=wn.triangulateShape(L,T)}let te=xt.length,Jt=m+y;for(let L=0;L<q;L++){let T=u?$(I[L],_t[L],Jt):I[L];_?(R.copy(M.normals[0]).multiplyScalar(T.x),S.copy(M.binormals[0]).multiplyScalar(T.y),x.copy(w[0]).add(R).add(S),mt(x.x,x.y,x.z)):mt(T.x,T.y,0)}for(let L=1;L<=h;L++)for(let T=0;T<q;T++){let D=u?$(I[T],_t[T],Jt):I[T];_?(R.copy(M.normals[L]).multiplyScalar(D.x),S.copy(M.binormals[L]).multiplyScalar(D.y),x.copy(w[L]).add(R).add(S),mt(x.x,x.y,x.z)):mt(D.x,D.y,d/h*L)}for(let L=g-1;L>=0;L--){let T=L/g,D=f*Math.cos(T*Math.PI/2),V=m*Math.sin(T*Math.PI/2)+y;for(let B=0,Y=H.length;B<Y;B++){let tt=$(H[B],j[B],V);mt(tt.x,tt.y,d+D)}for(let B=0,Y=N.length;B<Y;B++){let tt=N[B];ot=et[B];for(let rt=0,ft=tt.length;rt<ft;rt++){let U=$(tt[rt],ot[rt],V);_?mt(U.x,U.y+w[h-1].y,w[h-1].x+D):mt(U.x,U.y,d+D)}}}jt(),nt();function jt(){let L=s.length/3;if(u){let T=0,D=q*T;for(let V=0;V<te;V++){let B=xt[V];Ft(B[2]+D,B[1]+D,B[0]+D)}T=h+g*2,D=q*T;for(let V=0;V<te;V++){let B=xt[V];Ft(B[0]+D,B[1]+D,B[2]+D)}}else{for(let T=0;T<te;T++){let D=xt[T];Ft(D[2],D[1],D[0])}for(let T=0;T<te;T++){let D=xt[T];Ft(D[0]+q*h,D[1]+q*h,D[2]+q*h)}}n.addGroup(L,s.length/3-L,0)}function nt(){let L=s.length/3,T=0;ct(H,T),T+=H.length;for(let D=0,V=N.length;D<V;D++){let B=N[D];ct(B,T),T+=B.length}n.addGroup(L,s.length/3-L,1)}function ct(L,T){let D=L.length;for(;--D>=0;){let V=D,B=D-1;B<0&&(B=L.length-1);for(let Y=0,tt=h+g*2;Y<tt;Y++){let rt=q*Y,ft=q*(Y+1),U=T+V+rt,Xt=T+B+rt,qt=T+B+ft,P=T+V+ft;bt(U,Xt,qt,P)}}}function mt(L,T,D){c.push(L),c.push(T),c.push(D)}function Ft(L,T,D){Vt(L),Vt(T),Vt(D);let V=s.length/3,B=b.generateTopUV(n,s,V-3,V-2,V-1);F(B[0]),F(B[1]),F(B[2])}function bt(L,T,D,V){Vt(L),Vt(T),Vt(V),Vt(T),Vt(D),Vt(V);let B=s.length/3,Y=b.generateSideWallUV(n,s,B-6,B-3,B-2,B-1);F(Y[0]),F(Y[1]),F(Y[3]),F(Y[1]),F(Y[2]),F(Y[3])}function Vt(L){s.push(c[L*3+0]),s.push(c[L*3+1]),s.push(c[L*3+2])}function F(L){r.push(L.x),r.push(L.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return mp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ho[s.type]().fromJSON(s)),new i(n,t.options)}},pp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ut(r,o),new ut(a,c),new ut(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ut(o,1-c),new ut(l,1-d),new ut(u,1-m),new ut(y,1-p)]:[new ut(a,1-c),new ut(h,1-d),new ut(f,1-m),new ut(g,1-p)]}};function mp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Sr=class i extends fr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var br=class i extends fr{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Yi=class i extends xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=t/a,u=e/c,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let b=p*u-o;for(let w=0;w<l;w++){let _=w*d-r;m.push(_,-b,0),y.push(0,0,1),g.push(w/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let w=b+l*p,_=b+l*(p+1),M=b+1+l*(p+1),S=b+1+l*p;f.push(w,_,S),f.push(_,M,S)}this.setIndex(f),this.setAttribute("position",new ne(m,3)),this.setAttribute("normal",new ne(y,3)),this.setAttribute("uv",new ne(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Er=class i extends xe{constructor(t=new Cn([new ut(0,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ne(s,3)),this.setAttribute("normal",new ne(r,3)),this.setAttribute("uv",new ne(o,2));function l(h){let d=s.length/3,u=h.extractPoints(e),f=u.shape,m=u.holes;wn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let b=m[g];wn.isClockWise(b)===!0&&(m[g]=b.reverse())}let y=wn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let b=m[g];f=f.concat(b)}for(let g=0,p=f.length;g<p;g++){let b=f[g];s.push(b.x,b.y,0),r.push(0,0,1),o.push(b.x,b.y)}for(let g=0,p=y.length;g<p;g++){let b=y[g],w=b[0]+d,_=b[1]+d,M=b[2]+d;n.push(w,_,M),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return gp(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function gp(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Tr=class i extends xe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],d=[],u=new A,f=new A,m=new A;for(let y=0;y<=n;y++){let g=o+y/n*a;for(let p=0;p<=s;p++){let b=p/s*r;f.x=(t+e*Math.cos(g))*Math.cos(b),f.y=(t+e*Math.cos(g))*Math.sin(b),f.z=e*Math.sin(g),l.push(f.x,f.y,f.z),u.x=t*Math.cos(b),u.y=t*Math.sin(b),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(p/s),d.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=s;g++){let p=(s+1)*y+g-1,b=(s+1)*(y-1)+g-1,w=(s+1)*(y-1)+g,_=(s+1)*y+g;c.push(p,b,_),c.push(b,w,_)}this.setIndex(c),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var wr=class i extends xe{constructor(t=new _r(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new A,c=new A,l=new ut,h=new A,d=[],u=[],f=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new ne(d,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(f,2));function y(){for(let w=0;w<e;w++)g(w);g(r===!1?e:0),b(),p()}function g(w){h=t.getPointAt(w/e,h);let _=o.normals[w],M=o.binormals[w];for(let S=0;S<=s;S++){let R=S/s*Math.PI*2,x=Math.sin(R),C=-Math.cos(R);c.x=C*_.x+x*M.x,c.y=C*_.y+x*M.y,c.z=C*_.z+x*M.z,c.normalize(),u.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,d.push(a.x,a.y,a.z)}}function p(){for(let w=1;w<=e;w++)for(let _=1;_<=s;_++){let M=(s+1)*(w-1)+(_-1),S=(s+1)*w+(_-1),R=(s+1)*w+_,x=(s+1)*(w-1)+_;m.push(M,S,x),m.push(S,R,x)}}function b(){for(let w=0;w<=e;w++)for(let _=0;_<=s;_++)l.x=w/e,l.y=_/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Ho[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ji(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Yh(s))s.isRenderTargetTexture?(kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Yh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ze(i){let t={};for(let e=0;e<i.length;e++){let n=ji(i[e]);for(let s in n)t[s]=n[s]}return t}function Yh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function _p(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var Gu={clone:ji,merge:Ze},xp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fn=class extends ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xp,this.fragmentShader=yp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ji(t.uniforms),this.uniformsGroups=_p(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ht().setHex(s.value);break;case"v2":this.uniforms[n].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new A().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Yt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new he().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Wo=class extends fn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},le=class extends ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ya,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ar=class extends le{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Xo=class extends ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},qo=class extends ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ds(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function zc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ti=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Yo=class extends Ti{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hc,endingEnd:Hc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Gc:r=t,a=2*e-n;break;case Wc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Gc:o=t,c=2*n-e;break;case Wc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),y=m*m,g=y*m,p=-u*g+2*u*y-u*m,b=(1+u)*g+(-1.5-2*u)*y+(-.5+u)*m+1,w=(-1-f)*g+(1.5+f)*y+.5*m,_=f*g-f*y;for(let M=0;M!==a;++M)r[M]=p*o[h+M]+b*o[l+M]+w*o[c+M]+_*o[d+M];return r}},Zo=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[l+u]*d+o[c+u]*h;return r}},Jo=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ko=class extends Ti{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-e)/(s-e),y=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*y+o[c+g]*m;return r}let u=a*2,f=t-1;for(let m=0;m!==a;++m){let y=o[l+m],g=o[c+m],p=f*u+m*2,b=d[p],w=d[p+1],_=t*u+m*2,M=h[_],S=h[_+1],R=Mp(n,e,b,M,s);r[m]=Wu(R,y,w,S,g)}return r}};function Wu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function vp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Mp(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Wu(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=vp(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var pn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ds(e,this.TimeBufferType),this.values=ds(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ds(t.times,Array),values:ds(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),zc(t.settings)&&(n.settings={inTangents:ds(t.settings.inTangents,Array),outTangents:ds(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Jo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Yo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Ko(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Gi:e=this.InterpolantFactoryMethodDiscrete;break;case vs:e=this.InterpolantFactoryMethodLinear;break;case Eo:e=this.InterpolantFactoryMethodSmooth;break;case kc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return kt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gi;case this.InterpolantFactoryMethodLinear:return vs;case this.InterpolantFactoryMethodSmooth:return Eo;case this.InterpolantFactoryMethodBezier:return kc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;zc(this.settings)&&(Zh(this.settings.inTangents,t),Zh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Wt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Wt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Wt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){Wt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&lf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Wt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Eo,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let d=a*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let y=e[d+m];if(y!==e[u+m]||y!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,zc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Zh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=vs;var wi=class extends pn{constructor(t,e,n){super(t,e,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=Gi;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var $o=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}};$o.prototype.ValueTypeName="color";var jo=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}};jo.prototype.ValueTypeName="number";var Qo=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)je.slerpFlat(r,0,o,l-a,o,l,c);return r}},Cr=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Qo(this.times,this.values,this.getValueSize(),t)}};Cr.prototype.ValueTypeName="quaternion";Cr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends pn{constructor(t,e,n){super(t,e,n)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=Gi;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var ta=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}};ta.prototype.ValueTypeName="vector";var ea=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){let d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){let f=l[d],m=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Xu=new ea,na=class{constructor(t){this.manager=t!==void 0?t:Xu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};na.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rr=class extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Pr=class extends Rr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Vc=new he,Jh=new A,Kh=new A,ia=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new As,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Jh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Jh),Kh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Vc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Vc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Ms||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(Vc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},So=new A,bo=new je,On=new A,Ir=class extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(So,bo,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(So,bo,On.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(So,bo,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(So,bo,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new A,$h=new ut,jh=new ut,nn=class extends Ir{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yi.x,yi.y).multiplyScalar(-t/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-t/yi.z)}getViewSize(t,e){return this.getViewBounds(t,$h,jh),e.subVectors(jh,$h)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ci=class extends Ir{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Zc=class extends ia{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ls=class extends Rr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new Zc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var fs=-90,ps=1,sa=class extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(fs,ps,t,e);s.layers=this.layers,this.add(s);let r=new nn(fs,ps,t,e);r.layers=this.layers,this.add(r);let o=new nn(fs,ps,t,e);o.layers=this.layers,this.add(o);let a=new nn(fs,ps,t,e);a.layers=this.layers,this.add(a);let c=new nn(fs,ps,t,e);c.layers=this.layers,this.add(c);let l=new nn(fs,ps,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ra=class extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var El="\\[\\]\\.:\\/",Sp=new RegExp("["+El+"]","g"),Tl="[^"+El+"]",bp="[^"+El.replace("\\.","")+"]",Ep=/((?:WC+[\/:])*)/.source.replace("WC",Tl),Tp=/(WCOD+)?/.source.replace("WCOD",bp),wp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Tl),Ap=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Tl),Cp=new RegExp("^"+Ep+Tp+wp+Ap+"$"),Rp=["material","materials","bones","map"],Jc=class{constructor(t,e,n){let s=n||ge.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ge=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Sp,"")}static parseTrackName(t){let e=Cp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Rp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){kt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Wt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Wt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Wt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Wt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Wt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){Wt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;Wt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Wt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ge.Composite=Jc;ge.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ge.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ge.prototype.GetterByBindingType=[ge.prototype._getValue_direct,ge.prototype._getValue_array,ge.prototype._getValue_arrayElement,ge.prototype._getValue_toArray];ge.prototype.SetterByBindingTypeAndVersioning=[[ge.prototype._setValue_direct,ge.prototype._setValue_direct_setNeedsUpdate,ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_array,ge.prototype._setValue_array_setNeedsUpdate,ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_arrayElement,ge.prototype._setValue_arrayElement_setNeedsUpdate,ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_fromArray,ge.prototype._setValue_fromArray_setNeedsUpdate,ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var uy=new Float32Array(1);var Qh=new he,Lr=class{constructor(t,e,n=0,s=1/0){this.ray=new Si(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ts,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):Wt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Qh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qh),this}intersectObject(t,e=!0,n=[]){return Kc(t,this,n,e),n.sort(tu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Kc(t[s],this,n,e);return n.sort(tu),n}};function tu(i,t){return i.distance-t.distance}function Kc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Kc(r[o],t,e,!0)}}var Ds=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var $c=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}},eu=new ut,oa=class{constructor(t=new ut(1/0,1/0),e=new ut(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=eu.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,eu).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}};var Dr=class{constructor(){this.type="ShapePath",this.color=new Ht,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(t,e){return this.currentPath=new Xi,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,s){return this.currentPath.quadraticCurveTo(t,e,n,s),this}bezierCurveTo(t,e,n,s,r,o){return this.currentPath.bezierCurveTo(t,e,n,s,r,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(){function t(c,l){let h=!1,d=l.length;for(let u=0,f=d-1;u<d;f=u++){let m=l[u],y=l[f];m.y>c.y!=y.y>c.y&&c.x<(y.x-m.x)*(c.y-m.y)/(y.y-m.y)+m.x&&(h=!h)}return h}function e(c,l){let h=l.getCenter(new ut);if(t(h,c))return h;let d=h.y,u=[],f=c.length;for(let m=0;m<f;m++){let y=c[m],g=c[(m+1)%f];if(y.y>d!=g.y>d){let p=y.x+(d-y.y)*(g.x-y.x)/(g.y-y.y);u.push(p)}}return u.length>1&&(u.sort((m,y)=>m-y),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(kt('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),r=[];for(let c of this.subPaths){let l=c.getPoints();if(l.length<3)continue;let h=wn.area(l);if(h===0)continue;let d=new oa;for(let u=0;u<l.length;u++)d.expandByPoint(l[u]);r.push({subPath:c,points:l,boundingBox:d,interiorPoint:e(l,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<r.length;c++){let l=r[c],h=0;for(let d=c-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(l.boundingBox)&&t(l.interiorPoint,u.points)){l.container=u.exclude?u.container:u,h=u.winding,l.winding+=h;break}}s(l.winding)===s(h)&&(l.exclude=!0)}for(let c of r)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let c of r){if(c.exclude||c.role!=="outer")continue;let l=new Cn;l.curves=c.subPath.curves,o.push(l),a.set(c,l)}for(let c of r){if(c.exclude||c.role!=="hole")continue;let l=a.get(c.container);if(!l)continue;let h=new Xi;h.curves=c.subPath.curves,l.holes.push(h)}return o}},Nr=class extends An{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function wl(i,t,e,n){let s=Pp(n);switch(e){case gl:return i*t;case xl:return i*t/s.components*s.byteLength;case pa:return i*t/s.components*s.byteLength;case Di:return i*t*2/s.components*s.byteLength;case ma:return i*t*2/s.components*s.byteLength;case _l:return i*t*3/s.components*s.byteLength;case on:return i*t*4/s.components*s.byteLength;case ga:return i*t*4/s.components*s.byteLength;case Br:case zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vr:case kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:case va:return Math.max(i,16)*Math.max(t,8)/4;case _a:case ya:return Math.max(i,8)*Math.max(t,8)/2;case Ma:case Sa:case Ea:case Ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ba:case Hr:case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case La:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Da:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Na:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case za:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ka:case Ha:case Ga:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Wa:case Xa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Gr:case qa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pp(i){switch(i){case rn:case dl:return{byteLength:1,components:1};case Os:case fl:case Ln:return{byteLength:2,components:1};case da:case fa:return{byteLength:2,components:4};case Pn:case ua:case In:return{byteLength:4,components:1};case pl:case ml:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function fd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Op(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){let h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],y=d[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let y=d[f];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Bp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zp=`#ifdef USE_ALPHAHASH
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
#endif`,Vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wp=`#ifdef USE_AOMAP
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
#endif`,Xp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qp=`#ifdef USE_BATCHING
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
#endif`,Yp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$p=`#ifdef USE_IRIDESCENCE
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
#endif`,jp=`#ifdef USE_BUMPMAP
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
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,im=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,om=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,am=`#define PI 3.141592653589793
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
} // validated`,cm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lm=`vec3 transformedNormal = objectNormal;
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
#endif`,hm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,um=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pm="gl_FragColor = linearToOutputTexel( gl_FragColor );",mm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gm=`#ifdef USE_ENVMAP
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
#endif`,_m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,xm=`#ifdef USE_ENVMAP
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
#endif`,ym=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vm=`#ifdef USE_ENVMAP
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
#endif`,Mm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Em=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tm=`#ifdef USE_GRADIENTMAP
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
}`,wm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Im=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Um=`PhysicalMaterial material;
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
#endif`,Fm=`uniform sampler2D dfgLUT;
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
}`,Om=`
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
#endif`,Bm=`#if defined( RE_IndirectDiffuse )
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
#endif`,zm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,km=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ym=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zm=`#if defined( USE_POINTS_UV )
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
#endif`,Jm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Km=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$m=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t0=`#ifdef USE_MORPHTARGETS
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
#endif`,e0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,i0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,s0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,a0=`#ifdef USE_NORMALMAP
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
#endif`,c0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,l0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,h0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,d0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,p0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,m0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,g0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,x0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,y0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,v0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,S0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,b0=`float getShadowMask() {
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
}`,E0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,T0=`#ifdef USE_SKINNING
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
#endif`,w0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A0=`#ifdef USE_SKINNING
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
#endif`,C0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,P0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,I0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,L0=`#ifdef USE_TRANSMISSION
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
#endif`,D0=`#ifdef USE_TRANSMISSION
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
#endif`,N0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,B0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,z0=`uniform sampler2D t2D;
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
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,H0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,W0=`#include <common>
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
}`,X0=`#if DEPTH_PACKING == 3200
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
}`,q0=`#define DISTANCE
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
}`,Y0=`#define DISTANCE
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K0=`uniform float scale;
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
}`,$0=`uniform vec3 diffuse;
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
}`,j0=`#include <common>
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
}`,Q0=`uniform vec3 diffuse;
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
}`,tg=`#define LAMBERT
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
}`,eg=`#define LAMBERT
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
}`,ng=`#define MATCAP
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
}`,ig=`#define MATCAP
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
}`,sg=`#define NORMAL
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
}`,rg=`#define NORMAL
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
}`,og=`#define PHONG
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
}`,ag=`#define PHONG
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
}`,cg=`#define STANDARD
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
}`,lg=`#define STANDARD
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
}`,hg=`#define TOON
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
}`,ug=`#define TOON
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
}`,dg=`uniform float size;
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
}`,fg=`uniform vec3 diffuse;
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
}`,pg=`#include <common>
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
}`,mg=`uniform vec3 color;
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
}`,gg=`uniform float rotation;
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
}`,_g=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:Bp,alphahash_pars_fragment:zp,alphamap_fragment:Vp,alphamap_pars_fragment:kp,alphatest_fragment:Hp,alphatest_pars_fragment:Gp,aomap_fragment:Wp,aomap_pars_fragment:Xp,batching_pars_vertex:qp,batching_vertex:Yp,begin_vertex:Zp,beginnormal_vertex:Jp,bsdfs:Kp,iridescence_fragment:$p,bumpmap_pars_fragment:jp,clipping_planes_fragment:Qp,clipping_planes_pars_fragment:tm,clipping_planes_pars_vertex:em,clipping_planes_vertex:nm,color_fragment:im,color_pars_fragment:sm,color_pars_vertex:rm,color_vertex:om,common:am,cube_uv_reflection_fragment:cm,defaultnormal_vertex:lm,displacementmap_pars_vertex:hm,displacementmap_vertex:um,emissivemap_fragment:dm,emissivemap_pars_fragment:fm,colorspace_fragment:pm,colorspace_pars_fragment:mm,envmap_fragment:gm,envmap_common_pars_fragment:_m,envmap_pars_fragment:xm,envmap_pars_vertex:ym,envmap_physical_pars_fragment:Pm,envmap_vertex:vm,fog_vertex:Mm,fog_pars_vertex:Sm,fog_fragment:bm,fog_pars_fragment:Em,gradientmap_pars_fragment:Tm,lightmap_pars_fragment:wm,lights_lambert_fragment:Am,lights_lambert_pars_fragment:Cm,lights_pars_begin:Rm,lights_toon_fragment:Im,lights_toon_pars_fragment:Lm,lights_phong_fragment:Dm,lights_phong_pars_fragment:Nm,lights_physical_fragment:Um,lights_physical_pars_fragment:Fm,lights_fragment_begin:Om,lights_fragment_maps:Bm,lights_fragment_end:zm,lightprobes_pars_fragment:Vm,logdepthbuf_fragment:km,logdepthbuf_pars_fragment:Hm,logdepthbuf_pars_vertex:Gm,logdepthbuf_vertex:Wm,map_fragment:Xm,map_pars_fragment:qm,map_particle_fragment:Ym,map_particle_pars_fragment:Zm,metalnessmap_fragment:Jm,metalnessmap_pars_fragment:Km,morphinstance_vertex:$m,morphcolor_vertex:jm,morphnormal_vertex:Qm,morphtarget_pars_vertex:t0,morphtarget_vertex:e0,normal_fragment_begin:n0,normal_fragment_maps:i0,normal_pars_fragment:s0,normal_pars_vertex:r0,normal_vertex:o0,normalmap_pars_fragment:a0,clearcoat_normal_fragment_begin:c0,clearcoat_normal_fragment_maps:l0,clearcoat_pars_fragment:h0,iridescence_pars_fragment:u0,opaque_fragment:d0,packing:f0,premultiplied_alpha_fragment:p0,project_vertex:m0,dithering_fragment:g0,dithering_pars_fragment:_0,roughnessmap_fragment:x0,roughnessmap_pars_fragment:y0,shadowmap_pars_fragment:v0,shadowmap_pars_vertex:M0,shadowmap_vertex:S0,shadowmask_pars_fragment:b0,skinbase_vertex:E0,skinning_pars_vertex:T0,skinning_vertex:w0,skinnormal_vertex:A0,specularmap_fragment:C0,specularmap_pars_fragment:R0,tonemapping_fragment:P0,tonemapping_pars_fragment:I0,transmission_fragment:L0,transmission_pars_fragment:D0,uv_pars_fragment:N0,uv_pars_vertex:U0,uv_vertex:F0,worldpos_vertex:O0,background_vert:B0,background_frag:z0,backgroundCube_vert:V0,backgroundCube_frag:k0,cube_vert:H0,cube_frag:G0,depth_vert:W0,depth_frag:X0,distance_vert:q0,distance_frag:Y0,equirect_vert:Z0,equirect_frag:J0,linedashed_vert:K0,linedashed_frag:$0,meshbasic_vert:j0,meshbasic_frag:Q0,meshlambert_vert:tg,meshlambert_frag:eg,meshmatcap_vert:ng,meshmatcap_frag:ig,meshnormal_vert:sg,meshnormal_frag:rg,meshphong_vert:og,meshphong_frag:ag,meshphysical_vert:cg,meshphysical_frag:lg,meshtoon_vert:hg,meshtoon_frag:ug,points_vert:dg,points_frag:fg,shadow_vert:pg,shadow_frag:mg,sprite_vert:gg,sprite_frag:_g},Tt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Gn={basic:{uniforms:Ze([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:Ze([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Ht(0)},envMapIntensity:{value:1}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:Ze([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:Ze([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:Ze([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:Ze([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:Ze([Tt.points,Tt.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:Ze([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:Ze([Tt.common,Tt.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:Ze([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:Ze([Tt.sprite,Tt.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distance:{uniforms:Ze([Tt.common,Tt.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distance_vert,fragmentShader:ie.distance_frag},shadow:{uniforms:Ze([Tt.lights,Tt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Gn.physical={uniforms:Ze([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var Ka={r:0,b:0,g:0},xg=new he,pd=new Yt;pd.set(-1,0,0,0,1,0,0,0,1);function yg(i,t,e,n,s,r){let o=new Ht(0),a=s===!0?0:1,c,l,h=null,d=0,u=null;function f(b){let w=b.isScene===!0?b.background:null;if(w&&w.isTexture){let _=b.backgroundBlurriness>0;w=t.get(w,_)}return w}function m(b){let w=!1,_=f(b);_===null?g(o,a):_&&_.isColor&&(g(_,1),w=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,w){let _=f(w);_&&(_.isCubeTexture||_.mapping===Or)?(l===void 0&&(l=new ae(new Ye(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:ji(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xg.makeRotationFromEuler(w.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(pd),l.material.toneMapped=oe.getTransfer(_.colorSpace)!==_e,(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ae(new Yi(2,2),new fn({name:"BackgroundMaterial",uniforms:ji(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=oe.getTransfer(_.colorSpace)!==_e,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function g(b,w){b.getRGB(Ka,bl(i)),e.buffers.color.setClear(Ka.r,Ka.g,Ka.b,w,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,w=1){o.set(b),a=w,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,g(o,a)},render:m,addToRenderList:y,dispose:p}}function vg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(N,k,z,O,H){let $=!1,q=d(N,O,z,k);r!==q&&(r=q,l(r.object)),$=f(N,O,z,H),$&&m(N,O,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,_(N,k,z,O),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function d(N,k,z,O){let H=O.wireframe===!0,$=n[k.id];$===void 0&&($={},n[k.id]=$);let q=N.isInstancedMesh===!0?N.id:0,at=$[q];at===void 0&&(at={},$[q]=at);let j=at[z.id];j===void 0&&(j={},at[z.id]=j);let et=j[H];return et===void 0&&(et=u(c()),j[H]=et),et}function u(N){let k=[],z=[],O=[];for(let H=0;H<e;H++)k[H]=0,z[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:z,attributeDivisors:O,object:N,attributes:{},index:null}}function f(N,k,z,O){let H=r.attributes,$=k.attributes,q=0,at=z.getAttributes();for(let j in at)if(at[j].location>=0){let ot=H[j],_t=$[j];if(_t===void 0&&(j==="instanceMatrix"&&N.instanceMatrix&&(_t=N.instanceMatrix),j==="instanceColor"&&N.instanceColor&&(_t=N.instanceColor)),ot===void 0||ot.attribute!==_t||_t&&ot.data!==_t.data)return!0;q++}return r.attributesNum!==q||r.index!==O}function m(N,k,z,O){let H={},$=k.attributes,q=0,at=z.getAttributes();for(let j in at)if(at[j].location>=0){let ot=$[j];ot===void 0&&(j==="instanceMatrix"&&N.instanceMatrix&&(ot=N.instanceMatrix),j==="instanceColor"&&N.instanceColor&&(ot=N.instanceColor));let _t={};_t.attribute=ot,ot&&ot.data&&(_t.data=ot.data),H[j]=_t,q++}r.attributes=H,r.attributesNum=q,r.index=O}function y(){let N=r.newAttributes;for(let k=0,z=N.length;k<z;k++)N[k]=0}function g(N){p(N,0)}function p(N,k){let z=r.newAttributes,O=r.enabledAttributes,H=r.attributeDivisors;z[N]=1,O[N]===0&&(i.enableVertexAttribArray(N),O[N]=1),H[N]!==k&&(i.vertexAttribDivisor(N,k),H[N]=k)}function b(){let N=r.newAttributes,k=r.enabledAttributes;for(let z=0,O=k.length;z<O;z++)k[z]!==N[z]&&(i.disableVertexAttribArray(z),k[z]=0)}function w(N,k,z,O,H,$,q){q===!0?i.vertexAttribIPointer(N,k,z,H,$):i.vertexAttribPointer(N,k,z,O,H,$)}function _(N,k,z,O){y();let H=O.attributes,$=z.getAttributes(),q=k.defaultAttributeValues;for(let at in $){let j=$[at];if(j.location>=0){let et=H[at];if(et===void 0&&(at==="instanceMatrix"&&N.instanceMatrix&&(et=N.instanceMatrix),at==="instanceColor"&&N.instanceColor&&(et=N.instanceColor)),et!==void 0){let ot=et.normalized,_t=et.itemSize,xt=t.get(et);if(xt===void 0)continue;let te=xt.buffer,Jt=xt.type,jt=xt.bytesPerElement,nt=Jt===i.INT||Jt===i.UNSIGNED_INT||et.gpuType===ua;if(et.isInterleavedBufferAttribute){let ct=et.data,mt=ct.stride,Ft=et.offset;if(ct.isInstancedInterleavedBuffer){for(let bt=0;bt<j.locationSize;bt++)p(j.location+bt,ct.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let bt=0;bt<j.locationSize;bt++)g(j.location+bt);i.bindBuffer(i.ARRAY_BUFFER,te);for(let bt=0;bt<j.locationSize;bt++)w(j.location+bt,_t/j.locationSize,Jt,ot,mt*jt,(Ft+_t/j.locationSize*bt)*jt,nt)}else{if(et.isInstancedBufferAttribute){for(let ct=0;ct<j.locationSize;ct++)p(j.location+ct,et.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let ct=0;ct<j.locationSize;ct++)g(j.location+ct);i.bindBuffer(i.ARRAY_BUFFER,te);for(let ct=0;ct<j.locationSize;ct++)w(j.location+ct,_t/j.locationSize,Jt,ot,_t*jt,_t/j.locationSize*ct*jt,nt)}}else if(q!==void 0){let ot=q[at];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(j.location,ot);break;case 3:i.vertexAttrib3fv(j.location,ot);break;case 4:i.vertexAttrib4fv(j.location,ot);break;default:i.vertexAttrib1fv(j.location,ot)}}}}b()}function M(){C();for(let N in n){let k=n[N];for(let z in k){let O=k[z];for(let H in O){let $=O[H];for(let q in $)h($[q].object),delete $[q];delete O[H]}}delete n[N]}}function S(N){if(n[N.id]===void 0)return;let k=n[N.id];for(let z in k){let O=k[z];for(let H in O){let $=O[H];for(let q in $)h($[q].object),delete $[q];delete O[H]}}delete n[N.id]}function R(N){for(let k in n){let z=n[k];for(let O in z){let H=z[O];if(H[N.id]===void 0)continue;let $=H[N.id];for(let q in $)h($[q].object),delete $[q];delete H[N.id]}}}function x(N){for(let k in n){let z=n[k],O=N.isInstancedMesh===!0?N.id:0,H=z[O];if(H!==void 0){for(let $ in H){let q=H[$];for(let at in q)h(q[at].object),delete q[at];delete H[$]}delete z[O],Object.keys(z).length===0&&delete n[k]}}}function C(){I(),o=!0,r!==s&&(r=s,l(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:I,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:R,initAttributes:y,enableAttribute:g,disableUnusedAttributes:b}}function Mg(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Sg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==on&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){let x=R===Ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==rn&&R!==In&&!x&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(kt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:_,maxSamples:M,samples:S}}function bg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new un,a=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,y=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let b=r?0:n,w=b*4,_=p.clippingState||null;c.value=_,_=h(m,u,w,f);for(let M=0;M!==w;++M)_[M]=e[M];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){let y=d!==null?d.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=f+y*4,b=u.matrixWorldInverse;a.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let w=0,_=f;w!==y;++w,_+=4)o.copy(d[w]).applyMatrix4(b,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}var Vs=4,Eg=6,Tg=20,wg=256,Wr=new Ci,qu=new Ht,Al=null,Cl=0,Rl=0,Pl=!1,Ag=new A,Qi=new A,ja=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Ag}=r;Al=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Rl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Al,Cl,Rl),this._renderer.xr.enabled=Pl,t.scissorTest=!1,zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ii||t.mapping===Ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Al=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Rl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:Ln,format:on,colorSpace:sr,depthBuffer:!1},s=Yu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Cg(r)),this._blurMaterial=Pg(r,t,e),this._ggxMaterial=Rg(r,t,e)}return s}_compileMaterial(t){let e=new ae(new xe,t);this._renderer.compile(e,Wr)}_sceneToCubeUV(t,e,n,s,r){let c=new nn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(qu),d.toneMapping=Rn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new Ye,new ei({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,p=!0):(g.color.copy(qu),p=!0);for(let w=0;w<6;w++){let _=w%3;_===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[w],r.y,r.z)):_===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[w]));let M=this._cubeSize;zs(s,_*M,w>2?M:0,M,M),d.setRenderTarget(s),p&&d.render(y,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=b}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ii||t.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;zs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Wr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-Vs?n-m+Vs:0),p=4*(this._cubeSize-y);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=m-e,zs(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(a,Wr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,zs(t,g,p,3*y,2*y),s.setRenderTarget(t),s.render(a,Wr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Vs?s-this._lodMax+Vs:0),u=4*(this._cubeSize-h);zs(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(c,Wr)}};function Cg(i){let t=[],e=[],n=i,s=i-Vs+1+Eg;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,m=new Float32Array(f*u*d),y=new Float32Array(f*u*d);for(let p=0;p<d;p++){let b=p%3*2/3-1,w=p>2?0:-1,_=[b,w,0,b+2/3,w,0,b+2/3,w+1,0,b,w,0,b+2/3,w+1,0,b,w+1,0];m.set(_,f*u*p);for(let M=0;M<u;M++){let S=h[M*2]*2-1,R=h[M*2+1]*2-1;p===0?Qi.set(1,R,S):p===1?Qi.set(-S,1,-R):p===2?Qi.set(-S,R,1):p===3?Qi.set(-1,R,-S):p===4?Qi.set(-S,-1,R):Qi.set(S,R,-1),Qi.toArray(y,(p*u+M)*f)}}let g=new xe;g.setAttribute("position",new Ce(m,f)),g.setAttribute("outputDirection",new Ce(y,f)),e.push(new ae(g,null)),n>Vs&&n--}return{lodMeshes:e,sizeLods:t}}function Yu(i,t,e){let n=new sn(i,t,e);return n.texture.mapping=Or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Rg(i,t,e){return new fn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ec(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Pg(i,t,e){return new fn({name:"SphericalGaussianBlur",defines:{SAMPLES:Tg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ec(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Zu(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ec(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ju(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function ec(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Qa=class extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ur(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ye(5,5,5),r=new fn({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Vn});r.uniforms.tEquirect.value=e;let o=new ae(s,r),a=e.minFilter;return e.minFilter===kn&&(e.minFilter=Fe),new sa(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function Ig(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ca||f===la)if(t.has(u)){let m=t.get(u).texture;return a(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let y=new Qa(m.height);return y.fromEquirectangularTexture(i,u),t.set(u,y),u.addEventListener("dispose",l),a(y.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,m=f===ca||f===la,y=f===Ii||f===Ji;if(m||y){let g=e.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ja(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let b=u.image;return m&&b&&b.height>0||y&&b&&c(b)?(n===null&&(n=new ja(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===ca?u.mapping=Ii:f===la&&(u.mapping=Ji),u}function c(u){let f=0,m=6;for(let y=0;y<m;y++)u[y]!==void 0&&f++;return f===m}function l(u){let f=u.target;f.removeEventListener("dispose",l);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Lg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Hi("WebGLRenderer: "+n+" extension not supported."),s}}}function Dg(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function c(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function l(d){let u=[],f=d.index,m=d.attributes.position,y=0;if(m===void 0)return;if(f!==null){let b=f.array;y=f.version;for(let w=0,_=b.length;w<_;w+=3){let M=b[w+0],S=b[w+1],R=b[w+2];u.push(M,S,S,R,R,M)}}else{let b=m.array;y=m.version;for(let w=0,_=b.length/3-1;w<_;w+=3){let M=w+0,S=w+1,R=w+2;u.push(M,S,S,R,R,M)}}let g=new(m.count>=65535?lr:cr)(u,1);g.version=y;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function Ng(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function l(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let y=0;for(let g=0;g<f;g++)y+=u[g];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Ug(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:Wt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Fg(i,t,e){let n=new WeakMap,s=new Re;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let C=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],w=0;f===!0&&(w=1),m===!0&&(w=2),y===!0&&(w=3);let _=a.attributes.position.count*w,M=1;_>t.maxTextureSize&&(M=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let S=new Float32Array(_*M*4*d),R=new ar(S,_,M,d);R.type=In,R.needsUpdate=!0;let x=w*4;for(let I=0;I<d;I++){let N=g[I],k=p[I],z=b[I],O=_*M*4*I;for(let H=0;H<N.count;H++){let $=H*x;f===!0&&(s.fromBufferAttribute(N,H),S[O+$+0]=s.x,S[O+$+1]=s.y,S[O+$+2]=s.z,S[O+$+3]=0),m===!0&&(s.fromBufferAttribute(k,H),S[O+$+4]=s.x,S[O+$+5]=s.y,S[O+$+6]=s.z,S[O+$+7]=0),y===!0&&(s.fromBufferAttribute(z,H),S[O+$+8]=s.x,S[O+$+9]=s.y,S[O+$+10]=s.z,S[O+$+11]=z.itemSize===4?s.w:1)}}u={count:d,texture:R,size:new ut(_,M)},n.set(a,u),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Og(i,t,e,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var Bg={[rl]:"LINEAR_TONE_MAPPING",[ol]:"REINHARD_TONE_MAPPING",[al]:"CINEON_TONE_MAPPING",[Fr]:"ACES_FILMIC_TONE_MAPPING",[ll]:"AGX_TONE_MAPPING",[hl]:"NEUTRAL_TONE_MAPPING",[cl]:"CUSTOM_TONE_MAPPING"};function zg(i,t,e,n,s,r){let o=new sn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new xe;l.setAttribute("position",new ne([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ne([0,2,0,0,2,0],2));let h=new Wo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ae(l,h),u=new Ci(-1,1,1,-1,0,1),f=null,m=null,y=!1,g,p=null,b=[],w=!1;this.setSize=function(_,M){o.setSize(_,M),a!==null&&a.setSize(_,M),c!==null&&c.setSize(_,M);for(let S=0;S<b.length;S++){let R=b[S];R.setSize&&R.setSize(_,M)}},this.setEffects=function(_){b=_,w=b.length>0&&b[0].isRenderPass===!0;let M=o.width,S=o.height;b.length>0&&a===null&&(a=new sn(M,S,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new sn(M,S,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<b.length;R++){let x=b[R];x.setSize&&x.setSize(M,S)}},this.begin=function(_,M){if(y||_.toneMapping===Rn&&b.length===0)return!1;if(p=M,M!==null){let S=M.width,R=M.height;(o.width!==S||o.height!==R)&&this.setSize(S,R)}return w===!1&&_.setRenderTarget(o),g=_.toneMapping,_.toneMapping=Rn,!0},this.hasRenderPass=function(){return w},this.end=function(_,M){_.toneMapping=g,y=!0;let S=o,R=a;for(let x=0;x<b.length;x++){let C=b[x];C.enabled!==!1&&(C.render(_,R,S,M),C.needsSwap!==!1&&(S=R,R=R===a?c:a))}if(f!==_.outputColorSpace||m!==_.toneMapping){f=_.outputColorSpace,m=_.toneMapping,h.defines={},oe.getTransfer(f)===_e&&(h.defines.SRGB_TRANSFER="");let x=Bg[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(p),_.render(d,u),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var md=new Qe,Dl=new Ei(1,1),gd=new ar,_d=new No,xd=new ur,Ku=[],$u=[],ju=new Float32Array(16),Qu=new Float32Array(9),td=new Float32Array(4);function Hs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Ku[s];if(r===void 0&&(r=new Float32Array(s),Ku[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function nc(i,t){let e=$u[t];e===void 0&&(e=new Int32Array(t),$u[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2fv(this.addr,t),Be(e,t)}}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Oe(e,t))return;i.uniform3fv(this.addr,t),Be(e,t)}}function Gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4fv(this.addr,t),Be(e,t)}}function Wg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;td.set(n),i.uniformMatrix2fv(this.addr,!1,td),Be(e,n)}}function Xg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;Qu.set(n),i.uniformMatrix3fv(this.addr,!1,Qu),Be(e,n)}}function qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,n))return;ju.set(n),i.uniformMatrix4fv(this.addr,!1,ju),Be(e,n)}}function Yg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2iv(this.addr,t),Be(e,t)}}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;i.uniform3iv(this.addr,t),Be(e,t)}}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4iv(this.addr,t),Be(e,t)}}function $g(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;i.uniform2uiv(this.addr,t),Be(e,t)}}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;i.uniform3uiv(this.addr,t),Be(e,t)}}function t_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;i.uniform4uiv(this.addr,t),Be(e,t)}}function e_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dl.compareFunction=e.isReversedDepthBuffer()?Ja:Za,r=Dl):r=md,e.setTexture2D(t||r,s)}function n_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||_d,s)}function i_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||xd,s)}function s_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||gd,s)}function r_(i){switch(i){case 5126:return Vg;case 35664:return kg;case 35665:return Hg;case 35666:return Gg;case 35674:return Wg;case 35675:return Xg;case 35676:return qg;case 5124:case 35670:return Yg;case 35667:case 35671:return Zg;case 35668:case 35672:return Jg;case 35669:case 35673:return Kg;case 5125:return $g;case 36294:return jg;case 36295:return Qg;case 36296:return t_;case 35678:case 36198:case 36298:case 36306:case 35682:return e_;case 35679:case 36299:case 36307:return n_;case 35680:case 36300:case 36308:case 36293:return i_;case 36289:case 36303:case 36311:case 36292:return s_}}function o_(i,t){i.uniform1fv(this.addr,t)}function a_(i,t){let e=Hs(t,this.size,2);i.uniform2fv(this.addr,e)}function c_(i,t){let e=Hs(t,this.size,3);i.uniform3fv(this.addr,e)}function l_(i,t){let e=Hs(t,this.size,4);i.uniform4fv(this.addr,e)}function h_(i,t){let e=Hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function u_(i,t){let e=Hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function d_(i,t){let e=Hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function f_(i,t){i.uniform1iv(this.addr,t)}function p_(i,t){i.uniform2iv(this.addr,t)}function m_(i,t){i.uniform3iv(this.addr,t)}function g_(i,t){i.uniform4iv(this.addr,t)}function __(i,t){i.uniform1uiv(this.addr,t)}function x_(i,t){i.uniform2uiv(this.addr,t)}function y_(i,t){i.uniform3uiv(this.addr,t)}function v_(i,t){i.uniform4uiv(this.addr,t)}function M_(i,t,e){let n=this.cache,s=t.length,r=nc(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Dl:o=md;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function S_(i,t,e){let n=this.cache,s=t.length,r=nc(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||_d,r[o])}function b_(i,t,e){let n=this.cache,s=t.length,r=nc(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||xd,r[o])}function E_(i,t,e){let n=this.cache,s=t.length,r=nc(e,s);Oe(n,r)||(i.uniform1iv(this.addr,r),Be(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||gd,r[o])}function T_(i){switch(i){case 5126:return o_;case 35664:return a_;case 35665:return c_;case 35666:return l_;case 35674:return h_;case 35675:return u_;case 35676:return d_;case 5124:case 35670:return f_;case 35667:case 35671:return p_;case 35668:case 35672:return m_;case 35669:case 35673:return g_;case 5125:return __;case 36294:return x_;case 36295:return y_;case 36296:return v_;case 35678:case 36198:case 36298:case 36306:case 35682:return M_;case 35679:case 36299:case 36307:return S_;case 35680:case 36300:case 36308:case 36293:return b_;case 36289:case 36303:case 36311:case 36292:return E_}}var Nl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=r_(e.type)}},Ul=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=T_(e.type)}},Fl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Il=/(\w+)(\])?(\[|\.)?/g;function ed(i,t){i.seq.push(t),i.map[t.id]=t}function w_(i,t,e){let n=i.name,s=n.length;for(Il.lastIndex=0;;){let r=Il.exec(n),o=Il.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ed(e,l===void 0?new Nl(a,i,t):new Ul(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Fl(a),ed(e,d)),e=d}}}var ks=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);w_(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function nd(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var A_=37297,C_=0;function R_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var id=new Yt;function P_(i){oe._getMatrix(id,oe.workingColorSpace,i);let t=`mat3( ${id.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case rr:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function sd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+R_(i.getShaderSource(t),a)}else return r}function I_(i,t){let e=P_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var L_={[rl]:"Linear",[ol]:"Reinhard",[al]:"Cineon",[Fr]:"ACESFilmic",[ll]:"AgX",[hl]:"Neutral",[cl]:"Custom"};function D_(i,t){let e=L_[t];return e===void 0?(kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var $a=new A;function N_(){oe.getLuminanceCoefficients($a);let i=$a.x.toFixed(4),t=$a.y.toFixed(4),e=$a.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function U_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function F_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function O_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function qr(i){return i!==""}function rd(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function od(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var B_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ol(i){return i.replace(B_,V_)}var z_=new Map;function V_(i,t){let e=ie[t];if(e===void 0){let n=z_.get(t);if(n!==void 0)e=ie[n],kt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ol(e)}var k_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ad(i){return i.replace(k_,H_)}function H_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var G_={[Ur]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function W_(i){return G_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var X_={[Ii]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[Or]:"ENVMAP_TYPE_CUBE_UV"};function q_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":X_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Y_={[Ji]:"ENVMAP_MODE_REFRACTION"};function Z_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Y_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var J_={[sl]:"ENVMAP_BLENDING_MULTIPLY",[Su]:"ENVMAP_BLENDING_MIX",[bu]:"ENVMAP_BLENDING_ADD"};function K_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":J_[i.combine]||"ENVMAP_BLENDING_NONE"}function $_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function j_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=W_(e),l=q_(e),h=Z_(e),d=K_(e),u=$_(e),f=U_(e),m=F_(r),y=s.createProgram(),g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(qr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(qr).join(`
`),p.length>0&&(p+=`
`)):(g=[cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),p=[cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?ie.tonemapping_pars_fragment:"",e.toneMapping!==Rn?D_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,I_("linearToOutputTexel",e.outputColorSpace),N_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qr).join(`
`)),o=Ol(o),o=rd(o,e),o=od(o,e),a=Ol(a),a=rd(a,e),a=od(a,e),o=ad(o),a=ad(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=b+g+o,_=b+p+a,M=nd(s,s.VERTEX_SHADER,w),S=nd(s,s.FRAGMENT_SHADER,_);s.attachShader(y,M),s.attachShader(y,S),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function R(N){if(i.debug.checkShaderErrors){let k=s.getProgramInfoLog(y)||"",z=s.getShaderInfoLog(M)||"",O=s.getShaderInfoLog(S)||"",H=k.trim(),$=z.trim(),q=O.trim(),at=!0,j=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(at=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,M,S);else{let et=sd(s,M,"vertex"),ot=sd(s,S,"fragment");Wt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+H+`
`+et+`
`+ot)}else H!==""?kt("WebGLProgram: Program Info Log:",H):($===""||q==="")&&(j=!1);j&&(N.diagnostics={runnable:at,programLog:H,vertexShader:{log:$,prefix:g},fragmentShader:{log:q,prefix:p}})}s.deleteShader(M),s.deleteShader(S),x=new ks(s,y),C=O_(s,y)}let x;this.getUniforms=function(){return x===void 0&&R(this),x};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(y,A_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=C_++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=S,this}var Q_=0,Bl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new zl(t),e.set(t,n)),n}},zl=class{constructor(t){this.id=Q_++,this.code=t,this.usedTimes=0}};function tx(i){return i===Di||i===Hr||i===Gr}function ex(i,t,e,n,s,r){let o=new Ts,a=new Bl,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,C,I,N,k,z){let O=N.fog,H=k.geometry,$=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,at=t.get(x.envMap||$,q),j=at&&at.mapping===Or?at.image.height:null,et=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&kt("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let ot=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,_t=ot!==void 0?ot.length:0,xt=0;H.morphAttributes.position!==void 0&&(xt=1),H.morphAttributes.normal!==void 0&&(xt=2),H.morphAttributes.color!==void 0&&(xt=3);let te,Jt,jt,nt;if(et){let Ee=Gn[et];te=Ee.vertexShader,Jt=Ee.fragmentShader}else{te=x.vertexShader,Jt=x.fragmentShader;let Ee=a.getVertexShaderStage(x),pe=a.getFragmentShaderStage(x);a.update(x,Ee,pe),jt=Ee.id,nt=pe.id}let ct=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Ft=k.isInstancedMesh===!0,bt=k.isBatchedMesh===!0,Vt=!!x.map,F=!!x.matcap,L=!!at,T=!!x.aoMap,D=!!x.lightMap,V=!!x.bumpMap&&x.wireframe===!1,B=!!x.normalMap,Y=!!x.displacementMap,tt=!!x.emissiveMap,rt=!!x.metalnessMap,ft=!!x.roughnessMap,U=x.anisotropy>0,Xt=x.clearcoat>0,qt=x.dispersion>0,P=x.retroreflectivity>0,v=x.iridescence>0,X=x.sheen>0,K=x.transmission>0,it=U&&!!x.anisotropyMap,pt=Xt&&!!x.clearcoatMap,gt=Xt&&!!x.clearcoatNormalMap,st=Xt&&!!x.clearcoatRoughnessMap,ht=v&&!!x.iridescenceMap,yt=v&&!!x.iridescenceThicknessMap,Ot=X&&!!x.sheenColorMap,Et=X&&!!x.sheenRoughnessMap,vt=!!x.specularMap,Bt=!!x.specularColorMap,Gt=!!x.specularIntensityMap,Kt=K&&!!x.transmissionMap,W=K&&!!x.thicknessMap,Mt=!!x.gradientMap,lt=!!x.alphaMap,St=x.alphaTest>0,Ct=!!x.alphaHash,dt=!!x.extensions,zt=Rn;x.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(zt=i.toneMapping);let Nt={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:te,fragmentShader:Jt,defines:x.defines,customVertexShaderID:jt,customFragmentShaderID:nt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:bt,batchingColor:bt&&k._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&k.instanceColor!==null,instancingMorph:Ft&&k.morphTexture!==null,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Vt,matcap:F,envMap:L,envMapMode:L&&at.mapping,envMapCubeUVHeight:j,aoMap:T,lightMap:D,bumpMap:V,normalMap:B,displacementMap:Y,emissiveMap:tt,normalMapObjectSpace:B&&x.normalMapType===Tu,normalMapTangentSpace:B&&x.normalMapType===Ya,packedNormalMap:B&&x.normalMapType===Ya&&tx(x.normalMap.format),metalnessMap:rt,roughnessMap:ft,anisotropy:U,anisotropyMap:it,clearcoat:Xt,clearcoatMap:pt,clearcoatNormalMap:gt,clearcoatRoughnessMap:st,dispersion:qt,retroreflection:P,iridescence:v,iridescenceMap:ht,iridescenceThicknessMap:yt,sheen:X,sheenColorMap:Ot,sheenRoughnessMap:Et,specularMap:vt,specularColorMap:Bt,specularIntensityMap:Gt,transmission:K,transmissionMap:Kt,thicknessMap:W,gradientMap:Mt,opaque:x.transparent===!1&&x.blending===Us&&x.alphaToCoverage===!1,alphaMap:lt,alphaTest:St,alphaHash:Ct,combine:x.combine,mapUv:Vt&&m(x.map.channel),aoMapUv:T&&m(x.aoMap.channel),lightMapUv:D&&m(x.lightMap.channel),bumpMapUv:V&&m(x.bumpMap.channel),normalMapUv:B&&m(x.normalMap.channel),displacementMapUv:Y&&m(x.displacementMap.channel),emissiveMapUv:tt&&m(x.emissiveMap.channel),metalnessMapUv:rt&&m(x.metalnessMap.channel),roughnessMapUv:ft&&m(x.roughnessMap.channel),anisotropyMapUv:it&&m(x.anisotropyMap.channel),clearcoatMapUv:pt&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:gt&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:yt&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Et&&m(x.sheenRoughnessMap.channel),specularMapUv:vt&&m(x.specularMap.channel),specularColorMapUv:Bt&&m(x.specularColorMap.channel),specularIntensityMapUv:Gt&&m(x.specularIntensityMap.channel),transmissionMapUv:Kt&&m(x.transmissionMap.channel),thicknessMapUv:W&&m(x.thicknessMap.channel),alphaMapUv:lt&&m(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(B||U),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!H.attributes.uv&&(Vt||lt),fog:!!O,useFog:x.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&B===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:mt,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:xt,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:Vt&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===_e,decodeVideoTextureEmissive:tt&&x.emissiveMap.isVideoTexture===!0&&oe.getTransfer(x.emissiveMap.colorSpace)===_e,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ie,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:dt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(dt&&x.extensions.multiDraw===!0||bt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Nt.vertexUv1s=c.has(1),Nt.vertexUv2s=c.has(2),Nt.vertexUv3s=c.has(3),c.clear(),Nt}function g(x){let C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)C.push(I),C.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(C,x),b(C,x),C.push(i.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function p(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numSunLights),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numSunLightShadows),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function b(x,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.retroreflection&&o.enable(24),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),C.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function w(x){let C=f[x.type],I;if(C){let N=Gn[C];I=Gu.clone(N.uniforms)}else I=x.uniforms;return I}function _(x,C){let I=h.get(C);return I!==void 0?++I.usedTimes:(I=new j_(i,C,x,s),l.push(I),h.set(C,I)),I}function M(x){if(--x.usedTimes===0){let C=l.indexOf(x);l[C]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function R(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:w,acquireProgram:_,releaseProgram:M,releaseShaderCache:S,programs:l,dispose:R}}function nx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ix(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function ld(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function hd(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,m,y,g,p){let b=i[t];return b===void 0?(b={id:u.id,object:u,geometry:f,material:m,materialVariant:o(u),groupOrder:y,renderOrder:u.renderOrder,z:g,group:p},i[t]=b):(b.id=u.id,b.object=u,b.geometry=f,b.material=m,b.materialVariant=o(u),b.groupOrder=y,b.renderOrder=u.renderOrder,b.z=g,b.group=p),t++,b}function c(u,f,m,y,g,p,b){b.reversedDepth===!0&&(g=-g);let w=a(u,f,m,y,g,p);m.transmission>0?n.push(w):m.transparent===!0?s.push(w):e.push(w)}function l(u,f,m,y,g,p){let b=a(u,f,m,y,g,p);m.transmission>0?n.unshift(b):m.transparent===!0?s.unshift(b):e.unshift(b)}function h(u,f){e.length>1&&e.sort(u||ix),n.length>1&&n.sort(f||ld),s.length>1&&s.sort(f||ld)}function d(){for(let u=t,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function sx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new hd,i.set(n,[o])):s>=r.length?(o=new hd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function rx(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new A,color:new Ht};break;case"SpotLight":e={position:new A,direction:new A,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function ox(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var ax=0;function cx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function lx(i){let t=new rx,e=ox(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new A);let s=new A,r=new he,o=new he;function a(l){let h=0,d=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,b=0,w=0,_=0,M=0,S=0,R=0,x=0,C=0,I=0;l.sort(cx);for(let k=0,z=l.length;k<z;k++){let O=l[k],H=O.color,$=O.intensity,q=O.distance,at=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===Di?at=O.shadow.map.texture:at=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)h+=H.r*$,d+=H.g*$,u+=H.b*$;else if(O.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(O.sh.coefficients[j],$);I++}else if(O.isSunLight){let j=t.get(O);if(j.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let et=O.shadow,ot=e.get(O);ot.shadowIntensity=et.intensity,ot.shadowBias=et.bias,ot.shadowNormalBias=et.normalBias,ot.shadowRadius=et.radius,ot.shadowMapSize.copy(et.mapSize).multiply(et.getFrameExtents()),n.sunShadow[m]=ot,n.sunShadowMap[m]=at;let _t=et.getViewportCount();for(let xt=0;xt<_t;xt++)n.sunShadowMatrix[y+xt]=et.getMatrix(xt),n.sunShadowCascade[y+xt]=et._cascadeData[xt];y+=_t,m++}n.sun[f]=j,f++}else if(O.isDirectionalLight){let j=t.get(O);if(j.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let et=O.shadow,ot=e.get(O);ot.shadowIntensity=et.intensity,ot.shadowBias=et.bias,ot.shadowNormalBias=et.normalBias,ot.shadowRadius=et.radius,ot.shadowMapSize=et.mapSize,n.directionalShadow[g]=ot,n.directionalShadowMap[g]=at,n.directionalShadowMatrix[g]=O.shadow.matrix,M++}n.directional[g]=j,g++}else if(O.isSpotLight){let j=t.get(O);j.position.setFromMatrixPosition(O.matrixWorld),j.color.copy(H).multiplyScalar($),j.distance=q,j.coneCos=Math.cos(O.angle),j.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),j.decay=O.decay,n.spot[b]=j;let et=O.shadow;if(O.map&&(n.spotLightMap[x]=O.map,x++,et.updateMatrices(O),O.castShadow&&C++),n.spotLightMatrix[b]=et.matrix,O.castShadow){let ot=e.get(O);ot.shadowIntensity=et.intensity,ot.shadowBias=et.bias,ot.shadowNormalBias=et.normalBias,ot.shadowRadius=et.radius,ot.shadowMapSize=et.mapSize,n.spotShadow[b]=ot,n.spotShadowMap[b]=at,R++}b++}else if(O.isRectAreaLight){let j=t.get(O);j.color.copy(H).multiplyScalar($),j.halfWidth.set(O.width*.5,0,0),j.halfHeight.set(0,O.height*.5,0),n.rectArea[w]=j,w++}else if(O.isPointLight){let j=t.get(O);if(j.color.copy(O.color).multiplyScalar(O.intensity),j.distance=O.distance,j.decay=O.decay,O.castShadow){let et=O.shadow,ot=e.get(O);ot.shadowIntensity=et.intensity,ot.shadowBias=et.bias,ot.shadowNormalBias=et.normalBias,ot.shadowRadius=et.radius,ot.shadowMapSize=et.mapSize,ot.shadowCameraNear=et.camera.near,ot.shadowCameraFar=et.camera.far,n.pointShadow[p]=ot,n.pointShadowMap[p]=at,n.pointShadowMatrix[p]=O.shadow.matrix,S++}n.point[p]=j,p++}else if(O.isHemisphereLight){let j=t.get(O);j.skyColor.copy(O.color).multiplyScalar($),j.groundColor.copy(O.groundColor).multiplyScalar($),n.hemi[_]=j,_++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let N=n.hash;(N.sunLength!==f||N.directionalLength!==g||N.pointLength!==p||N.spotLength!==b||N.rectAreaLength!==w||N.hemiLength!==_||N.numSunShadows!==m||N.numDirectionalShadows!==M||N.numPointShadows!==S||N.numSpotShadows!==R||N.numSpotMaps!==x||N.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=g,n.spot.length=b,n.rectArea.length=w,n.point.length=p,n.hemi.length=_,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+x-C,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=I,N.sunLength=f,N.directionalLength=g,N.pointLength=p,N.spotLength=b,N.rectAreaLength=w,N.hemiLength=_,N.numSunShadows=m,N.numDirectionalShadows=M,N.numPointShadows=S,N.numSpotShadows=R,N.numSpotMaps=x,N.numLightProbes=I,n.version=ax++)}function c(l,h){let d=0,u=0,f=0,m=0,y=0,g=0,p=h.matrixWorldInverse;for(let b=0,w=l.length;b<w;b++){let _=l[b];if(_.isSunLight){let M=n.sun[d];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(p),d++}else if(_.isDirectionalLight){let M=n.directional[u];M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),u++}else if(_.isSpotLight){let M=n.spot[m];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),m++}else if(_.isRectAreaLight){let M=n.rectArea[y];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),y++}else if(_.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){let M=n.hemi[g];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:n}}function ud(i){let t=new lx(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function c(u){s.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function hx(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new ud(i),t.set(s,[a])):r>=o.length?(a=new ud(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var ux=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dx=`uniform sampler2D shadow_pass;
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
}`,fx=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],px=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],dd=new he,Xr=new A,Ll=new A;function mx(i,t,e){let n=new As,s=new ut,r=new ut,o=new Re,a=new Xo,c=new qo,l={},h=e.maxTextureSize,d={[Pi]:tn,[tn]:Pi,[Ie]:Ie},u=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:ux,fragmentShader:dx}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new xe;m.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ae(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ur;let p=this.type;this.render=function(S,R,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===aa&&(kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ur);let C=i.getRenderTarget(),I=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Vn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let z=p!==this.type;z&&R.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(H=>H.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,H=S.length;O<H;O++){let $=S[O],q=$.shadow;if(q===void 0){kt("WebGLShadowMap:",$,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let at=q.getFrameExtents();s.multiply(at),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/at.x),s.x=r.x*at.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/at.y),s.y=r.y*at.y,q.mapSize.y=r.y));let j=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=j,q.map===null||z===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Ns){if($.isPointLight){kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new sn(s.x,s.y,{format:Di,type:Ln,minFilter:Fe,magFilter:Fe,generateMipmaps:!1}),q.map.texture.name=$.name+".shadowMap",q.map.depthTexture=new Ei(s.x,s.y,In),q.map.depthTexture.name=$.name+".shadowMapDepth",q.map.depthTexture.format=Bn,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Ue,q.map.depthTexture.magFilter=Ue}else $.isPointLight?(q.map=new Qa(s.x),q.map.depthTexture=new Bo(s.x,Pn)):(q.map=new sn(s.x,s.y),q.map.depthTexture=new Ei(s.x,s.y,Pn)),q.map.depthTexture.name=$.name+".shadowMap",q.map.depthTexture.format=Bn,this.type===Ur?(q.map.depthTexture.compareFunction=j?Ja:Za,q.map.depthTexture.minFilter=Fe,q.map.depthTexture.magFilter=Fe):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Ue,q.map.depthTexture.magFilter=Ue);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let et=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();$.isPointLight!==!0&&q.updateMatrices($,x);for(let ot=0;ot<et;ot++){let _t=q.getCamera(ot);if($.isPointLight){let xt=q.camera,te=q.matrix,Jt=$.distance||xt.far;Jt!==xt.far&&(xt.far=Jt,xt.updateProjectionMatrix()),Xr.setFromMatrixPosition($.matrixWorld),xt.position.copy(Xr),Ll.copy(xt.position),Ll.add(fx[ot]),xt.up.copy(px[ot]),xt.lookAt(Ll),xt.updateMatrixWorld(),te.makeTranslation(-Xr.x,-Xr.y,-Xr.z),dd.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),q._frustum.setFromProjectionMatrix(dd,xt.coordinateSystem,xt.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,ot),i.clear();else{ot===0&&(i.setRenderTarget(q.map),i.clear());let xt=q.getViewport(ot);o.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),k.viewport(o)}n=q.getFrustum(ot),_(R,x,_t,$,this.type)}q.isPointLightShadow!==!0&&this.type===Ns&&b(q,x),q.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(C,I,N)};function b(S,R){let x=t.update(y);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new sn(s.x,s.y,{format:Di,type:Ln}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(R,null,x,u,y,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(R,null,x,f,y,null)}function w(S,R,x,C){let I=null,N=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(N!==void 0)I=N;else if(I=x.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let k=I.uuid,z=R.uuid,O=l[k];O===void 0&&(O={},l[k]=O);let H=O[z];H===void 0&&(H=I.clone(),O[z]=H,R.addEventListener("dispose",M)),I=H}if(I.visible=R.visible,I.wireframe=R.wireframe,C===Ns?I.side=R.shadowSide!==null?R.shadowSide:R.side:I.side=R.shadowSide!==null?R.shadowSide:d[R.side],I.alphaMap=R.alphaMap,I.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,I.map=R.map,I.clipShadows=R.clipShadows,I.clippingPlanes=R.clippingPlanes,I.clipIntersection=R.clipIntersection,I.displacementMap=R.displacementMap,I.displacementScale=R.displacementScale,I.displacementBias=R.displacementBias,I.wireframeLinewidth=R.wireframeLinewidth,I.linewidth=R.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let k=i.properties.get(I);k.light=x}return I}function _(S,R,x,C,I){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&I===Ns)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let z=t.update(S),O=S.material;if(Array.isArray(O)){let H=z.groups;for(let $=0,q=H.length;$<q;$++){let at=H[$],j=O[at.materialIndex];if(j&&j.visible){let et=w(S,j,C,I);S.onBeforeShadow(i,S,R,x,z,et,at),i.renderBufferDirect(x,null,z,et,S,at),S.onAfterShadow(i,S,R,x,z,et,at)}}}else if(O.visible){let H=w(S,O,C,I);S.onBeforeShadow(i,S,R,x,z,H,null),i.renderBufferDirect(x,null,z,H,S,null),S.onAfterShadow(i,S,R,x,z,H,null)}}let k=S.children;for(let z=0,O=k.length;z<O;z++)_(k[z],R,x,C,I)}function M(S){S.target.removeEventListener("dispose",M);for(let x in l){let C=l[x],I=S.target.uuid;I in C&&(C[I].dispose(),delete C[I])}}}function gx(i,t){function e(){let W=!1,Mt=new Re,lt=null,St=new Re(0,0,0,0);return{setMask:function(Ct){lt!==Ct&&!W&&(i.colorMask(Ct,Ct,Ct,Ct),lt=Ct)},setLocked:function(Ct){W=Ct},setClear:function(Ct,dt,zt,Nt,Ee){Ee===!0&&(Ct*=Nt,dt*=Nt,zt*=Nt),Mt.set(Ct,dt,zt,Nt),St.equals(Mt)===!1&&(i.clearColor(Ct,dt,zt,Nt),St.copy(Mt))},reset:function(){W=!1,lt=null,St.set(-1,0,0,0)}}}function n(){let W=!1,Mt=!1,lt=null,St=null,Ct=null;return{setReversed:function(dt){if(Mt!==dt){let zt=t.get("EXT_clip_control");dt?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT),Mt=dt;let Nt=Ct;Ct=null,this.setClear(Nt)}},getReversed:function(){return Mt},setTest:function(dt){dt?ct(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(dt){lt!==dt&&!W&&(i.depthMask(dt),lt=dt)},setFunc:function(dt){if(Mt&&(dt=Ou[dt]),St!==dt){switch(dt){case wo:i.depthFunc(i.NEVER);break;case Ao:i.depthFunc(i.ALWAYS);break;case Co:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Ro:i.depthFunc(i.EQUAL);break;case Po:i.depthFunc(i.GEQUAL);break;case Io:i.depthFunc(i.GREATER);break;case Lo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=dt}},setLocked:function(dt){W=dt},setClear:function(dt){Ct!==dt&&(Ct=dt,Mt&&(dt=1-dt),i.clearDepth(dt))},reset:function(){W=!1,lt=null,St=null,Ct=null,Mt=!1}}}function s(){let W=!1,Mt=null,lt=null,St=null,Ct=null,dt=null,zt=null,Nt=null,Ee=null;return{setTest:function(pe){W||(pe?ct(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(pe){Mt!==pe&&!W&&(i.stencilMask(pe),Mt=pe)},setFunc:function(pe,Mn,Un){(lt!==pe||St!==Mn||Ct!==Un)&&(i.stencilFunc(pe,Mn,Un),lt=pe,St=Mn,Ct=Un)},setOp:function(pe,Mn,Un){(dt!==pe||zt!==Mn||Nt!==Un)&&(i.stencilOp(pe,Mn,Un),dt=pe,zt=Mn,Nt=Un)},setLocked:function(pe){W=pe},setClear:function(pe){Ee!==pe&&(i.clearStencil(pe),Ee=pe)},reset:function(){W=!1,Mt=null,lt=null,St=null,Ct=null,dt=null,zt=null,Nt=null,Ee=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,b=null,w=null,_=null,M=null,S=null,R=null,x=new Ht(0,0,0),C=0,I=!1,N=null,k=null,z=null,O=null,H=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,at=0,j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=at>=1):j.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=at>=2);let et=null,ot={},_t=i.getParameter(i.SCISSOR_BOX),xt=i.getParameter(i.VIEWPORT),te=new Re().fromArray(_t),Jt=new Re().fromArray(xt);function jt(W,Mt,lt,St){let Ct=new Uint8Array(4),dt=i.createTexture();i.bindTexture(W,dt),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let zt=0;zt<lt;zt++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(Mt,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,Ct):i.texImage2D(Mt+zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ct);return dt}let nt={};nt[i.TEXTURE_2D]=jt(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ct(i.DEPTH_TEST),o.setFunc(_s),V(!1),B(jc),ct(i.CULL_FACE),T(Vn);function ct(W){h[W]!==!0&&(i.enable(W),h[W]=!0)}function mt(W){h[W]!==!1&&(i.disable(W),h[W]=!1)}function Ft(W,Mt){return u[W]!==Mt?(i.bindFramebuffer(W,Mt),u[W]=Mt,W===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Mt),W===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Mt),!0):!1}function bt(W,Mt){let lt=m,St=!1;if(W){lt=f.get(Mt),lt===void 0&&(lt=[],f.set(Mt,lt));let Ct=W.textures;if(lt.length!==Ct.length||lt[0]!==i.COLOR_ATTACHMENT0){for(let dt=0,zt=Ct.length;dt<zt;dt++)lt[dt]=i.COLOR_ATTACHMENT0+dt;lt.length=Ct.length,St=!0}}else lt[0]!==i.BACK&&(lt[0]=i.BACK,St=!0);St&&i.drawBuffers(lt)}function Vt(W){return y!==W?(i.useProgram(W),y=W,!0):!1}let F={[Zi]:i.FUNC_ADD,[ru]:i.FUNC_SUBTRACT,[ou]:i.FUNC_REVERSE_SUBTRACT};F[au]=i.MIN,F[cu]=i.MAX;let L={[lu]:i.ZERO,[hu]:i.ONE,[uu]:i.SRC_COLOR,[nl]:i.SRC_ALPHA,[_u]:i.SRC_ALPHA_SATURATE,[mu]:i.DST_COLOR,[fu]:i.DST_ALPHA,[du]:i.ONE_MINUS_SRC_COLOR,[il]:i.ONE_MINUS_SRC_ALPHA,[gu]:i.ONE_MINUS_DST_COLOR,[pu]:i.ONE_MINUS_DST_ALPHA,[xu]:i.CONSTANT_COLOR,[yu]:i.ONE_MINUS_CONSTANT_COLOR,[vu]:i.CONSTANT_ALPHA,[Mu]:i.ONE_MINUS_CONSTANT_ALPHA};function T(W,Mt,lt,St,Ct,dt,zt,Nt,Ee,pe){if(W===Vn){g===!0&&(mt(i.BLEND),g=!1);return}if(g===!1&&(ct(i.BLEND),g=!0),W!==su){if(W!==p||pe!==I){if((b!==Zi||M!==Zi)&&(i.blendEquation(i.FUNC_ADD),b=Zi,M=Zi),pe)switch(W){case Us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qc:i.blendFunc(i.ONE,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Wt("WebGLState: Invalid blending: ",W);break}else switch(W){case Us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case tl:Wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case el:Wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Wt("WebGLState: Invalid blending: ",W);break}w=null,_=null,S=null,R=null,x.set(0,0,0),C=0,p=W,I=pe}return}Ct=Ct||Mt,dt=dt||lt,zt=zt||St,(Mt!==b||Ct!==M)&&(i.blendEquationSeparate(F[Mt],F[Ct]),b=Mt,M=Ct),(lt!==w||St!==_||dt!==S||zt!==R)&&(i.blendFuncSeparate(L[lt],L[St],L[dt],L[zt]),w=lt,_=St,S=dt,R=zt),(Nt.equals(x)===!1||Ee!==C)&&(i.blendColor(Nt.r,Nt.g,Nt.b,Ee),x.copy(Nt),C=Ee),p=W,I=!1}function D(W,Mt){W.side===Ie?mt(i.CULL_FACE):ct(i.CULL_FACE);let lt=W.side===tn;Mt&&(lt=!lt),V(lt),W.blending===Us&&W.transparent===!1?T(Vn):T(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);let St=W.stencilWrite;a.setTest(St),St&&(a.setMask(W.stencilWriteMask),a.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),a.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),tt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?ct(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function V(W){N!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),N=W)}function B(W){W!==nu?(ct(i.CULL_FACE),W!==k&&(W===jc?i.cullFace(i.BACK):W===iu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),k=W}function Y(W){W!==z&&(q&&i.lineWidth(W),z=W)}function tt(W,Mt,lt){W?(ct(i.POLYGON_OFFSET_FILL),(O!==Mt||H!==lt)&&(O=Mt,H=lt,o.getReversed()&&(Mt=-Mt),i.polygonOffset(Mt,lt))):mt(i.POLYGON_OFFSET_FILL)}function rt(W){W?ct(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function ft(W){W===void 0&&(W=i.TEXTURE0+$-1),et!==W&&(i.activeTexture(W),et=W)}function U(W,Mt,lt){lt===void 0&&(et===null?lt=i.TEXTURE0+$-1:lt=et);let St=ot[lt];St===void 0&&(St={type:void 0,texture:void 0},ot[lt]=St),(St.type!==W||St.texture!==Mt)&&(et!==lt&&(i.activeTexture(lt),et=lt),i.bindTexture(W,Mt||nt[W]),St.type=W,St.texture=Mt)}function Xt(){let W=ot[et];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function qt(){try{i.compressedTexImage2D(...arguments)}catch(W){Wt("WebGLState:",W)}}function P(){try{i.compressedTexImage3D(...arguments)}catch(W){Wt("WebGLState:",W)}}function v(){try{i.texSubImage2D(...arguments)}catch(W){Wt("WebGLState:",W)}}function X(){try{i.texSubImage3D(...arguments)}catch(W){Wt("WebGLState:",W)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(W){Wt("WebGLState:",W)}}function it(){try{i.compressedTexSubImage3D(...arguments)}catch(W){Wt("WebGLState:",W)}}function pt(){try{i.texStorage2D(...arguments)}catch(W){Wt("WebGLState:",W)}}function gt(){try{i.texStorage3D(...arguments)}catch(W){Wt("WebGLState:",W)}}function st(){try{i.texImage2D(...arguments)}catch(W){Wt("WebGLState:",W)}}function ht(){try{i.texImage3D(...arguments)}catch(W){Wt("WebGLState:",W)}}function yt(W){return d[W]!==void 0?d[W]:i.getParameter(W)}function Ot(W,Mt){d[W]!==Mt&&(i.pixelStorei(W,Mt),d[W]=Mt)}function Et(W){te.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),te.copy(W))}function vt(W){Jt.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),Jt.copy(W))}function Bt(W,Mt){let lt=l.get(Mt);lt===void 0&&(lt=new WeakMap,l.set(Mt,lt));let St=lt.get(W);St===void 0&&(St=i.getUniformBlockIndex(Mt,W.name),lt.set(W,St))}function Gt(W,Mt){let St=l.get(Mt).get(W);c.get(Mt)!==St&&(i.uniformBlockBinding(Mt,St,W.__bindingPointIndex),c.set(Mt,St))}function Kt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},et=null,ot={},u={},f=new WeakMap,m=[],y=null,g=!1,p=null,b=null,w=null,_=null,M=null,S=null,R=null,x=new Ht(0,0,0),C=0,I=!1,N=null,k=null,z=null,O=null,H=null,te.set(0,0,i.canvas.width,i.canvas.height),Jt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ct,disable:mt,bindFramebuffer:Ft,drawBuffers:bt,useProgram:Vt,setBlending:T,setMaterial:D,setFlipSided:V,setCullFace:B,setLineWidth:Y,setPolygonOffset:tt,setScissorTest:rt,activeTexture:ft,bindTexture:U,unbindTexture:Xt,compressedTexImage2D:qt,compressedTexImage3D:P,texImage2D:st,texImage3D:ht,pixelStorei:Ot,getParameter:yt,updateUBOMapping:Bt,uniformBlockBinding:Gt,texStorage2D:pt,texStorage3D:gt,texSubImage2D:v,texSubImage3D:X,compressedTexSubImage2D:K,compressedTexSubImage3D:it,scissor:Et,viewport:vt,reset:Kt}}function _x(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ut,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,v){return m?new OffscreenCanvas(P,v):or("canvas")}function g(P,v,X){let K=1,it=qt(P);if((it.width>X||it.height>X)&&(K=X/Math.max(it.width,it.height)),K<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let pt=Math.floor(K*it.width),gt=Math.floor(K*it.height);u===void 0&&(u=y(pt,gt));let st=v?y(pt,gt):u;return st.width=pt,st.height=gt,st.getContext("2d").drawImage(P,0,0,pt,gt),kt("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+pt+"x"+gt+")."),st}else return"data"in P&&kt("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),P;return P}function p(P){return P.generateMipmaps}function b(P){i.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,v,X,K,it,pt=!1){if(P!==null){if(i[P]!==void 0)return i[P];kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let gt;K&&(gt=t.get("EXT_texture_norm16"),gt||kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let st=v;if(v===i.RED&&(X===i.FLOAT&&(st=i.R32F),X===i.HALF_FLOAT&&(st=i.R16F),X===i.UNSIGNED_BYTE&&(st=i.R8),X===i.UNSIGNED_SHORT&&gt&&(st=gt.R16_EXT),X===i.SHORT&&gt&&(st=gt.R16_SNORM_EXT)),v===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(st=i.R8UI),X===i.UNSIGNED_SHORT&&(st=i.R16UI),X===i.UNSIGNED_INT&&(st=i.R32UI),X===i.BYTE&&(st=i.R8I),X===i.SHORT&&(st=i.R16I),X===i.INT&&(st=i.R32I)),v===i.RG&&(X===i.FLOAT&&(st=i.RG32F),X===i.HALF_FLOAT&&(st=i.RG16F),X===i.UNSIGNED_BYTE&&(st=i.RG8),X===i.UNSIGNED_SHORT&&gt&&(st=gt.RG16_EXT),X===i.SHORT&&gt&&(st=gt.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(st=i.RG8UI),X===i.UNSIGNED_SHORT&&(st=i.RG16UI),X===i.UNSIGNED_INT&&(st=i.RG32UI),X===i.BYTE&&(st=i.RG8I),X===i.SHORT&&(st=i.RG16I),X===i.INT&&(st=i.RG32I)),v===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(st=i.RGB8UI),X===i.UNSIGNED_SHORT&&(st=i.RGB16UI),X===i.UNSIGNED_INT&&(st=i.RGB32UI),X===i.BYTE&&(st=i.RGB8I),X===i.SHORT&&(st=i.RGB16I),X===i.INT&&(st=i.RGB32I)),v===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(st=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(st=i.RGBA16UI),X===i.UNSIGNED_INT&&(st=i.RGBA32UI),X===i.BYTE&&(st=i.RGBA8I),X===i.SHORT&&(st=i.RGBA16I),X===i.INT&&(st=i.RGBA32I)),v===i.RGB&&(X===i.UNSIGNED_SHORT&&gt&&(st=gt.RGB16_EXT),X===i.SHORT&&gt&&(st=gt.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(st=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(st=i.R11F_G11F_B10F)),v===i.RGBA){let ht=pt?rr:oe.getTransfer(it);X===i.FLOAT&&(st=i.RGBA32F),X===i.HALF_FLOAT&&(st=i.RGBA16F),X===i.UNSIGNED_BYTE&&(st=ht===_e?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&gt&&(st=gt.RGBA16_EXT),X===i.SHORT&&gt&&(st=gt.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(st=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(st=i.RGB5_A1)}return(st===i.R16F||st===i.R32F||st===i.RG16F||st===i.RG32F||st===i.RGBA16F||st===i.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function M(P,v){let X;return P?v===null||v===Pn||v===Bs?X=i.DEPTH24_STENCIL8:v===In?X=i.DEPTH32F_STENCIL8:v===Os&&(X=i.DEPTH24_STENCIL8,kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pn||v===Bs?X=i.DEPTH_COMPONENT24:v===In?X=i.DEPTH_COMPONENT32F:v===Os&&(X=i.DEPTH_COMPONENT16),X}function S(P,v){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ue&&P.minFilter!==Fe?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function R(P){let v=P.target;v.removeEventListener("dispose",R),C(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function x(P){let v=P.target;v.removeEventListener("dispose",x),N(v)}function C(P){let v=n.get(P);if(v.__webglInit===void 0)return;let X=P.source,K=f.get(X);if(K){let it=K[v.__cacheKey];it.usedTimes--,it.usedTimes===0&&I(P),Object.keys(K).length===0&&f.delete(X)}n.remove(P)}function I(P){let v=n.get(P);i.deleteTexture(v.__webglTexture);let X=P.source,K=f.get(X);delete K[v.__cacheKey],o.memory.textures--}function N(P){let v=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let it=0;it<v.__webglFramebuffer[K].length;it++)i.deleteFramebuffer(v.__webglFramebuffer[K][it]);else i.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)i.deleteFramebuffer(v.__webglFramebuffer[K]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let X=P.textures;for(let K=0,it=X.length;K<it;K++){let pt=n.get(X[K]);pt.__webglTexture&&(i.deleteTexture(pt.__webglTexture),o.memory.textures--),n.remove(X[K])}n.remove(P)}let k=0;function z(){k=0}function O(){return k}function H(P){k=P}function $(){let P=k;return P>=s.maxTextures&&kt("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+s.maxTextures),k+=1,P}function q(P){let v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function at(P,v){let X=n.get(P);if(P.isVideoTexture&&U(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&X.__version!==P.version){let K=P.image;if(K===null)kt("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)kt("WebGLRenderer: Texture marked for update but image is incomplete");else{mt(X,P,v);return}}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+v)}function j(P,v){let X=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){mt(X,P,v);return}else P.isExternalTexture&&(X.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+v)}function et(P,v){let X=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){mt(X,P,v);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+v)}function ot(P,v){let X=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&X.__version!==P.version){Ft(X,P,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+v)}let _t={[xs]:i.REPEAT,[xn]:i.CLAMP_TO_EDGE,[ys]:i.MIRRORED_REPEAT},xt={[Ue]:i.NEAREST,[ha]:i.NEAREST_MIPMAP_NEAREST,[Ki]:i.NEAREST_MIPMAP_LINEAR,[Fe]:i.LINEAR,[Fs]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},te={[Au]:i.NEVER,[Lu]:i.ALWAYS,[Cu]:i.LESS,[Za]:i.LEQUAL,[Ru]:i.EQUAL,[Ja]:i.GEQUAL,[Pu]:i.GREATER,[Iu]:i.NOTEQUAL};function Jt(P,v){if(v.type===In&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Fe||v.magFilter===Fs||v.magFilter===Ki||v.magFilter===kn||v.minFilter===Fe||v.minFilter===Fs||v.minFilter===Ki||v.minFilter===kn)&&kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,_t[v.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,_t[v.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,_t[v.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,xt[v.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,xt[v.minFilter]),v.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,te[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ue||v.minFilter!==Ki&&v.minFilter!==kn||v.type===In&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function jt(P,v){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",R));let K=v.source,it=f.get(K);it===void 0&&(it={},f.set(K,it));let pt=q(v);if(pt!==P.__cacheKey){it[pt]===void 0&&(it[pt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),it[pt].usedTimes++;let gt=it[P.__cacheKey];gt!==void 0&&(it[P.__cacheKey].usedTimes--,gt.usedTimes===0&&I(v)),P.__cacheKey=pt,P.__webglTexture=it[pt].texture}return X}function nt(P,v,X){return Math.floor(Math.floor(P/X)/v)}function ct(P,v,X,K){let pt=P.updateRanges;if(pt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,X,K,v.data);else{pt.sort((Ot,Et)=>Ot.start-Et.start);let gt=0;for(let Ot=1;Ot<pt.length;Ot++){let Et=pt[gt],vt=pt[Ot],Bt=Et.start+Et.count,Gt=nt(vt.start,v.width,4),Kt=nt(Et.start,v.width,4);vt.start<=Bt+1&&Gt===Kt&&nt(vt.start+vt.count-1,v.width,4)===Gt?Et.count=Math.max(Et.count,vt.start+vt.count-Et.start):(++gt,pt[gt]=vt)}pt.length=gt+1;let st=e.getParameter(i.UNPACK_ROW_LENGTH),ht=e.getParameter(i.UNPACK_SKIP_PIXELS),yt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Ot=0,Et=pt.length;Ot<Et;Ot++){let vt=pt[Ot],Bt=Math.floor(vt.start/4),Gt=Math.ceil(vt.count/4),Kt=Bt%v.width,W=Math.floor(Bt/v.width),Mt=Gt,lt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Kt),e.pixelStorei(i.UNPACK_SKIP_ROWS,W),e.texSubImage2D(i.TEXTURE_2D,0,Kt,W,Mt,lt,X,K,v.data)}P.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,st),e.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}}function mt(P,v,X){let K=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=i.TEXTURE_3D);let it=jt(P,v),pt=v.source;e.bindTexture(K,P.__webglTexture,i.TEXTURE0+X);let gt=n.get(pt);if(pt.version!==gt.__version||it===!0){if(e.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let lt=oe.getPrimaries(oe.workingColorSpace),St=v.colorSpace===Dn?null:oe.getPrimaries(v.colorSpace),Ct=v.colorSpace===Dn||lt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct)}e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ht=g(v.image,!1,s.maxTextureSize);ht=Xt(v,ht);let yt=r.convert(v.format,v.colorSpace),Ot=r.convert(v.type),Et=_(v.internalFormat,yt,Ot,v.normalized,v.colorSpace,v.isVideoTexture);Jt(K,v);let vt,Bt=v.mipmaps,Gt=v.isVideoTexture!==!0,Kt=gt.__version===void 0||it===!0,W=pt.dataReady,Mt=S(v,ht);if(v.isDepthTexture)Et=M(v.format===Li,v.type),Kt&&(Gt?e.texStorage2D(i.TEXTURE_2D,1,Et,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,Et,ht.width,ht.height,0,yt,Ot,null));else if(v.isDataTexture)if(Bt.length>0){Gt&&Kt&&e.texStorage2D(i.TEXTURE_2D,Mt,Et,Bt[0].width,Bt[0].height);for(let lt=0,St=Bt.length;lt<St;lt++)vt=Bt[lt],Gt?W&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,vt.width,vt.height,yt,Ot,vt.data):e.texImage2D(i.TEXTURE_2D,lt,Et,vt.width,vt.height,0,yt,Ot,vt.data);v.generateMipmaps=!1}else Gt?(Kt&&e.texStorage2D(i.TEXTURE_2D,Mt,Et,ht.width,ht.height),W&&ct(v,ht,yt,Ot)):e.texImage2D(i.TEXTURE_2D,0,Et,ht.width,ht.height,0,yt,Ot,ht.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Gt&&Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Et,Bt[0].width,Bt[0].height,ht.depth);for(let lt=0,St=Bt.length;lt<St;lt++)if(vt=Bt[lt],v.format!==on)if(yt!==null)if(Gt){if(W)if(v.layerUpdates.size>0){let Ct=wl(vt.width,vt.height,v.format,v.type);for(let dt of v.layerUpdates){let zt=vt.data.subarray(dt*Ct/vt.data.BYTES_PER_ELEMENT,(dt+1)*Ct/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,dt,vt.width,vt.height,1,yt,zt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,vt.width,vt.height,ht.depth,yt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,lt,Et,vt.width,vt.height,ht.depth,0,vt.data,0,0);else kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?W&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,vt.width,vt.height,ht.depth,yt,Ot,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,lt,Et,vt.width,vt.height,ht.depth,0,yt,Ot,vt.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Gt&&Kt&&e.texStorage2D(i.TEXTURE_2D,Mt,Et,Bt[0].width,Bt[0].height);for(let lt=0,St=Bt.length;lt<St;lt++)vt=Bt[lt],v.format!==on?yt!==null?Gt?W&&e.compressedTexSubImage2D(i.TEXTURE_2D,lt,0,0,vt.width,vt.height,yt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,lt,Et,vt.width,vt.height,0,vt.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?W&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,vt.width,vt.height,yt,Ot,vt.data):e.texImage2D(i.TEXTURE_2D,lt,Et,vt.width,vt.height,0,yt,Ot,vt.data)}else if(v.isDataArrayTexture)if(Gt){if(Kt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Mt,Et,ht.width,ht.height,ht.depth),W)if(v.layerUpdates.size>0){let lt=wl(ht.width,ht.height,v.format,v.type);for(let St of v.layerUpdates){let Ct=ht.data.subarray(St*lt/ht.data.BYTES_PER_ELEMENT,(St+1)*lt/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,St,ht.width,ht.height,1,yt,Ot,Ct)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,yt,Ot,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,ht.width,ht.height,ht.depth,0,yt,Ot,ht.data);else if(v.isData3DTexture)Gt?(Kt&&e.texStorage3D(i.TEXTURE_3D,Mt,Et,ht.width,ht.height,ht.depth),W&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,yt,Ot,ht.data)):e.texImage3D(i.TEXTURE_3D,0,Et,ht.width,ht.height,ht.depth,0,yt,Ot,ht.data);else if(v.isFramebufferTexture){if(Kt)if(Gt)e.texStorage2D(i.TEXTURE_2D,Mt,Et,ht.width,ht.height);else{let lt=ht.width,St=ht.height;for(let Ct=0;Ct<Mt;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,Et,lt,St,0,yt,Ot,null),lt>>=1,St>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let lt=i.canvas;if(lt.hasAttribute("layoutsubtree")||lt.setAttribute("layoutsubtree","true"),ht.parentNode!==lt){lt.appendChild(ht),d.add(v),lt.onpaint=St=>{let Ct=St.changedElements;for(let dt of d)Ct.includes(dt.image)&&(dt.needsUpdate=!0)},lt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ht);else{let Ct=i.RGBA,dt=i.RGBA,zt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ct,dt,zt,ht)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Bt.length>0){if(Gt&&Kt){let lt=qt(Bt[0]);e.texStorage2D(i.TEXTURE_2D,Mt,Et,lt.width,lt.height)}for(let lt=0,St=Bt.length;lt<St;lt++)vt=Bt[lt],Gt?W&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,yt,Ot,vt):e.texImage2D(i.TEXTURE_2D,lt,Et,yt,Ot,vt);v.generateMipmaps=!1}else if(Gt){if(Kt){let lt=qt(ht);e.texStorage2D(i.TEXTURE_2D,Mt,Et,lt.width,lt.height)}W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,Ot,ht)}else e.texImage2D(i.TEXTURE_2D,0,Et,yt,Ot,ht);p(v)&&b(K),gt.__version=pt.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function Ft(P,v,X){if(v.image.length!==6)return;let K=jt(P,v),it=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+X);let pt=n.get(it);if(it.version!==pt.__version||K===!0){e.activeTexture(i.TEXTURE0+X);let gt=oe.getPrimaries(oe.workingColorSpace),st=v.colorSpace===Dn?null:oe.getPrimaries(v.colorSpace),ht=v.colorSpace===Dn||gt===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let yt=v.isCompressedTexture||v.image[0].isCompressedTexture,Ot=v.image[0]&&v.image[0].isDataTexture,Et=[];for(let dt=0;dt<6;dt++)!yt&&!Ot?Et[dt]=g(v.image[dt],!0,s.maxCubemapSize):Et[dt]=Ot?v.image[dt].image:v.image[dt],Et[dt]=Xt(v,Et[dt]);let vt=Et[0],Bt=r.convert(v.format,v.colorSpace),Gt=r.convert(v.type),Kt=_(v.internalFormat,Bt,Gt,v.normalized,v.colorSpace),W=v.isVideoTexture!==!0,Mt=pt.__version===void 0||K===!0,lt=it.dataReady,St=S(v,vt);Jt(i.TEXTURE_CUBE_MAP,v);let Ct;if(yt){W&&Mt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Kt,vt.width,vt.height);for(let dt=0;dt<6;dt++){Ct=Et[dt].mipmaps;for(let zt=0;zt<Ct.length;zt++){let Nt=Ct[zt];v.format!==on?Bt!==null?W?lt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt,0,0,Nt.width,Nt.height,Bt,Nt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt,Kt,Nt.width,Nt.height,0,Nt.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt,0,0,Nt.width,Nt.height,Bt,Gt,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt,Kt,Nt.width,Nt.height,0,Bt,Gt,Nt.data)}}}else{if(Ct=v.mipmaps,W&&Mt){Ct.length>0&&St++;let dt=qt(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Kt,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(Ot){W?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Et[dt].width,Et[dt].height,Bt,Gt,Et[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,Kt,Et[dt].width,Et[dt].height,0,Bt,Gt,Et[dt].data);for(let zt=0;zt<Ct.length;zt++){let Ee=Ct[zt].image[dt].image;W?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt+1,0,0,Ee.width,Ee.height,Bt,Gt,Ee.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt+1,Kt,Ee.width,Ee.height,0,Bt,Gt,Ee.data)}}else{W?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Bt,Gt,Et[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,Kt,Bt,Gt,Et[dt]);for(let zt=0;zt<Ct.length;zt++){let Nt=Ct[zt];W?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt+1,0,0,Bt,Gt,Nt.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,zt+1,Kt,Bt,Gt,Nt.image[dt])}}}p(v)&&b(i.TEXTURE_CUBE_MAP),pt.__version=it.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function bt(P,v,X,K,it,pt){let gt=r.convert(X.format,X.colorSpace),st=r.convert(X.type),ht=_(X.internalFormat,gt,st,X.normalized,X.colorSpace),yt=n.get(v),Ot=n.get(X);if(Ot.__renderTarget=v,!yt.__hasExternalTextures){let Et=Math.max(1,v.width>>pt),vt=Math.max(1,v.height>>pt);it===i.TEXTURE_3D||it===i.TEXTURE_2D_ARRAY?e.texImage3D(it,pt,ht,Et,vt,v.depth,0,gt,st,null):e.texImage2D(it,pt,ht,Et,vt,0,gt,st,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),ft(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,it,Ot.__webglTexture,0,rt(v)):(it===i.TEXTURE_2D||it>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,it,Ot.__webglTexture,pt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(P,v,X){if(i.bindRenderbuffer(i.RENDERBUFFER,P),v.depthBuffer){let K=v.depthTexture,it=K&&K.isDepthTexture?K.type:null,pt=M(v.stencilBuffer,it),gt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ft(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt(v),pt,v.width,v.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt(v),pt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,pt,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,P)}else{let K=v.textures;for(let it=0;it<K.length;it++){let pt=K[it],gt=r.convert(pt.format,pt.colorSpace),st=r.convert(pt.type),ht=_(pt.internalFormat,gt,st,pt.normalized,pt.colorSpace);ft(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt(v),ht,v.width,v.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt(v),ht,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ht,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function F(P,v,X){let K=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let it=n.get(v.depthTexture);if(it.__renderTarget=v,(!it.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K){if(it.__webglInit===void 0&&(it.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),it.__webglTexture===void 0){it.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),Jt(i.TEXTURE_CUBE_MAP,v.depthTexture);let yt=r.convert(v.depthTexture.format),Ot=r.convert(v.depthTexture.type),Et;v.depthTexture.format===Bn?Et=i.DEPTH_COMPONENT24:v.depthTexture.format===Li&&(Et=i.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,Et,v.width,v.height,0,yt,Ot,null)}}else at(v.depthTexture,0);let pt=it.__webglTexture,gt=rt(v),st=K?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,ht=v.depthTexture.format===Li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Bn)ft(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,st,pt,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,ht,st,pt,0);else if(v.depthTexture.format===Li)ft(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,st,pt,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,ht,st,pt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function L(P){let v=n.get(P),X=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){let K=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){let it=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",it)};K.addEventListener("dispose",it),v.__depthDisposeCallback=it}v.__boundDepthTexture=K}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(X)for(let K=0;K<6;K++)F(v.__webglFramebuffer[K],P,K);else{let K=P.texture.mipmaps;K&&K.length>0?F(v.__webglFramebuffer[0],P,0):F(v.__webglFramebuffer,P,0)}else if(X){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=i.createRenderbuffer(),Vt(v.__webglDepthbuffer[K],P,!1);else{let it=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=v.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,pt)}}else{let K=P.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Vt(v.__webglDepthbuffer,P,!1);else{let it=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,pt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function T(P,v,X){let K=n.get(P);v!==void 0&&bt(K.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&L(P)}function D(P){let v=P.texture,X=n.get(P),K=n.get(v);P.addEventListener("dispose",x);let it=P.textures,pt=P.isWebGLCubeRenderTarget===!0,gt=it.length>1;if(gt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=v.version,o.memory.textures++),pt){X.__webglFramebuffer=[];for(let st=0;st<6;st++)if(v.mipmaps&&v.mipmaps.length>0){X.__webglFramebuffer[st]=[];for(let ht=0;ht<v.mipmaps.length;ht++)X.__webglFramebuffer[st][ht]=i.createFramebuffer()}else X.__webglFramebuffer[st]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){X.__webglFramebuffer=[];for(let st=0;st<v.mipmaps.length;st++)X.__webglFramebuffer[st]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(gt)for(let st=0,ht=it.length;st<ht;st++){let yt=n.get(it[st]);yt.__webglTexture===void 0&&(yt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&ft(P)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let st=0;st<it.length;st++){let ht=it[st];X.__webglColorRenderbuffer[st]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[st]);let yt=r.convert(ht.format,ht.colorSpace),Ot=r.convert(ht.type),Et=_(ht.internalFormat,yt,Ot,ht.normalized,ht.colorSpace,P.isXRRenderTarget===!0),vt=rt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,vt,Et,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,X.__webglColorRenderbuffer[st])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),Vt(X.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pt){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Jt(i.TEXTURE_CUBE_MAP,v);for(let st=0;st<6;st++)if(v.mipmaps&&v.mipmaps.length>0)for(let ht=0;ht<v.mipmaps.length;ht++)bt(X.__webglFramebuffer[st][ht],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht);else bt(X.__webglFramebuffer[st],P,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);p(v)&&b(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let st=0,ht=it.length;st<ht;st++){let yt=it[st],Ot=n.get(yt),Et=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Et=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Et,Ot.__webglTexture),Jt(Et,yt),bt(X.__webglFramebuffer,P,yt,i.COLOR_ATTACHMENT0+st,Et,0),p(yt)&&b(Et)}e.unbindTexture()}else{let st=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(st=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,K.__webglTexture),Jt(st,v),v.mipmaps&&v.mipmaps.length>0)for(let ht=0;ht<v.mipmaps.length;ht++)bt(X.__webglFramebuffer[ht],P,v,i.COLOR_ATTACHMENT0,st,ht);else bt(X.__webglFramebuffer,P,v,i.COLOR_ATTACHMENT0,st,0);p(v)&&b(st),e.unbindTexture()}P.depthBuffer&&L(P)}function V(P){let v=P.textures;for(let X=0,K=v.length;X<K;X++){let it=v[X];if(p(it)){let pt=w(P),gt=n.get(it).__webglTexture;e.bindTexture(pt,gt),b(pt),e.unbindTexture()}}}let B=[],Y=[];function tt(P){if(P.samples>0){if(ft(P)===!1){let v=P.textures,X=P.width,K=P.height,it=i.COLOR_BUFFER_BIT,pt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(P),st=v.length>1;if(st)for(let yt=0;yt<v.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);let ht=P.texture.mipmaps;ht&&ht.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let yt=0;yt<v.length;yt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(it|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(it|=i.STENCIL_BUFFER_BIT)),st){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[yt]);let Ot=n.get(v[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ot,0)}i.blitFramebuffer(0,0,X,K,0,0,X,K,it,i.NEAREST),c===!0&&(B.length=0,Y.length=0,B.push(i.COLOR_ATTACHMENT0+yt),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(B.push(pt),Y.push(pt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Y)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,B))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),st)for(let yt=0;yt<v.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[yt]);let Ot=n.get(v[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,Ot,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&c){let v=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function rt(P){return Math.min(s.maxSamples,P.samples)}function ft(P){let v=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function U(P){let v=o.render.frame;h.get(P)!==v&&(h.set(P,v),P.update())}function Xt(P,v){let X=P.colorSpace,K=P.format,it=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==sr&&X!==Dn&&(oe.getTransfer(X)===_e?(K!==on||it!==rn)&&kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Wt("WebGLTextures: Unsupported texture color space:",X)),v}function qt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=z,this.getTextureUnits=O,this.setTextureUnits=H,this.setTexture2D=at,this.setTexture2DArray=j,this.setTexture3D=et,this.setTextureCube=ot,this.rebindTextures=T,this.setupRenderTarget=D,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=ft,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function xx(i,t){function e(n,s=Dn){let r,o=oe.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===da)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===pl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ml)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===dl)return i.BYTE;if(n===fl)return i.SHORT;if(n===Os)return i.UNSIGNED_SHORT;if(n===ua)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Ln)return i.HALF_FLOAT;if(n===gl)return i.ALPHA;if(n===_l)return i.RGB;if(n===on)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===xl)return i.RED;if(n===pa)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===ma)return i.RG_INTEGER;if(n===ga)return i.RGBA_INTEGER;if(n===Br||n===zr||n===Vr||n===kr)if(o===_e)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_a||n===xa||n===ya||n===va)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ma||n===Sa||n===ba||n===Ea||n===Ta||n===Hr||n===wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ma||n===Sa)return o===_e?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ba)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ea)return r.COMPRESSED_R11_EAC;if(n===Ta)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Hr)return r.COMPRESSED_RG11_EAC;if(n===wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Aa||n===Ca||n===Ra||n===Pa||n===Ia||n===La||n===Da||n===Na||n===Ua||n===Fa||n===Oa||n===Ba||n===za||n===Va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Aa)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ca)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ra)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pa)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ia)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===La)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Da)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Na)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ua)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fa)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oa)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ba)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===za)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Va)return o===_e?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ka||n===Ha||n===Ga)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ka)return o===_e?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wa||n===Xa||n===Gr||n===qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Wa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var yx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vx=`
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

}`,Vl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new dr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new fn({vertexShader:yx,fragmentShader:vx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new Yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kl=class extends An{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new Vl,p={},b=e.getContextAttributes(),w=null,_=null,M=[],S=[],R=new ut,x=null,C=null,I=new nn;I.viewport=new Re;let N=new nn;N.viewport=new Re;let k=[I,N],z=new ra,O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let ct=M[nt];return ct===void 0&&(ct=new ws,M[nt]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(nt){let ct=M[nt];return ct===void 0&&(ct=new ws,M[nt]=ct),ct.getGripSpace()},this.getHand=function(nt){let ct=M[nt];return ct===void 0&&(ct=new ws,M[nt]=ct),ct.getHandSpace()};function $(nt){let ct=S.indexOf(nt.inputSource);if(ct===-1)return;let mt=M[ct];mt!==void 0&&(mt.update(nt.inputSource,nt.frame,l||o),mt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function q(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",at);for(let nt=0;nt<M.length;nt++){let ct=S[nt];ct!==null&&(S[nt]=null,M[nt].disconnect(ct))}O=null,H=null,g.reset();for(let nt in p)delete p[nt];if(t.setRenderTarget(w),f=null,u=null,d=null,s=null,_=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(R.width,R.height,!1),C!==null){let nt=C.camera;nt.fov=C.fov,nt.zoom=C.zoom,nt.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){r=nt,n.isPresenting===!0&&kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(nt){l=nt},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(nt){if(s=nt,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",q),s.addEventListener("inputsourceschange",at),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(R),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Ft=null,bt=null;b.depth&&(bt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=b.stencil?Li:Bn,Ft=b.stencil?Bs:Pn);let Vt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Vt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new sn(u.textureWidth,u.textureHeight,{format:on,type:rn,depthTexture:new Ei(u.textureWidth,u.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let mt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new sn(f.framebufferWidth,f.framebufferHeight,{format:on,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function at(nt){for(let ct=0;ct<nt.removed.length;ct++){let mt=nt.removed[ct],Ft=S.indexOf(mt);Ft>=0&&(S[Ft]=null,M[Ft].disconnect(mt))}for(let ct=0;ct<nt.added.length;ct++){let mt=nt.added[ct],Ft=S.indexOf(mt);if(Ft===-1){for(let Vt=0;Vt<M.length;Vt++)if(Vt>=S.length){S.push(mt),Ft=Vt;break}else if(S[Vt]===null){S[Vt]=mt,Ft=Vt;break}if(Ft===-1)break}let bt=M[Ft];bt&&bt.connect(mt)}}let j=new A,et=new A;function ot(nt,ct,mt){j.setFromMatrixPosition(ct.matrixWorld),et.setFromMatrixPosition(mt.matrixWorld);let Ft=j.distanceTo(et),bt=ct.projectionMatrix.elements,Vt=mt.projectionMatrix.elements,F=bt[14]/(bt[10]-1),L=bt[14]/(bt[10]+1),T=(bt[9]+1)/bt[5],D=(bt[9]-1)/bt[5],V=(bt[8]-1)/bt[0],B=(Vt[8]+1)/Vt[0],Y=F*V,tt=F*B,rt=Ft/(-V+B),ft=rt*-V;if(ct.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(ft),nt.translateZ(rt),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),bt[10]===-1)nt.projectionMatrix.copy(ct.projectionMatrix),nt.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{let U=F+rt,Xt=L+rt,qt=Y-ft,P=tt+(Ft-ft),v=T*L/Xt*U,X=D*L/Xt*U;nt.projectionMatrix.makePerspective(qt,P,v,X,U,Xt),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function _t(nt,ct){ct===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(ct.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(s===null)return;let ct=nt.near,mt=nt.far;g.texture!==null&&(g.depthNear>0&&(ct=g.depthNear),g.depthFar>0&&(mt=g.depthFar)),z.near=N.near=I.near=ct,z.far=N.far=I.far=mt,(O!==z.near||H!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),O=z.near,H=z.far),z.layers.mask=nt.layers.mask|6,I.layers.mask=z.layers.mask&-5,N.layers.mask=z.layers.mask&-3;let Ft=nt.parent,bt=z.cameras;_t(z,Ft);for(let Vt=0;Vt<bt.length;Vt++)_t(bt[Vt],Ft);bt.length===2?ot(z,I,N):z.projectionMatrix.copy(I.projectionMatrix),C===null&&nt.isPerspectiveCamera&&(C={camera:nt,fov:nt.fov,zoom:nt.zoom}),xt(nt,z,Ft)};function xt(nt,ct,mt){mt===null?nt.matrix.copy(ct.matrixWorld):(nt.matrix.copy(mt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(ct.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(ct.projectionMatrix),nt.projectionMatrixInverse.copy(ct.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=bs*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(nt){c=nt,u!==null&&(u.fixedFoveation=nt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=nt)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(z)},this.getCameraTexture=function(nt){return p[nt]};let te=null;function Jt(nt,ct){if(h=ct.getViewerPose(l||o),m=ct,h!==null){let mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Ft=!1;mt.length!==z.cameras.length&&(z.cameras.length=0,Ft=!0);for(let L=0;L<mt.length;L++){let T=mt[L],D=null;if(f!==null)D=f.getViewport(T);else{let B=d.getViewSubImage(u,T);D=B.viewport,L===0&&(t.setRenderTargetTextures(_,B.colorTexture,B.depthStencilTexture),t.setRenderTarget(_))}let V=k[L];V===void 0&&(V=new nn,V.layers.enable(L),V.viewport=new Re,k[L]=V),V.matrix.fromArray(T.transform.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale),V.projectionMatrix.fromArray(T.projectionMatrix),V.projectionMatrixInverse.copy(V.projectionMatrix).invert(),V.viewport.set(D.x,D.y,D.width,D.height),L===0&&(z.matrix.copy(V.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ft===!0&&z.cameras.push(V)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){d=n.getBinding();let L=d.getDepthInformation(mt[0]);L&&L.isValid&&L.texture&&g.init(L,s.renderState)}if(bt&&bt.includes("camera-access")&&y){t.state.unbindTexture(),d=n.getBinding();for(let L=0;L<mt.length;L++){let T=mt[L].camera;if(T){let D=p[T];D||(D=new dr,p[T]=D);let V=d.getCameraImage(T);D.sourceTexture=V}}}}for(let mt=0;mt<M.length;mt++){let Ft=S[mt],bt=M[mt];Ft!==null&&bt!==void 0&&bt.update(Ft,ct,l||o)}te&&te(nt,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),m=null}let jt=new fd;jt.setAnimationLoop(Jt),this.setAnimationLoop=function(nt){te=nt},this.dispose=function(){}}},Mx=new he,yd=new Yt;yd.set(-1,0,0,0,1,0,0,0,1);function Sx(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,bl(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,b,w,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,b,w):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===tn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===tn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let b=t.get(p),w=b.envMap,_=b.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(Mx.makeRotationFromEuler(_)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(yd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,b,w){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=w*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function bx(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,M){let S=M.program;n.uniformBlockBinding(_,S)}function l(_,M){let S=s[_.id];S===void 0&&(g(_),S=h(_),s[_.id]=S,_.addEventListener("dispose",b));let R=M.program;n.updateUBOMapping(_,R);let x=t.render.frame;r[_.id]!==x&&(u(_),r[_.id]=x)}function h(_){let M=d();_.__bindingPointIndex=M;let S=i.createBuffer(),R=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return Wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let M=s[_.id],S=_.uniforms,R=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,C=S.length;x<C;x++){let I=S[x];if(Array.isArray(I))for(let N=0,k=I.length;N<k;N++)f(I[N],x,N,R);else f(I,x,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,M,S,R){if(y(_,M,S,R)===!0){let x=_.__offset,C=_.value;if(Array.isArray(C)){let I=0;for(let N=0;N<C.length;N++){let k=C[N],z=p(k);m(k,_.__data,I),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(I+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(C,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function m(_,M,S){typeof _=="number"||typeof _=="boolean"?M[0]=_:_.isMatrix3?(M[0]=_.elements[0],M[1]=_.elements[1],M[2]=_.elements[2],M[3]=0,M[4]=_.elements[3],M[5]=_.elements[4],M[6]=_.elements[5],M[7]=0,M[8]=_.elements[6],M[9]=_.elements[7],M[10]=_.elements[8],M[11]=0):ArrayBuffer.isView(_)?M.set(new _.constructor(_.buffer,_.byteOffset,M.length)):_.toArray(M,S)}function y(_,M,S,R){let x=_.value,C=M+"_"+S;if(R[C]===void 0)return typeof x=="number"||typeof x=="boolean"?R[C]=x:ArrayBuffer.isView(x)?R[C]=x.slice():R[C]=x.clone(),!0;{let I=R[C];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return R[C]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function g(_){let M=_.uniforms,S=0,R=16;for(let C=0,I=M.length;C<I;C++){let N=Array.isArray(M[C])?M[C]:[M[C]];for(let k=0,z=N.length;k<z;k++){let O=N[k],H=Array.isArray(O.value)?O.value:[O.value];for(let $=0,q=H.length;$<q;$++){let at=H[$],j=p(at),et=S%R,ot=et%j.boundary,_t=et+ot;S+=ot,_t!==0&&R-_t<j.storage&&(S+=R-_t),O.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=j.storage}}}let x=S%R;return x>0&&(S+=R-x),_.__size=S,_.__cache={},this}function p(_){let M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(M.boundary=16,M.storage=_.byteLength):kt("WebGLRenderer: Unsupported uniform value type.",_),M}function b(_){let M=_.target;M.removeEventListener("dispose",b);let S=o.indexOf(M.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function w(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:w}}var Ex=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function Tx(){return Hn===null&&(Hn=new Uo(Ex,16,16,Di,Ln),Hn.name="DFG_LUT",Hn.minFilter=Fe,Hn.magFilter=Fe,Hn.wrapS=xn,Hn.wrapT=xn,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var tc=class{constructor(t={}){let{canvas:e=Nu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=rn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=f,g=new Set([ga,ma,pa]),p=new Set([rn,Pn,Os,Bs,da,fa]),b=new Uint32Array(4),w=new Int32Array(4),_=new A,M=null,S=null,R=[],x=[],C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,N=!1,k=null,z=null,O=null,H=null;this._outputColorSpace=ke;let $=0,q=0,at=null,j=-1,et=null,ot=new Re,_t=new Re,xt=null,te=new Ht(0),Jt=0,jt=e.width,nt=e.height,ct=1,mt=null,Ft=null,bt=new Re(0,0,jt,nt),Vt=new Re(0,0,jt,nt),F=!1,L=new As,T=!1,D=!1,V=new he,B=new A,Y=new Re,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},rt=!1;function ft(){return at===null?ct:1}let U=n;function Xt(E,G){return e.getContext(E,G)}let qt,P,v,X,K,it,pt,gt,st,ht,yt,Ot,Et,vt,Bt,Gt,Kt,W,Mt,lt,St,Ct,dt;try{let E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ee,!1),e.addEventListener("webglcontextrestored",pe,!1),e.addEventListener("webglcontextcreationerror",Mn,!1),U===null){let G="webgl2";if(U=Xt(G,E),U===null)throw Xt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}zt()}catch(E){throw e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",Mn,!1),Wt("WebGLRenderer: "+E.message),E}function zt(){qt=new Lg(U),qt.init(),St=new xx(U,qt),P=new Sg(U,qt,t,St),v=new gx(U,qt),P.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),z=U.createFramebuffer(),O=U.createFramebuffer(),H=U.createFramebuffer(),X=new Ug(U),K=new nx,it=new _x(U,qt,v,K,P,St,X),pt=new Ig(I),gt=new Op(U),Ct=new vg(U,gt),st=new Dg(U,gt,X,Ct),ht=new Og(U,st,gt,Ct,X),W=new Fg(U,P,it),Bt=new bg(K),yt=new ex(I,pt,qt,P,Ct,Bt),Ot=new Sx(I,K),Et=new sx,vt=new hx(qt),Kt=new yg(I,pt,v,ht,m,c),Gt=new mx(I,ht,P),dt=new bx(U,X,P,v),Mt=new Mg(U,qt,X),lt=new Ng(U,qt,X),X.programs=yt.programs,I.capabilities=P,I.extensions=qt,I.properties=K,I.renderLists=Et,I.shadowMap=Gt,I.state=v,I.info=X}y!==rn&&(C=new zg(y,e.width,e.height,a,s,r));let Nt=new kl(I,U);this.xr=Nt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let E=qt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=qt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return ct},this.setPixelRatio=function(E){E!==void 0&&(ct=E,this.setSize(jt,nt,!1))},this.getSize=function(E){return E.set(jt,nt)},this.setSize=function(E,G,Q=!0){if(Nt.isPresenting){kt("WebGLRenderer: Can't change size while VR device is presenting.");return}jt=E,nt=G,e.width=Math.floor(E*ct),e.height=Math.floor(G*ct),Q===!0&&(e.style.width=E+"px",e.style.height=G+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,E,G)},this.getDrawingBufferSize=function(E){return E.set(jt*ct,nt*ct).floor()},this.setDrawingBufferSize=function(E,G,Q){jt=E,nt=G,ct=Q,e.width=Math.floor(E*Q),e.height=Math.floor(G*Q),this.setViewport(0,0,E,G)},this.setEffects=function(E){if(y===rn){Wt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let G=0;G<E.length;G++)if(E[G].isOutputPass===!0){kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(ot)},this.getViewport=function(E){return E.copy(bt)},this.setViewport=function(E,G,Q,Z){E.isVector4?bt.set(E.x,E.y,E.z,E.w):bt.set(E,G,Q,Z),v.viewport(ot.copy(bt).multiplyScalar(ct).round())},this.getScissor=function(E){return E.copy(Vt)},this.setScissor=function(E,G,Q,Z){E.isVector4?Vt.set(E.x,E.y,E.z,E.w):Vt.set(E,G,Q,Z),v.scissor(_t.copy(Vt).multiplyScalar(ct).round())},this.getScissorTest=function(){return F},this.setScissorTest=function(E){v.setScissorTest(F=E)},this.setOpaqueSort=function(E){mt=E},this.setTransparentSort=function(E){Ft=E},this.getClearColor=function(E){return E.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor(...arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha(...arguments)},this.clear=function(E=!0,G=!0,Q=!0){let Z=0;if(E){let J=!1;if(at!==null){let At=at.texture.format;J=g.has(At)}if(J){let At=at.texture.type,It=p.has(At),wt=Kt.getClearColor(),Lt=Kt.getClearAlpha(),Ut=wt.r,ee=wt.g,se=wt.b;It?(b[0]=Ut,b[1]=ee,b[2]=se,b[3]=Lt,U.clearBufferuiv(U.COLOR,0,b)):(w[0]=Ut,w[1]=ee,w[2]=se,w[3]=Lt,U.clearBufferiv(U.COLOR,0,w))}else Z|=U.COLOR_BUFFER_BIT}G&&(Z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(Z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&U.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),k=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",Mn,!1),Kt.dispose(),Et.dispose(),vt.dispose(),K.dispose(),pt.dispose(),ht.dispose(),Ct.dispose(),dt.dispose(),yt.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",ph),Nt.removeEventListener("sessionend",mh),Oi.stop()};function Ee(E){E.preventDefault(),vl("WebGLRenderer: Context Lost."),N=!0}function pe(){vl("WebGLRenderer: Context Restored."),N=!1;let E=X.autoReset,G=Gt.enabled,Q=Gt.autoUpdate,Z=Gt.needsUpdate,J=Gt.type;zt(),X.autoReset=E,Gt.enabled=G,Gt.autoUpdate=Q,Gt.needsUpdate=Z,Gt.type=J}function Mn(E){Wt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Un(E){let G=E.target;G.removeEventListener("dispose",Un),tf(G)}function tf(E){ef(E),K.remove(E)}function ef(E){let G=K.get(E).programs;G!==void 0&&(G.forEach(function(Q){yt.releaseProgram(Q)}),E.isShaderMaterial&&yt.releaseShaderCache(E))}this.renderBufferDirect=function(E,G,Q,Z,J,At){G===null&&(G=tt);let It=J.isMesh&&J.matrixWorld.determinantAffine()<0,wt=rf(E,G,Q,Z,J);v.setMaterial(Z,It);let Lt=Q.index,Ut=1;if(Z.wireframe===!0){if(Lt=st.getWireframeAttribute(Q),Lt===void 0)return;Ut=2}let ee=Q.drawRange,se=Q.attributes.position,Dt=ee.start*Ut,me=(ee.start+ee.count)*Ut;At!==null&&(Dt=Math.max(Dt,At.start*Ut),me=Math.min(me,(At.start+At.count)*Ut)),Lt!==null?(Dt=Math.max(Dt,0),me=Math.min(me,Lt.count)):se!=null&&(Dt=Math.max(Dt,0),me=Math.min(me,se.count));let De=me-Dt;if(De<0||De===1/0)return;Ct.setup(J,Z,wt,Q,Lt);let we,be=Mt;if(Lt!==null&&(we=gt.get(Lt),be=lt,be.setIndex(we)),J.isMesh)Z.wireframe===!0?(v.setLineWidth(Z.wireframeLinewidth*ft()),be.setMode(U.LINES)):be.setMode(U.TRIANGLES);else if(J.isLine){let We=Z.linewidth;We===void 0&&(We=1),v.setLineWidth(We*ft()),J.isLineSegments?be.setMode(U.LINES):J.isLineLoop?be.setMode(U.LINE_LOOP):be.setMode(U.LINE_STRIP)}else J.isPoints?be.setMode(U.POINTS):J.isSprite&&be.setMode(U.TRIANGLES);if(J.isBatchedMesh)if(qt.get("WEBGL_multi_draw"))be.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let We=J._multiDrawStarts,Pt=J._multiDrawCounts,Ke=J._multiDrawCount,ce=Lt?gt.get(Lt).bytesPerElement:1,gn=K.get(Z).currentProgram.getUniforms();for(let Fn=0;Fn<Ke;Fn++)gn.setValue(U,"_gl_DrawID",Fn),be.render(We[Fn]/ce,Pt[Fn])}else if(J.isInstancedMesh)be.renderInstances(Dt,De,J.count);else if(Q.isInstancedBufferGeometry){let We=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Pt=Math.min(Q.instanceCount,We);be.renderInstances(Dt,De,Pt)}else be.render(Dt,De)};function fh(E,G,Q,Z){k!==null&&E.isNodeMaterial&&k.setObject(Z,E),T===!0&&Bt.setState(E,Q,!1),E.transparent===!0&&E.side===Ie&&E.forceSinglePass===!1?(E.side=tn,E.needsUpdate=!0,Qr(E,G,Z),E.side=Pi,E.needsUpdate=!0,Qr(E,G,Z),E.side=Ie):Qr(E,G,Z)}this.compile=function(E,G,Q=null){Q===null&&(Q=E),k!==null&&k.renderStart(E,G,Q),S=vt.get(Q),S.init(G),x.push(S),Q.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),E!==Q&&E.traverseVisible(function(J){J.isLight&&J.layers.test(G.layers)&&(S.pushLight(J),J.castShadow&&S.pushShadow(J))}),S.setupLights(),k!==null&&k.updateLights(S.state.lightsArray),D=this.localClippingEnabled,T=Bt.init(this.clippingPlanes,D),T===!0&&Bt.setGlobalState(this.clippingPlanes,G),k!==null&&Gt.render(S.state.shadowsArray,Q,G);let Z=new Set;return E.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let At=J.material;if(At)if(Array.isArray(At))for(let It=0;It<At.length;It++){let wt=At[It];fh(wt,Q,G,J),Z.add(wt)}else fh(At,Q,G,J),Z.add(At)}),S=x.pop(),k!==null&&k.renderEnd(),Z},this.compileAsync=function(E,G,Q=null){let Z=this.compile(E,G,Q);return new Promise(J=>{function At(){if(Z.forEach(function(It){let Lt=K.get(It).currentProgram;(Lt===void 0||Lt.isReady())&&Z.delete(It)}),Z.size===0){J(E);return}setTimeout(At,10)}qt.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let pc=null;function nf(E){pc&&pc(E)}function ph(){Oi.stop()}function mh(){Oi.start()}let Oi=new fd;Oi.setAnimationLoop(nf),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(E){pc=E,Nt.setAnimationLoop(E),E===null?Oi.stop():Oi.start()},Nt.addEventListener("sessionstart",ph),Nt.addEventListener("sessionend",mh),this.render=function(E,G){if(G!==void 0&&G.isCamera!==!0){Wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;k!==null&&k.renderStart(E,G);let Q=Nt.enabled===!0&&Nt.isPresenting===!0,Z=C!==null&&(at===null||Q)&&C.begin(I,at);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(G),G=Nt.getCamera()),E.isScene===!0&&E.onBeforeRender(I,E,G,at),S=vt.get(E,x.length),S.init(G),S.state.textureUnits=it.getTextureUnits(),x.push(S),V.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),L.setFromProjectionMatrix(V,Tn,G.reversedDepth),D=this.localClippingEnabled,T=Bt.init(this.clippingPlanes,D),M=Et.get(E,R.length),M.init(),R.push(M),Nt.enabled===!0&&Nt.isPresenting===!0){let It=I.xr.getDepthSensingMesh();It!==null&&mc(It,G,-1/0,I.sortObjects)}mc(E,G,0,I.sortObjects),M.finish(),k!==null&&k.updateLights(S.state.lightsArray),I.sortObjects===!0&&M.sort(mt,Ft),rt=Nt.enabled===!1||Nt.isPresenting===!1||Nt.hasDepthSensing()===!1,rt&&Kt.addToRenderList(M,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),T===!0&&Bt.beginShadows();let J=S.state.shadowsArray;if(Gt.render(J,E,G),T===!0&&Bt.endShadows(),(Z&&C.hasRenderPass())===!1){let It=M.opaque,wt=M.transmissive;if(S.setupLights(),G.isArrayCamera){let Lt=G.cameras;if(wt.length>0)for(let Ut=0,ee=Lt.length;Ut<ee;Ut++){let se=Lt[Ut];_h(It,wt,E,se)}rt&&Kt.render(E);for(let Ut=0,ee=Lt.length;Ut<ee;Ut++){let se=Lt[Ut];gh(M,E,se,se.viewport)}}else wt.length>0&&_h(It,wt,E,G),rt&&Kt.render(E),gh(M,E,G)}at!==null&&q===0&&(it.updateMultisampleRenderTarget(at),it.updateRenderTargetMipmap(at)),Z&&C.end(I),E.isScene===!0&&E.onAfterRender(I,E,G),Ct.resetDefaultState(),j=-1,et=null,x.pop(),x.length>0?(S=x[x.length-1],it.setTextureUnits(S.state.textureUnits),T===!0&&Bt.setGlobalState(I.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?M=R[R.length-1]:M=null,k!==null&&k.renderEnd()};function mc(E,G,Q,Z){if(E.visible===!1)return;if(E.layers.test(G.layers)){if(E.isGroup)Q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(G);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(L)){Z&&Y.setFromMatrixPosition(E.matrixWorld).applyMatrix4(V);let It=ht.update(E),wt=E.material;wt.visible&&M.push(E,It,wt,Q,Y.z,null,G)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(L))){let It=ht.update(E),wt=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Y.copy(E.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Y.copy(It.boundingSphere.center)),Y.applyMatrix4(E.matrixWorld).applyMatrix4(V)),Array.isArray(wt)){let Lt=It.groups;for(let Ut=0,ee=Lt.length;Ut<ee;Ut++){let se=Lt[Ut],Dt=wt[se.materialIndex];Dt&&Dt.visible&&M.push(E,It,Dt,Q,Y.z,se,G)}}else wt.visible&&M.push(E,It,wt,Q,Y.z,null,G)}}let At=E.children;for(let It=0,wt=At.length;It<wt;It++)mc(At[It],G,Q,Z)}function gh(E,G,Q,Z){let{opaque:J,transmissive:At,transparent:It}=E;S.setupLightsView(Q),T===!0&&Bt.setGlobalState(I.clippingPlanes,Q),Z&&v.viewport(ot.copy(Z)),J.length>0&&jr(J,G,Q),At.length>0&&jr(At,G,Q),It.length>0&&jr(It,G,Q),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function _h(E,G,Q,Z){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[Z.id]===void 0){let Dt=qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[Z.id]=new sn(1,1,{generateMipmaps:!0,type:Dt?Ln:rn,minFilter:kn,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let At=S.state.transmissionRenderTarget[Z.id],It=Z.viewport||ot;At.setSize(It.z*I.transmissionResolutionScale,It.w*I.transmissionResolutionScale);let wt=I.getRenderTarget(),Lt=I.getActiveCubeFace(),Ut=I.getActiveMipmapLevel();I.setRenderTarget(At),I.getClearColor(te),Jt=I.getClearAlpha(),Jt<1&&I.setClearColor(16777215,.5),I.clear(),rt&&Kt.render(Q);let ee=I.toneMapping;I.toneMapping=Rn;let se=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),S.setupLightsView(Z),T===!0&&Bt.setGlobalState(I.clippingPlanes,Z),jr(E,Q,Z),it.updateMultisampleRenderTarget(At),it.updateRenderTargetMipmap(At),qt.has("WEBGL_multisampled_render_to_texture")===!1){let Dt=!1;for(let me=0,De=G.length;me<De;me++){let we=G[me],{object:be,geometry:We,material:Pt,group:Ke}=we;if(Pt.side===Ie&&be.layers.test(Z.layers)){let ce=Pt.side;Pt.side=tn,Pt.needsUpdate=!0,xh(be,Q,Z,We,Pt,Ke),Pt.side=ce,Pt.needsUpdate=!0,Dt=!0}}Dt===!0&&(it.updateMultisampleRenderTarget(At),it.updateRenderTargetMipmap(At))}I.setRenderTarget(wt,Lt,Ut),I.setClearColor(te,Jt),se!==void 0&&(Z.viewport=se),I.toneMapping=ee}function jr(E,G,Q){let Z=G.isScene===!0?G.overrideMaterial:null;for(let J=0,At=E.length;J<At;J++){let It=E[J],{object:wt,geometry:Lt,group:Ut}=It,ee=It.material;ee.allowOverride===!0&&Z!==null&&(ee=Z),wt.layers.test(Q.layers)&&xh(wt,G,Q,Lt,ee,Ut)}}function xh(E,G,Q,Z,J,At){k!==null&&J.isNodeMaterial&&k.setObject(E,J),E.onBeforeRender(I,G,Q,Z,J,At),E.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),J.onBeforeRender(I,G,Q,Z,E,At),J.transparent===!0&&J.side===Ie&&J.forceSinglePass===!1?(J.side=tn,J.needsUpdate=!0,I.renderBufferDirect(Q,G,Z,J,E,At),J.side=Pi,J.needsUpdate=!0,I.renderBufferDirect(Q,G,Z,J,E,At),J.side=Ie):I.renderBufferDirect(Q,G,Z,J,E,At),E.onAfterRender(I,G,Q,Z,J,At)}function Qr(E,G,Q){G.isScene!==!0&&(G=tt);let Z=K.get(E),J=S.state.lights,At=S.state.shadowsArray,It=J.state.version,wt=yt.getParameters(E,J.state,At,G,Q,S.state.lightProbeGridArray),Lt=yt.getProgramCacheKey(wt),Ut=Z.programs;Z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?G.environment:null,Z.fog=G.fog;let ee=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Z.envMap=pt.get(E.envMap||Z.environment,ee),Z.envMapRotation=Z.environment!==null&&E.envMap===null?G.environmentRotation:E.envMapRotation,Ut===void 0&&(E.addEventListener("dispose",Un),Ut=new Map,Z.programs=Ut);let se=Ut.get(Lt);if(se!==void 0){if(Z.currentProgram===se&&Z.lightsStateVersion===It)return vh(E,wt),se}else wt.uniforms=yt.getUniforms(E),k!==null&&E.isNodeMaterial&&k.build(E,Q,wt),E.onBeforeCompile(wt,I),se=yt.acquireProgram(wt,Lt),Ut.set(Lt,se),Z.uniforms=wt.uniforms;let Dt=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Dt.clippingPlanes=Bt.uniform),vh(E,wt),Z.needsLights=af(E),Z.lightsStateVersion=It,Z.needsLights&&(Dt.ambientLightColor.value=J.state.ambient,Dt.lightProbe.value=J.state.probe,Dt.sunLights.value=J.state.sun,Dt.sunLightShadows.value=J.state.sunShadow,Dt.directionalLights.value=J.state.directional,Dt.directionalLightShadows.value=J.state.directionalShadow,Dt.spotLights.value=J.state.spot,Dt.spotLightShadows.value=J.state.spotShadow,Dt.rectAreaLights.value=J.state.rectArea,Dt.ltc_1.value=J.state.rectAreaLTC1,Dt.ltc_2.value=J.state.rectAreaLTC2,Dt.pointLights.value=J.state.point,Dt.pointLightShadows.value=J.state.pointShadow,Dt.hemisphereLights.value=J.state.hemi,Dt.sunShadowMatrix.value=J.state.sunShadowMatrix,Dt.sunShadowCascade.value=J.state.sunShadowCascade,Dt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Dt.spotLightMatrix.value=J.state.spotLightMatrix,Dt.spotLightMap.value=J.state.spotLightMap,Dt.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.lightProbeGrid=S.state.lightProbeGridArray.length>0,Z.currentProgram=se,Z.uniformsList=null,se}function yh(E){if(E.uniformsList===null){let G=E.currentProgram.getUniforms();E.uniformsList=ks.seqWithValue(G.seq,E.uniforms)}return E.uniformsList}function vh(E,G){let Q=K.get(E);Q.outputColorSpace=G.outputColorSpace,Q.batching=G.batching,Q.batchingColor=G.batchingColor,Q.instancing=G.instancing,Q.instancingColor=G.instancingColor,Q.instancingMorph=G.instancingMorph,Q.skinning=G.skinning,Q.morphTargets=G.morphTargets,Q.morphNormals=G.morphNormals,Q.morphColors=G.morphColors,Q.morphTargetsCount=G.morphTargetsCount,Q.numClippingPlanes=G.numClippingPlanes,Q.numIntersection=G.numClipIntersection,Q.vertexAlphas=G.vertexAlphas,Q.vertexTangents=G.vertexTangents,Q.toneMapping=G.toneMapping}function sf(E,G){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;_.setFromMatrixPosition(G.matrixWorld);for(let Q=0,Z=E.length;Q<Z;Q++){let J=E[Q];if(J.texture!==null&&J.boundingBox.containsPoint(_))return J}return null}function rf(E,G,Q,Z,J){G.isScene!==!0&&(G=tt),it.resetTextureUnits();let At=G.fog,It=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?G.environment:null,wt=at===null?I.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:oe.workingColorSpace,Lt=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ut=pt.get(Z.envMap||It,Lt),ee=Z.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,se=!!Q.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Dt=!!Q.morphAttributes.position,me=!!Q.morphAttributes.normal,De=!!Q.morphAttributes.color,we=Rn;Z.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(we=I.toneMapping);let be=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,We=be!==void 0?be.length:0,Pt=K.get(Z),Ke=S.state.lights;if(T===!0&&(D===!0||E!==et)){let Te=E===et&&Z.id===j;Bt.setState(Z,E,Te)}let ce=!1;Z.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==Ke.state.version||Pt.outputColorSpace!==wt||J.isBatchedMesh&&Pt.batching===!1||!J.isBatchedMesh&&Pt.batching===!0||J.isBatchedMesh&&Pt.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&Pt.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&Pt.instancing===!1||!J.isInstancedMesh&&Pt.instancing===!0||J.isSkinnedMesh&&Pt.skinning===!1||!J.isSkinnedMesh&&Pt.skinning===!0||J.isInstancedMesh&&Pt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Pt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Pt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Pt.instancingMorph===!1&&J.morphTexture!==null||Pt.envMap!==Ut||Z.fog===!0&&Pt.fog!==At||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Bt.numPlanes||Pt.numIntersection!==Bt.numIntersection)||Pt.vertexAlphas!==ee||Pt.vertexTangents!==se||Pt.morphTargets!==Dt||Pt.morphNormals!==me||Pt.morphColors!==De||Pt.toneMapping!==we||Pt.morphTargetsCount!==We||!!Pt.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ce=!0):(ce=!0,Pt.__version=Z.version);let gn=Pt.currentProgram;ce===!0&&(gn=Qr(Z,G,J),k&&Z.isNodeMaterial&&k.onUpdateProgram(Z,gn,Pt));let Fn=!1,di=!1,ts=!1,Me=gn.getUniforms(),Le=Pt.uniforms;if(v.useProgram(gn.program)&&(Fn=!0,di=!0,ts=!0),Z.id!==j&&(j=Z.id,di=!0),Pt.needsLights){let Te=sf(S.state.lightProbeGridArray,J);Pt.lightProbeGrid!==Te&&(Pt.lightProbeGrid=Te,di=!0)}if(Fn||et!==E){v.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Me.setValue(U,"projectionMatrix",E.projectionMatrix),Me.setValue(U,"viewMatrix",E.matrixWorldInverse);let pi=Me.map.cameraPosition;pi!==void 0&&pi.setValue(U,B.setFromMatrixPosition(E.matrixWorld)),P.logarithmicDepthBuffer&&Me.setValue(U,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Me.setValue(U,"isOrthographic",E.isOrthographicCamera===!0),et!==E&&(et=E,di=!0,ts=!0)}if(Pt.needsLights&&(Ke.state.sunShadowMap.length>0&&Me.setValue(U,"sunShadowMap",Ke.state.sunShadowMap,it),Ke.state.directionalShadowMap.length>0&&Me.setValue(U,"directionalShadowMap",Ke.state.directionalShadowMap,it),Ke.state.spotShadowMap.length>0&&Me.setValue(U,"spotShadowMap",Ke.state.spotShadowMap,it),Ke.state.pointShadowMap.length>0&&Me.setValue(U,"pointShadowMap",Ke.state.pointShadowMap,it)),J.isSkinnedMesh){Me.setOptional(U,J,"bindMatrix"),Me.setOptional(U,J,"bindMatrixInverse");let Te=J.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),Me.setValue(U,"boneTexture",Te.boneTexture,it))}J.isBatchedMesh&&(Me.setOptional(U,J,"batchingTexture"),Me.setValue(U,"batchingTexture",J._matricesTexture,it),Me.setOptional(U,J,"batchingIdTexture"),Me.setValue(U,"batchingIdTexture",J._indirectTexture,it),Me.setOptional(U,J,"batchingColorTexture"),J._colorsTexture!==null&&Me.setValue(U,"batchingColorTexture",J._colorsTexture,it));let fi=Q.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&W.update(J,Q,gn),(di||Pt.receiveShadow!==J.receiveShadow)&&(Pt.receiveShadow=J.receiveShadow,Me.setValue(U,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&G.environment!==null&&(Le.envMapIntensity.value=G.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=Tx()),di){if(Me.setValue(U,"toneMappingExposure",I.toneMappingExposure),Pt.needsLights&&of(Le,ts),At&&Z.fog===!0&&Ot.refreshFogUniforms(Le,At),Ot.refreshMaterialUniforms(Le,Z,ct,nt,S.state.transmissionRenderTarget[E.id]),Pt.needsLights&&Pt.lightProbeGrid){let Te=Pt.lightProbeGrid;Le.probesSH.value=Te.texture,Le.probesMin.value.copy(Te.boundingBox.min),Le.probesMax.value.copy(Te.boundingBox.max),Le.probesResolution.value.copy(Te.resolution)}ks.upload(U,yh(Pt),Le,it)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ks.upload(U,yh(Pt),Le,it),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Me.setValue(U,"center",J.center),Me.setValue(U,"modelViewMatrix",J.modelViewMatrix),Me.setValue(U,"normalMatrix",J.normalMatrix),Me.setValue(U,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){let Te=Z.uniformsGroups;for(let pi=0,es=Te.length;pi<es;pi++){let Sh=Te[pi];dt.update(Sh,gn),dt.bind(Sh,gn)}}return gn}function of(E,G){E.ambientLightColor.needsUpdate=G,E.lightProbe.needsUpdate=G,E.sunLights.needsUpdate=G,E.sunLightShadows.needsUpdate=G,E.directionalLights.needsUpdate=G,E.directionalLightShadows.needsUpdate=G,E.pointLights.needsUpdate=G,E.pointLightShadows.needsUpdate=G,E.spotLights.needsUpdate=G,E.spotLightShadows.needsUpdate=G,E.rectAreaLights.needsUpdate=G,E.hemisphereLights.needsUpdate=G}function af(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(E,G,Q){let Z=K.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),K.get(E.texture).__webglTexture=G,K.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:Q,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,G){let Q=K.get(E);Q.__webglFramebuffer=G,Q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(E,G=0,Q=0){at=E,$=G,q=Q;let Z=null,J=!1,At=!1;if(E){let wt=K.get(E);if(wt.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(U.FRAMEBUFFER,wt.__webglFramebuffer),ot.copy(E.viewport),_t.copy(E.scissor),xt=E.scissorTest,v.viewport(ot),v.scissor(_t),v.setScissorTest(xt),j=-1;return}else if(wt.__webglFramebuffer===void 0)it.setupRenderTarget(E);else if(wt.__hasExternalTextures)it.rebindTextures(E,K.get(E.texture).__webglTexture,K.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let ee=E.depthTexture;if(wt.__boundDepthTexture!==ee){if(ee!==null&&K.has(ee)&&(E.width!==ee.image.width||E.height!==ee.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");it.setupDepthRenderbuffer(E)}}let Lt=E.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(At=!0);let Ut=K.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ut[G])?Z=Ut[G][Q]:Z=Ut[G],J=!0):E.samples>0&&it.useMultisampledRTT(E)===!1?Z=K.get(E).__webglMultisampledFramebuffer:Array.isArray(Ut)?Z=Ut[Q]:Z=Ut,ot.copy(E.viewport),_t.copy(E.scissor),xt=E.scissorTest}else ot.copy(bt).multiplyScalar(ct).floor(),_t.copy(Vt).multiplyScalar(ct).floor(),xt=F;if(Q!==0&&(Z=z),v.bindFramebuffer(U.FRAMEBUFFER,Z)&&v.drawBuffers(E,Z),v.viewport(ot),v.scissor(_t),v.setScissorTest(xt),J){let wt=K.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+G,wt.__webglTexture,Q)}else if(At){let wt=G;for(let Lt=0;Lt<E.textures.length;Lt++){let Ut=K.get(E.textures[Lt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Lt,Ut.__webglTexture,Q,wt)}}else if(E!==null&&Q!==0){let wt=K.get(E.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,wt.__webglTexture,Q)}j=-1};function Mh(E){let G=K.get(E);return(G.__readFormat!==E.format||G.__readType!==E.type)&&(G.__readFormat=E.format,G.__readType=E.type,G.__formatReadable=P.textureFormatReadable(E.format),G.__typeReadable=P.textureTypeReadable(E.type)),G}this.readRenderTargetPixels=function(E,G,Q,Z,J,At,It,wt=0){if(!(E&&E.isWebGLRenderTarget)){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=K.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&It!==void 0&&(Lt=Lt[It]),Lt){v.bindFramebuffer(U.FRAMEBUFFER,Lt);try{let Ut=E.textures[wt],ee=Ut.format,se=Ut.type;E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+wt);let Dt=Mh(Ut);if(Dt.__formatReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Dt.__typeReadable===!1){Wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=E.width-Z&&Q>=0&&Q<=E.height-J&&U.readPixels(G,Q,Z,J,St.convert(ee),St.convert(se),At)}finally{let Ut=at!==null?K.get(at).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(E,G,Q,Z,J,At,It,wt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=K.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&It!==void 0&&(Lt=Lt[It]),Lt)if(G>=0&&G<=E.width-Z&&Q>=0&&Q<=E.height-J){v.bindFramebuffer(U.FRAMEBUFFER,Lt);let Ut=E.textures[wt],ee=Ut.format,se=Ut.type;E.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+wt);let Dt=Mh(Ut);if(Dt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Dt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let me=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,me),U.bufferData(U.PIXEL_PACK_BUFFER,At.byteLength,U.STREAM_READ),U.readPixels(G,Q,Z,J,St.convert(ee),St.convert(se),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let De=at!==null?K.get(at).__webglFramebuffer:null;v.bindFramebuffer(U.FRAMEBUFFER,De);let we=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Fu(U,we,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,me),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,At),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(me),U.deleteSync(we),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,G=null,Q=0){let Z=Math.pow(2,-Q),J=Math.floor(E.image.width*Z),At=Math.floor(E.image.height*Z),It=G!==null?G.x:0,wt=G!==null?G.y:0;it.setTexture2D(E,0),U.copyTexSubImage2D(U.TEXTURE_2D,Q,0,0,It,wt,J,At),v.unbindTexture()},this.copyTextureToTexture=function(E,G,Q=null,Z=null,J=0,At=0){let It,wt,Lt,Ut,ee,se,Dt,me,De,we=E.isCompressedTexture?E.mipmaps[At]:E.image;if(Q!==null)It=Q.max.x-Q.min.x,wt=Q.max.y-Q.min.y,Lt=Q.isBox3?Q.max.z-Q.min.z:1,Ut=Q.min.x,ee=Q.min.y,se=Q.isBox3?Q.min.z:0;else{let Le=Math.pow(2,-J);It=Math.floor(we.width*Le),wt=Math.floor(we.height*Le),E.isDataArrayTexture?Lt=we.depth:E.isData3DTexture?Lt=Math.floor(we.depth*Le):Lt=1,Ut=0,ee=0,se=0}Z!==null?(Dt=Z.x,me=Z.y,De=Z.z):(Dt=0,me=0,De=0);let be=St.convert(G.format),We=St.convert(G.type),Pt;G.isData3DTexture?(it.setTexture3D(G,0),Pt=U.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(it.setTexture2DArray(G,0),Pt=U.TEXTURE_2D_ARRAY):(it.setTexture2D(G,0),Pt=U.TEXTURE_2D),v.activeTexture(U.TEXTURE0),v.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,G.flipY),v.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),v.pixelStorei(U.UNPACK_ALIGNMENT,G.unpackAlignment);let Ke=v.getParameter(U.UNPACK_ROW_LENGTH),ce=v.getParameter(U.UNPACK_IMAGE_HEIGHT),gn=v.getParameter(U.UNPACK_SKIP_PIXELS),Fn=v.getParameter(U.UNPACK_SKIP_ROWS),di=v.getParameter(U.UNPACK_SKIP_IMAGES);v.pixelStorei(U.UNPACK_ROW_LENGTH,we.width),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,we.height),v.pixelStorei(U.UNPACK_SKIP_PIXELS,Ut),v.pixelStorei(U.UNPACK_SKIP_ROWS,ee),v.pixelStorei(U.UNPACK_SKIP_IMAGES,se);let ts=E.isDataArrayTexture||E.isData3DTexture,Me=G.isDataArrayTexture||G.isData3DTexture;if(E.isDepthTexture){let Le=K.get(E),fi=K.get(G),Te=K.get(Le.__renderTarget),pi=K.get(fi.__renderTarget);v.bindFramebuffer(U.READ_FRAMEBUFFER,Te.__webglFramebuffer),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let es=0;es<Lt;es++)ts&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,K.get(E).__webglTexture,J,se+es),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,K.get(G).__webglTexture,At,De+es)),U.blitFramebuffer(Ut,ee,It,wt,Dt,me,It,wt,U.DEPTH_BUFFER_BIT,U.NEAREST);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(J!==0||E.isRenderTargetTexture||K.has(E)){let Le=K.get(E),fi=K.get(G);v.bindFramebuffer(U.READ_FRAMEBUFFER,O),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,H);for(let Te=0;Te<Lt;Te++)ts?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Le.__webglTexture,J,se+Te):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Le.__webglTexture,J),Me?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,fi.__webglTexture,At,De+Te):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,fi.__webglTexture,At),J!==0?U.blitFramebuffer(Ut,ee,It,wt,Dt,me,It,wt,U.COLOR_BUFFER_BIT,U.NEAREST):Me?U.copyTexSubImage3D(Pt,At,Dt,me,De+Te,Ut,ee,It,wt):U.copyTexSubImage2D(Pt,At,Dt,me,Ut,ee,It,wt);v.bindFramebuffer(U.READ_FRAMEBUFFER,null),v.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Me?E.isDataTexture||E.isData3DTexture?U.texSubImage3D(Pt,At,Dt,me,De,It,wt,Lt,be,We,we.data):G.isCompressedArrayTexture?U.compressedTexSubImage3D(Pt,At,Dt,me,De,It,wt,Lt,be,we.data):U.texSubImage3D(Pt,At,Dt,me,De,It,wt,Lt,be,We,we):E.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,At,Dt,me,It,wt,be,We,we.data):E.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,At,Dt,me,we.width,we.height,be,we.data):U.texSubImage2D(U.TEXTURE_2D,At,Dt,me,It,wt,be,We,we);v.pixelStorei(U.UNPACK_ROW_LENGTH,Ke),v.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ce),v.pixelStorei(U.UNPACK_SKIP_PIXELS,gn),v.pixelStorei(U.UNPACK_SKIP_ROWS,Fn),v.pixelStorei(U.UNPACK_SKIP_IMAGES,di),At===0&&G.generateMipmaps&&U.generateMipmap(Pt),v.unbindTexture()},this.initRenderTarget=function(E){K.get(E).__webglFramebuffer===void 0&&it.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?it.setTextureCube(E,0):E.isData3DTexture?it.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?it.setTexture2DArray(E,0):it.setTexture2D(E,0),v.unbindTexture()},this.resetState=function(){$=0,q=0,at=null,v.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var vd={type:"change"},Wl={type:"start"},Sd={type:"end"},ic=new Si,Md=new un,wx=Math.cos(70*ii.DEG2RAD),ze=new A,an=2*Math.PI,ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gl=1e-6,sc=class extends Nr{constructor(t,e=null){super(t,e),this.state=ye.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yn.ROTATE,MIDDLE:yn.DOLLY,RIGHT:yn.PAN},this.touches={ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new je,this._lastTargetPosition=new A,this._quat=new je().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ds,this._sphericalDelta=new Ds,this._scale=1,this._panOffset=new A,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new A,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Cx.bind(this),this._onPointerDown=Ax.bind(this),this._onPointerUp=Rx.bind(this),this._onContextMenu=Fx.bind(this),this._onMouseWheel=Lx.bind(this),this._onKeyDown=Dx.bind(this),this._onTouchStart=Nx.bind(this),this._onTouchMove=Ux.bind(this),this._onMouseDown=Px.bind(this),this._onMouseMove=Ix.bind(this),this._interceptControlDown=Ox.bind(this),this._interceptControlUp=Bx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ye.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(vd),this.update(),this.state=ye.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ze.copy(e).sub(this.target),ze.applyQuaternion(this._quat),this._spherical.setFromVector3(ze),this.autoRotate&&this.state===ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=an:n>Math.PI&&(n-=an),s<-Math.PI?s+=an:s>Math.PI&&(s-=an),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ze.setFromSpherical(this._spherical),ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=ze.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new A(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new A(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ic.origin.copy(this.object.position),ic.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ic.direction))<wx?this.object.lookAt(this.target):(Md.setFromNormalAndCoplanarPoint(this.object.up,this.target),ic.intersectPlane(Md,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Gl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gl||this._lastTargetPosition.distanceToSquared(this.target)>Gl?(this.dispatchEvent(vd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?an/60*this.autoRotateSpeed*t:an/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ze.setFromMatrixColumn(e,0),ze.multiplyScalar(-t),this._panOffset.add(ze)}_panUp(t,e){this.screenSpacePanning===!0?ze.setFromMatrixColumn(e,1):(ze.setFromMatrixColumn(e,0),ze.crossVectors(this.object.up,ze)),ze.multiplyScalar(t),this._panOffset.add(ze)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ze.copy(s).sub(this.target);let r=ze.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Ax(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Cx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Rx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Sd),this.state=ye.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Px(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case yn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ye.DOLLY;break;case yn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}break;case yn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(Wl)}function Ix(i){switch(this.state){case ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Lx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ye.NONE||(i.preventDefault(),this.dispatchEvent(Wl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Sd))}function Dx(i){this.enabled!==!1&&this._handleKeyDown(i)}function Nx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ye.TOUCH_ROTATE;break;case Ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ye.TOUCH_PAN;break;default:this.state=ye.NONE}break;case 2:switch(this.touches.TWO){case Ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ye.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ye.TOUCH_DOLLY_ROTATE;break;default:this.state=ye.NONE}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(Wl)}function Ux(i){switch(this._trackPointer(i),this.state){case ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ye.NONE}}function Fx(i){this.enabled!==!1&&i.preventDefault()}function Ox(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Bx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var bd={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},Ni=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(t){return new Jl(t)}),this.register(function(t){return new Kl(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new $l(t)}),this.register(function(t){return new jl(t)}),this.register(function(t){return new Ql(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new ch(t)})}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}setTextureUtils(t){return this.textureUtils=t,this}parse(t,e,n,s){let r=new Zl,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(t,e,s).catch(n)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,s,r,e)})}},re={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Xl="KHR_mesh_quantization",mn={};mn[Ue]=re.NEAREST;mn[ha]=re.NEAREST_MIPMAP_NEAREST;mn[Ki]=re.NEAREST_MIPMAP_LINEAR;mn[Fe]=re.LINEAR;mn[Fs]=re.LINEAR_MIPMAP_NEAREST;mn[kn]=re.LINEAR_MIPMAP_LINEAR;mn[xn]=re.CLAMP_TO_EDGE;mn[xs]=re.REPEAT;mn[ys]=re.MIRRORED_REPEAT;var Ed={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},zx=new Ht,Td=12,Vx=1179937895,kx=2,wd=8,Hx=1313821514,Gx=5130562;function ri(i,t){return i.length===t.length&&i.every(function(e,n){return e===t[n]})}function Wx(i){return new TextEncoder().encode(i).buffer}function Xx(i){return ri(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function qx(i,t,e){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=t;s<t+e;s++)for(let r=0;r<i.itemSize;r++){let o;i.itemSize>4?o=i.array[s*i.itemSize+r]:(r===0?o=i.getX(s):r===1?o=i.getY(s):r===2?o=i.getZ(s):r===3&&(o=i.getW(s)),i.normalized===!0&&(o=ii.normalize(o,i.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function Ad(i){return Math.ceil(i/4)*4}function ql(i,t=0){let e=Ad(i.byteLength);if(e!==i.byteLength){let n=new Uint8Array(e);if(n.set(new Uint8Array(i)),t!==0)for(let s=i.byteLength;s<e;s++)n[s]=t;return n.buffer}return i}function Yl(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function Yx(i,t){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let e;return t==="image/jpeg"?e=.92:t==="image/webp"&&(e=.8),i.convertToBlob({type:t,quality:e})}else return new Promise(e=>i.toBlob(e,t))}var Zl=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r186"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map,normalMaps:new Map},this.textureUtils=null}setPlugins(t){this.plugins=t}setTextureUtils(t){this.textureUtils=t}async writeAsync(t,e,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1,copyright:null},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(t),await Promise.all(this.pending);let s=this,r=s.buffers,o=s.json;n=s.options;let a=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(a),d=Object.keys(c);if(h.length>0&&(o.extensionsUsed=h),d.length>0&&(o.extensionsRequired=d),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.copyright&&(o.asset.copyright=n.copyright),n.binary===!0){let u=new FileReader;u.readAsArrayBuffer(l),u.onloadend=function(){let f=ql(u.result),m=new DataView(new ArrayBuffer(wd));m.setUint32(0,f.byteLength,!0),m.setUint32(4,Gx,!0);let y=ql(Wx(JSON.stringify(o)),32),g=new DataView(new ArrayBuffer(wd));g.setUint32(0,y.byteLength,!0),g.setUint32(4,Hx,!0);let p=new ArrayBuffer(Td),b=new DataView(p);b.setUint32(0,Vx,!0),b.setUint32(4,kx,!0);let w=Td+g.byteLength+y.byteLength+m.byteLength+f.byteLength;b.setUint32(8,w,!0);let _=new Blob([p,g,y,m,f],{type:"application/octet-stream"}),M=new FileReader;M.readAsArrayBuffer(_),M.onloadend=function(){e(M.result)}}}else if(o.buffers&&o.buffers.length>0){let u=new FileReader;u.readAsDataURL(l),u.onloadend=function(){let f=u.result;o.buffers[0].uri=f,e(o)}}else e(o)}serializeUserData(t,e){if(Object.keys(t.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(t.userData));if(n.includeCustomExtensions&&r.gltfExtensions){e.extensions===void 0&&(e.extensions={});for(let o in r.gltfExtensions)e.extensions[o]=r.gltfExtensions[o],s[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(e.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+t.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(t,e=!1){if(this.uids.has(t)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(t,s)}return this.uids.get(t).get(e)}isNormalizedNormalAttribute(t){if(this.cache.attributesNormalized.has(t))return!1;let n=new A;for(let s=0,r=t.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(t,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(t){let e=this.cache;if(e.attributesNormalized.has(t))return e.attributesNormalized.get(t);let n=t.clone(),s=new A;for(let r=0,o=n.count;r<o;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return e.attributesNormalized.set(t,n),n}applyTextureTransform(t,e){let n=!1,s={};(e.offset.x!==0||e.offset.y!==0)&&(s.offset=e.offset.toArray(),n=!0),e.rotation!==0&&(s.rotation=e.rotation,n=!0),(e.repeat.x!==1||e.repeat.y!==1)&&(s.scale=e.repeat.toArray(),n=!0),n&&(t.extensions=t.extensions||{},t.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(t,e){if(t===e)return t;function n(f){return f.colorSpace===ke?function(y){return y<.04045?y*.0773993808:Math.pow(y*.9478672986+.0521327014,2.4)}:function(y){return y}}t instanceof bi&&(t=await this.decompressTextureAsync(t)),e instanceof bi&&(e=await this.decompressTextureAsync(e));let s=t?t.image:null,r=e?e.image:null,o=Math.max(s?s.width:0,r?r.width:0),a=Math.max(s?s.height:0,r?r.height:0),c=Yl();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let h=l.getImageData(0,0,o,a);if(s){l.drawImage(s,0,0,o,a);let f=n(t),m=l.getImageData(0,0,o,a).data;for(let y=2;y<m.length;y+=4)h.data[y]=f(m[y]/256)*256}if(r){l.drawImage(r,0,0,o,a);let f=n(e),m=l.getImageData(0,0,o,a).data;for(let y=1;y<m.length;y+=4)h.data[y]=f(m[y]/256)*256}l.putImageData(h,0,0);let u=(t||e).clone();return u.source=new jn(c),u.colorSpace=Dn,u.channel=(t||e).channel,t&&e&&t.channel!==e.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),u}async buildNormalMapTextureAsync(t,e,n){t instanceof bi&&(t=await this.decompressTextureAsync(t));let s=t.image,r=Yl();r.width=s.width,r.height=s.height;let o=r.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,0,r.width,r.height);let a=o.getImageData(0,0,r.width,r.height),c=a.data;for(let h=0;h<c.length;h+=4)e&&(c[h+0]=255-c[h+0]),n&&(c[h+1]=255-c[h+1]);o.putImageData(a,0,0);let l=t.clone();return l.source=new jn(r),l}async decompressTextureAsync(t,e=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(t,e)}processBuffer(t){let e=this.json,n=this.buffers;return e.buffers||(e.buffers=[{byteLength:0}]),n.push(t),0}processBufferView(t,e,n,s,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(e){case re.BYTE:case re.UNSIGNED_BYTE:a=1;break;case re.SHORT:case re.UNSIGNED_SHORT:a=2;break;default:a=4}let c=t.itemSize*a;r===re.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=Ad(s*c),h=new DataView(new ArrayBuffer(l)),d=0;for(let m=n;m<n+s;m++){for(let y=0;y<t.itemSize;y++){let g;t.itemSize>4?g=t.array[m*t.itemSize+y]:(y===0?g=t.getX(m):y===1?g=t.getY(m):y===2?g=t.getZ(m):y===3&&(g=t.getW(m)),t.normalized===!0&&(g=ii.normalize(g,t.array))),e===re.FLOAT?h.setFloat32(d,g,!0):e===re.INT?h.setInt32(d,g,!0):e===re.UNSIGNED_INT?h.setUint32(d,g,!0):e===re.SHORT?h.setInt16(d,g,!0):e===re.UNSIGNED_SHORT?h.setUint16(d,g,!0):e===re.BYTE?h.setInt8(d,g):e===re.UNSIGNED_BYTE&&h.setUint8(d,g),d+=a}d%c!==0&&(d+=c-d%c)}let u={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(u.target=r),r===re.ARRAY_BUFFER&&(u.byteStride=c),this.byteOffset+=l,o.bufferViews.push(u),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(t){let e=this,n=e.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(t),r.onloadend=function(){let o=ql(r.result),a={buffer:e.processBuffer(o),byteOffset:e.byteOffset,byteLength:o.byteLength};e.byteOffset+=o.byteLength,s(n.bufferViews.push(a)-1)}})}processAccessor(t,e,n,s){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(t.array.constructor===Float32Array)a=re.FLOAT;else if(t.array.constructor===Int32Array)a=re.INT;else if(t.array.constructor===Uint32Array)a=re.UNSIGNED_INT;else if(t.array.constructor===Int16Array)a=re.SHORT;else if(t.array.constructor===Uint16Array)a=re.UNSIGNED_SHORT;else if(t.array.constructor===Int8Array)a=re.BYTE;else if(t.array.constructor===Uint8Array)a=re.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+t.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=t.count),s===0)return null;let c=qx(t,n,s),l;e!==void 0&&(l=t===e.index?re.ELEMENT_ARRAY_BUFFER:re.ARRAY_BUFFER);let h=this.processBufferView(t,a,n,s,l),d={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:s,max:c.max,min:c.min,type:o[t.itemSize]};return t.normalized===!0&&(d.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(d)-1}processImage(t,e,n,s="image/png"){if(t!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(t)||o.images.set(t,{});let h=o.images.get(t),d=s+":flipY/"+n.toString();if(h[d]!==void 0)return h[d];a.images||(a.images=[]);let u={mimeType:s},f=Yl();f.width=Math.min(t.width,c.maxTextureSize),f.height=Math.min(t.height,c.maxTextureSize);let m=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,f.height),m.scale(1,-1)),t.data!==void 0){e!==on&&console.error("GLTFExporter: Only RGBAFormat is supported.",e),(t.width>c.maxTextureSize||t.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",t);let g=new Uint8ClampedArray(t.height*t.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=t.data[p+0],g[p+1]=t.data[p+1],g[p+2]=t.data[p+2],g[p+3]=t.data[p+3];m.putImageData(new ImageData(g,t.width,t.height),0,0)}else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas)m.drawImage(t,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(Yx(f,s).then(g=>r.processBufferViewImage(g)).then(g=>{u.bufferView=g})):u.uri=Es.getDataURL(f,s);let y=a.images.push(u)-1;return h[d]=y,y}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(t){let e=this.json;e.samplers||(e.samplers=[]);let n={magFilter:mn[t.magFilter],minFilter:mn[t.minFilter],wrapS:mn[t.wrapS],wrapT:mn[t.wrapT]};return e.samplers.push(n)-1}async processTextureAsync(t){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(t))return s.textures.get(t);r.textures||(r.textures=[]),t instanceof bi&&(t=await this.decompressTextureAsync(t,n.maxTextureSize));let o=t.userData.mimeType,a=this.processImage(t.image,t.format,t.flipY,o),c={sampler:this.processSampler(t)};o==="image/webp"?(c.extensions=c.extensions||{},c.extensions.EXT_texture_webp={source:a},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):c.source=a,t.name&&(c.name=t.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(t,c)});let l=r.textures.push(c)-1;return s.textures.set(t,l),l}async processMaterialAsync(t,e){let n=this.cache,s=this.json,r=e!==void 0&&e.hasAttribute("tangent"),o=t.normalMap?t.uuid+":"+r:t.uuid;if(n.materials.has(o))return n.materials.get(o);if(t.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);let a={pbrMetallicRoughness:{}};t.isMeshStandardMaterial!==!0&&t.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let c=t.color.toArray().concat([t.opacity]);if(ri(c,[1,1,1,1])||(a.pbrMetallicRoughness.baseColorFactor=c),t.isMeshStandardMaterial?(a.pbrMetallicRoughness.metallicFactor=t.metalness,a.pbrMetallicRoughness.roughnessFactor=t.roughness):(a.pbrMetallicRoughness.metallicFactor=0,a.pbrMetallicRoughness.roughnessFactor=1),t.metalnessMap||t.roughnessMap){let h=await this.buildMetalRoughTextureAsync(t.metalnessMap,t.roughnessMap),d={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(d,h),a.pbrMetallicRoughness.metallicRoughnessTexture=d}if(t.map){let h={index:await this.processTextureAsync(t.map),texCoord:t.map.channel};this.applyTextureTransform(h,t.map),a.pbrMetallicRoughness.baseColorTexture=h}if(t.emissive){let h=t.emissive;if(Math.max(h.r,h.g,h.b)>0&&(a.emissiveFactor=t.emissive.toArray()),t.emissiveMap){let u={index:await this.processTextureAsync(t.emissiveMap),texCoord:t.emissiveMap.channel};this.applyTextureTransform(u,t.emissiveMap),a.emissiveTexture=u}}if(t.normalMap){let h=t.normalScale,d=h.x<0,u=r?h.y<0:h.y>0,f=t.normalMap;if(d||u){n.normalMaps.has(t.normalMap)===!1&&n.normalMaps.set(t.normalMap,{});let y=n.normalMaps.get(t.normalMap),g=`${d}:${u}`;y[g]===void 0&&(y[g]=await this.buildNormalMapTextureAsync(t.normalMap,d,u)),f=y[g]}let m={index:await this.processTextureAsync(f),texCoord:t.normalMap.channel};Math.abs(h.x)!==1&&(m.scale=Math.abs(h.x)),this.applyTextureTransform(m,t.normalMap),a.normalTexture=m}if(t.aoMap){let h={index:await this.processTextureAsync(t.aoMap),texCoord:t.aoMap.channel};t.aoMapIntensity!==1&&(h.strength=t.aoMapIntensity),this.applyTextureTransform(h,t.aoMap),a.occlusionTexture=h}t.transparent?a.alphaMode="BLEND":t.alphaTest>0&&(a.alphaMode="MASK",a.alphaCutoff=t.alphaTest),t.side===Ie&&(a.doubleSided=!0),t.name!==""&&(a.name=t.name),this.serializeUserData(t,a),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(t,a)});let l=s.materials.push(a)-1;return n.materials.set(o,l),l}async processMeshAsync(t){let e=this.cache,n=this.json,s=[t.geometry.uuid];if(Array.isArray(t.material))for(let _=0,M=t.material.length;_<M;_++)s.push(t.material[_].uuid);else s.push(t.material.uuid);let r=s.join(":");if(e.meshes.has(r))return e.meshes.get(r);let o=t.geometry,a;t.isLineSegments?a=re.LINES:t.isLineLoop?a=re.LINE_LOOP:t.isLine?a=re.LINE_STRIP:t.isPoints?a=re.POINTS:a=t.material.wireframe?re.LINES:re.TRIANGLES;let c={},l={},h=[],d=[],u={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let m=null;for(let _ in o.attributes){if(_.slice(0,5)==="morph")continue;let M=o.attributes[_];if(_=u[_]||_.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)&&!_.startsWith("_")&&(_="_"+_),e.attributes.has(this.getUID(M))){l[_]=e.attributes.get(this.getUID(M));continue}m=null;let R=M.array;_==="JOINTS_0"&&!(R instanceof Uint16Array)&&!(R instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=Ni.Utils.toTypedBufferAttribute(M,Uint16Array)):(R instanceof Uint32Array||R instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),m=Ni.Utils.toTypedBufferAttribute(M,Float32Array));let x=this.processAccessor(m||M,o);x!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,M),l[_]=x,e.attributes.set(this.getUID(M),x))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(l).length===0)return null;if(t.morphTargetInfluences!==void 0&&t.morphTargetInfluences.length>0){let _=[],M=[],S={};if(t.morphTargetDictionary!==void 0)for(let R in t.morphTargetDictionary)S[t.morphTargetDictionary[R]]=R;for(let R=0;R<t.morphTargetInfluences.length;++R){let x={},C=!1;for(let I in o.morphAttributes){if(I!=="position"&&I!=="normal"){C||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),C=!0);continue}let N=o.morphAttributes[I][R],k=I.toUpperCase(),z=o.attributes[I];if(e.attributes.has(this.getUID(N,!0))){x[k]=e.attributes.get(this.getUID(N,!0));continue}let O=N.clone();if(!o.morphTargetsRelative)for(let H=0,$=N.count;H<$;H++)for(let q=0;q<N.itemSize;q++)q===0&&O.setX(H,N.getX(H)-z.getX(H)),q===1&&O.setY(H,N.getY(H)-z.getY(H)),q===2&&O.setZ(H,N.getZ(H)-z.getZ(H)),q===3&&O.setW(H,N.getW(H)-z.getW(H));x[k]=this.processAccessor(O,o),e.attributes.set(this.getUID(z,!0),x[k])}d.push(x),_.push(t.morphTargetInfluences[R]),t.morphTargetDictionary!==void 0&&M.push(S[R])}c.weights=_,M.length>0&&(c.extras={},c.extras.targetNames=M)}let y=Array.isArray(t.material);if(y&&o.groups.length===0)return null;let g=!1;if(y&&o.index===null){let _=[];for(let M=0,S=o.attributes.position.count;M<S;M++)_[M]=M;o.setIndex(_),g=!0}let p=y?t.material:[t.material],b=y?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,M=b.length;_<M;_++){let S={mode:a,attributes:l};if(this.serializeUserData(o,S),d.length>0&&(S.targets=d),o.index!==null){let x=this.getUID(o.index);(b[_].start!==void 0||b[_].count!==void 0)&&(x+=":"+b[_].start+":"+b[_].count),e.attributes.has(x)?S.indices=e.attributes.get(x):(S.indices=this.processAccessor(o.index,o,b[_].start,b[_].count),e.attributes.set(x,S.indices)),S.indices===null&&delete S.indices}let R=await this.processMaterialAsync(p[b[_].materialIndex],o);R!==null&&(S.material=R),h.push(S)}g===!0&&o.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(t,c)});let w=n.meshes.push(c)-1;return e.meshes.set(r,w),w}detectMeshQuantization(t,e){if(this.extensionsUsed[Xl])return;let n;switch(e.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}e.normalized&&(n+=" normalized");let s=t.split("_",1)[0];bd[s]&&bd[s].includes(n)&&(this.extensionsUsed[Xl]=!0,this.extensionsRequired[Xl]=!0)}processCamera(t){let e=this.json;e.cameras||(e.cameras=[]);let n=t.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:t.right*2,ymag:t.top*2,zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near}:s.perspective={aspectRatio:t.aspect,yfov:ii.degToRad(t.fov),zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near},t.name!==""&&(s.name=t.type),e.cameras.push(s)-1}processAnimation(t,e){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),t=Ni.Utils.mergeMorphTargetTracks(t.clone(),e);let r=t.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let h=r[l],d=ge.parseTrackName(h.name),u=ge.findNode(e,d.nodeName),f=Ed[d.propertyName];if(d.objectName==="bones"&&(u.isSkinnedMesh===!0?u=u.skeleton.getBoneByName(d.objectIndex):u=void 0),!u||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,y=h.values.length/h.times.length;f===Ed.morphTargetInfluences&&(y/=u.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",y/=3):h.getInterpolation()===Gi?g="STEP":g="LINEAR",a.push({input:this.processAccessor(new Ce(h.times,m)),output:this.processAccessor(new Ce(h.values,y)),interpolation:g}),o.push({sampler:a.length-1,target:{node:s.get(u),path:f}})}let c={name:t.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(t,c),n.animations.push(c),n.animations.length-1}processSkin(t){let e=this.json,n=this.nodeMap,s=e.nodes[n.get(t)],r=t.skeleton;if(r===void 0)return null;let o=t.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new he;for(let d=0;d<r.bones.length;++d)a.push(n.get(r.bones[d])),l.copy(r.boneInverses[d]),l.multiply(t.bindMatrix).toArray(c,d*16);return e.skins===void 0&&(e.skins=[]),e.skins.push({inverseBindMatrices:this.processAccessor(new Ce(c,16)),joints:a,skeleton:n.get(o)}),s.skin=e.skins.length-1}async processNodeAsync(t){let e=this.json,n=this.options,s=this.nodeMap;if(e.nodes||(e.nodes=[]),t.pivot!==null)return await this._processNodeWithPivotAsync(t);let r={};if(n.trs){let a=t.quaternion.toArray(),c=t.position.toArray(),l=t.scale.toArray();ri(a,[0,0,0,1])||(r.rotation=a),ri(c,[0,0,0])||(r.translation=c),ri(l,[1,1,1])||(r.scale=l)}else t.matrixAutoUpdate&&t.updateMatrix(),Xx(t.matrix)===!1&&(r.matrix=t.matrix.elements);if(t.name!==""&&(r.name=String(t.name)),this.serializeUserData(t,r),t.isMesh||t.isLine||t.isPoints){let a=await this.processMeshAsync(t);a!==null&&(r.mesh=a)}else t.isCamera&&(r.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);let o=e.nodes.push(r)-1;if(s.set(t,o),t.children.length>0){let a=[];for(let c=0,l=t.children.length;c<l;c++){let h=t.children[c];if(h.visible||n.onlyVisible===!1){let d=await this.processNodeAsync(h);d!==null&&a.push(d)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(t,r)}),o}async _processNodeWithPivotAsync(t){let e=this.json,n=this.options,s=this.nodeMap,r=t.pivot,o={},a=t.quaternion.toArray(),c=[t.position.x+r.x,t.position.y+r.y,t.position.z+r.z],l=t.scale.toArray();ri(a,[0,0,0,1])||(o.rotation=a),ri(c,[0,0,0])||(o.translation=c),ri(l,[1,1,1])||(o.scale=l),o.extras={pivot:r.toArray()},t.name!==""&&(o.name=String(t.name)),this.serializeUserData(t,o);let h=e.nodes.push(o)-1;s.set(t,h);let d={},u=[-r.x,-r.y,-r.z];if(ri(u,[0,0,0])||(d.translation=u),t.isMesh||t.isLine||t.isPoints){let y=await this.processMeshAsync(t);y!==null&&(d.mesh=y)}else t.isCamera&&(d.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);let m=[e.nodes.push(d)-1];if(t.children.length>0){let y=[];for(let g=0,p=t.children.length;g<p;g++){let b=t.children[g];if(b.visible||n.onlyVisible===!1){let w=await this.processNodeAsync(b);w!==null&&y.push(w)}}y.length>0&&(d.children=y)}return o.children=m,await this._invokeAllAsync(function(y){y.writeNode&&y.writeNode(t,o)}),h}async processSceneAsync(t){let e=this.json,n=this.options;e.scenes||(e.scenes=[],e.scene=0);let s={};t.name!==""&&(s.name=t.name),e.scenes.push(s);let r=[];for(let o=0,a=t.children.length;o<a;o++){let c=t.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(t,s)}async processObjectsAsync(t){let e=new Mi;e.name="AuxScene";for(let n=0;n<t.length;n++)e.children.push(t[n]);await this.processSceneAsync(e)}async processInputAsync(t){let e=this.options;t=t instanceof Array?t:[t],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(t)});let n=[];for(let s=0;s<t.length;s++)t[s]instanceof Mi?await this.processSceneAsync(t[s]):n.push(t[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);if(t.length===1)for(let s=0;s<e.animations.length;++s)this.processAnimation(e.animations[s],t[0]);else for(let s=0;s<t.length;s++){let r=e.animations[s]||[];for(let o=0;o<r.length;++o)this.processAnimation(r[o],t[s])}await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(t)})}async _invokeAllAsync(t){for(let e=0,n=this.plugins.length;e<n;e++)await t(this.plugins[e])}},Jl=class{constructor(t){this.writer=t,this.name="KHR_lights_punctual"}writeNode(t,e){if(!t.isLight)return;if(!t.isDirectionalLight&&!t.isPointLight&&!t.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",t);return}let n=this.writer,s=n.json,r=n.extensionsUsed,o={};t.name&&(o.name=t.name),o.color=t.color.toArray(),o.intensity=t.intensity,t.isDirectionalLight?o.type="directional":t.isPointLight?(o.type="point",t.distance>0&&(o.range=t.distance)):t.isSpotLight&&(o.type="spot",t.distance>0&&(o.range=t.distance),o.spot={},o.spot.innerConeAngle=(1-t.penumbra)*t.angle,o.spot.outerConeAngle=t.angle),t.decay!==void 0&&t.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),t.target&&(t.target.parent!==t||t.target.position.x!==0||t.target.position.y!==0||t.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let a=s.extensions[this.name].lights;a.push(o),e.extensions=e.extensions||{},e.extensions[this.name]={light:a.length-1}}},Kl=class{constructor(t){this.writer=t,this.name="KHR_materials_unlit"}async writeMaterialAsync(t,e){if(!t.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;e.extensions=e.extensions||{},e.extensions[this.name]={},s[this.name]=!0,e.pbrMetallicRoughness.metallicFactor=0,e.pbrMetallicRoughness.roughnessFactor=.9}},$l=class{constructor(t){this.writer=t,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=t.clearcoat,t.clearcoatMap){let o={index:await n.processTextureAsync(t.clearcoatMap),texCoord:t.clearcoatMap.channel};n.applyTextureTransform(o,t.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=t.clearcoatRoughness,t.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(t.clearcoatRoughnessMap),texCoord:t.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,t.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(t.clearcoatNormalMap){let o={index:await n.processTextureAsync(t.clearcoatNormalMap),texCoord:t.clearcoatNormalMap.channel};t.clearcoatNormalScale.x!==1&&(o.scale=t.clearcoatNormalScale.x),n.applyTextureTransform(o,t.clearcoatNormalMap),r.clearcoatNormalTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},jl=class{constructor(t){this.writer=t,this.name="KHR_materials_dispersion"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=t.dispersion,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Ql=class{constructor(t){this.writer=t,this.name="KHR_materials_iridescence"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=t.iridescence,t.iridescenceMap){let o={index:await n.processTextureAsync(t.iridescenceMap),texCoord:t.iridescenceMap.channel};n.applyTextureTransform(o,t.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=t.iridescenceIOR,r.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1],t.iridescenceThicknessMap){let o={index:await n.processTextureAsync(t.iridescenceThicknessMap),texCoord:t.iridescenceThicknessMap.channel};n.applyTextureTransform(o,t.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},th=class{constructor(t){this.writer=t,this.name="KHR_materials_transmission"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=t.transmission,t.transmissionMap){let o={index:await n.processTextureAsync(t.transmissionMap),texCoord:t.transmissionMap.channel};n.applyTextureTransform(o,t.transmissionMap),r.transmissionTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},eh=class{constructor(t){this.writer=t,this.name="KHR_materials_volume"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=t.thickness,t.thicknessMap){let o={index:await n.processTextureAsync(t.thicknessMap),texCoord:t.thicknessMap.channel};n.applyTextureTransform(o,t.thicknessMap),r.thicknessTexture=o}t.attenuationDistance!==1/0&&(r.attenuationDistance=t.attenuationDistance),r.attenuationColor=t.attenuationColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},nh=class{constructor(t){this.writer=t,this.name="KHR_materials_ior"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=t.ior,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},ih=class{constructor(t){this.writer=t,this.name="KHR_materials_specular"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.specularIntensity===1&&t.specularColor.equals(zx)&&!t.specularIntensityMap&&!t.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.specularIntensityMap){let o={index:await n.processTextureAsync(t.specularIntensityMap),texCoord:t.specularIntensityMap.channel};n.applyTextureTransform(o,t.specularIntensityMap),r.specularTexture=o}if(t.specularColorMap){let o={index:await n.processTextureAsync(t.specularColorMap),texCoord:t.specularColorMap.channel};n.applyTextureTransform(o,t.specularColorMap),r.specularColorTexture=o}r.specularFactor=t.specularIntensity,r.specularColorFactor=t.specularColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},sh=class{constructor(t){this.writer=t,this.name="KHR_materials_sheen"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.sheenRoughnessMap){let o={index:await n.processTextureAsync(t.sheenRoughnessMap),texCoord:t.sheenRoughnessMap.channel};n.applyTextureTransform(o,t.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(t.sheenColorMap){let o={index:await n.processTextureAsync(t.sheenColorMap),texCoord:t.sheenColorMap.channel};n.applyTextureTransform(o,t.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=t.sheenRoughness,r.sheenColorFactor=t.sheenColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},rh=class{constructor(t){this.writer=t,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.anisotropyMap){let o={index:await n.processTextureAsync(t.anisotropyMap)};n.applyTextureTransform(o,t.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=t.anisotropy,r.anisotropyRotation=t.anisotropyRotation,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},oh=class{constructor(t){this.writer=t,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=t.emissiveIntensity,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},ah=class{constructor(t){this.writer=t,this.name="EXT_materials_bump"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.bumpScale===1&&!t.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.bumpMap){let o={index:await n.processTextureAsync(t.bumpMap),texCoord:t.bumpMap.channel};n.applyTextureTransform(o,t.bumpMap),r.bumpTexture=o}r.bumpFactor=t.bumpScale,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},ch=class{constructor(t){this.writer=t,this.name="EXT_mesh_gpu_instancing"}writeNode(t,e){if(!t.isInstancedMesh)return;let n=this.writer,s=t,r=new Float32Array(s.count*3),o=new Float32Array(s.count*4),a=new Float32Array(s.count*3),c=new he,l=new A,h=new je,d=new A;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,h,d),l.toArray(r,f*3),h.toArray(o,f*4),d.toArray(a,f*3);let u={TRANSLATION:n.processAccessor(new Ce(r,3)),ROTATION:n.processAccessor(new Ce(o,4)),SCALE:n.processAccessor(new Ce(a,3))};s.instanceColor&&(u._COLOR_0=n.processAccessor(s.instanceColor)),e.extensions=e.extensions||{},e.extensions[this.name]={attributes:u},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};Ni.Utils={insertKeyframe:function(i,t){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n)),a;if(i.times.length===0){s[0]=t;for(let c=0;c<n;c++)r[c]=0;a=0}else if(t<i.times[0]){if(Math.abs(i.times[0]-t)<.001)return 0;s[0]=t,s.set(i.times,1),r.set(o.evaluate(t),0),r.set(i.values,n),a=0}else if(t>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-t)<.001)return i.times.length-1;s[s.length-1]=t,s.set(i.times,0),r.set(i.values,0),r.set(o.evaluate(t),i.values.length),a=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-t)<.001)return c;if(i.times[c]<t&&i.times[c+1]>t){s.set(i.times.slice(0,c+1),0),s[c+1]=t,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(o.evaluate(t),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=s,i.values=r,a},mergeMorphTargetTracks:function(i,t){let e=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let o=s[r],a=ge.parseTrackName(o.name),c=ge.findNode(t,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){e.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(vs)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let d;if(n[c.uuid]===void 0){d=o.clone();let f=new d.ValueBufferType(l*d.times.length);for(let m=0;m<d.times.length;m++)f[m*l+h]=d.values[m];d.name=(a.nodeName||"")+".morphTargetInfluences",d.values=f,n[c.uuid]=d,e.push(d);continue}let u=o.createInterpolant(new o.ValueBufferType(1));d=n[c.uuid];for(let f=0;f<d.times.length;f++)d.values[f*l+h]=u.evaluate(d.times[f]);for(let f=0;f<o.times.length;f++){let m=this.insertKeyframe(d,o.times[f]);d.values[m*l+h]=o.values[f]}}return i.tracks=e,i},toTypedBufferAttribute:function(i,t){let e=new Ce(new t(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return e.array.set(i.array),e;for(let n=0,s=i.count;n<s;n++)for(let r=0;r<i.itemSize;r++)e.setComponent(n,r,i.getComponent(n,r));return e}};function Cd(i){let t=new Zt;t.name="Giardino villa piscina e panorama",t.userData={photographicReconstruction:!0,surveyVerified:!1};let e=new Map,n=F=>(e.has(F)||e.set(F,new le({color:F,roughness:.86})),e.get(F)),s="#ede9dc",r="#b66f4d",o="#888c7e",a="#496039",c="#343a35";function l(F,L,T,D=[0,0,0],V=t){let B=new ae(F,typeof L=="string"?n(L):L);return B.name=T,B.position.set(...D),B.castShadow=!0,B.receiveShadow=!0,V.add(B),B}function h(F,L,T,D,V,B,Y,tt=s,rt=t){return l(new Ye(V,B,Y),tt,F,[L,T,D],rt)}function d(F,L,T,D,V=c,B=t){L=new A(...L),T=new A(...T);let Y=T.clone().sub(L),tt=l(new Ae(D,D,Y.length(),6),V,F,L.clone().add(T).multiplyScalar(.5).toArray(),B);return tt.quaternion.setFromUnitVectors(new A(0,1,0),Y.normalize()),tt}function u(F,L,T,D,V=t){let B=new Cn;L.forEach(([tt,rt],ft)=>ft?B.lineTo(tt,-rt):B.moveTo(tt,-rt)),B.closePath();let Y=new Er(B);return Y.rotateX(-Math.PI/2),l(Y,D,F,[0,T,0],V)}let f=493;function m(){return f=f*1664525+1013904223>>>0,f/4294967296}function y(F,L,T=1,D=0,V=!1,B=t){for(let Y=0;Y<7;Y++){let tt=Y*2.399,rt=l(new Sr(T*(.46+m()*.18),1),V&&Y%3===0?"#a64d88":["#365230","#476737","#617b43"][Y%3],"Arbusto giardino",[F+Math.cos(tt)*T*.42,D+T*.55+m()*.25,L+Math.sin(tt)*T*.42],B);rt.scale.y=.8}}function g(F,L,T=5,D=2,V=0,B=t){d("Tronco giardino",[F,V,L],[F,V+T*.7,L],.13,"#786855",B);for(let Y=0;Y<7;Y++){let tt=Y*2.399,rt=F+Math.cos(tt)*D*.55,ft=L+Math.sin(tt)*D*.55;d("Ramo giardino",[F,V+T*.45,L],[rt,V+T*.8,ft],.045,"#786855",B),y(rt,ft,D*.7,V+T*.65,!1,B)}}function p(F,L,T=.8,D=t){let V=Math.hypot(L[0]-F[0],L[1]-F[1]),B=Math.ceil(V/.85);for(let Y=0;Y<=B;Y++)y(F[0]+(L[0]-F[0])*Y/B,F[1]+(L[1]-F[1])*Y/B,.65,T,!1,D)}function b(F,L,T=4,D=0,V=t){d("Tronco palma",[F,D,L],[F+.15,D+T,L],.13,"#816c4e",V);for(let B=0;B<13;B++){let Y=B*2.399,tt=[F+.15,D+T,L];for(let rt=1;rt<7;rt++){let ft=rt/6,U=[F+.15+Math.cos(Y)*2.6*ft,D+T+Math.sin(ft*Math.PI)*.75-.65*ft,L+Math.sin(Y)*2.6*ft];d("Nervatura palma",tt,U,.014,a,V);for(let Xt of[-1,1]){let qt=.55*Math.sin(ft*Math.PI),P=[...tt,...U,U[0]+Math.cos(Y+Math.PI/2)*qt*Xt,U[1]-.25,U[2]+Math.sin(Y+Math.PI/2)*qt*Xt],v=new xe;v.setAttribute("position",new ne(P,3)),v.computeVertexNormals();let X=l(v,new le({color:B%2?"#52723a":"#698a45",side:Ie}),"Palma fronda",[0,0,0],V)}tt=U}}}function w(F,L,T=0,D=!0,V=t){l(new Ae(.27,.18,.43,10),r,"Vaso terracotta",[F,T+.215,L],V),y(F,L,.4,T+.35,D,V)}function _(F,L,T,D=t){let V=Math.hypot(L[0]-F[0],L[1]-F[1]),B=Math.ceil(V/.4);for(let Y=0;Y<=B;Y++){let tt=F[0]+(L[0]-F[0])*Y/B,rt=F[1]+(L[1]-F[1])*Y/B;d("Ringhiera giardino",[tt,T,rt],[tt,T+.88,rt],.018,c,D)}d("Corrimano giardino",[F[0],T+.88,F[1]],[L[0],T+.88,L[1]],.024,c,D)}u("Prato esteso casa",[[-35,18],[-12,19],[22,24],[25,67],[-35,70]],.78,a),h("Muro contenimento villa",-5,.3,68,58,1.1,.3),p([-34,21],[-34,67]),p([-34,67],[23,67]);for(let[F,L,T,D]of[[-30,30,5,2.4],[-26,42,5.8,2.8],[-32,57,6,2.5],[20,60,4.5,2],[21,31,5,2.1]])g(F,L,T,D,.8);for(let F=0;F<40;F++){let L=F/39,T=-21+Math.sin(L*3)*2,D=22+L*42;for(let V of[-.35,.35]){let B=l(new Ae(.25,.25,.055,7),o,"Passi in pietra nel prato",[T+V,.82,D]);B.rotation.y=F*.7}}p([-18,26],[-18,38]),p([-18,42],[-18,63]);let M=new Zt;M.name="Casa e piscina",M.position.copy(i(1450,610,0)),t.add(M);let S=1.7;h("Solarium lato casa",0,S-.13,5,21,.26,3.2,r,M),h("Solarium lato mare",0,S-.13,-5,21,.26,3.2,r,M),h("Solarium sinistro",-8.8,S-.13,0,3.4,.26,6.8,r,M),h("Solarium destro",8.8,S-.13,0,3.4,.26,6.8,r,M),h("Piscina fondo azzurro",0,S-1.25,0,14,.1,6,"#59bdce",M);for(let F of[-3.08,3.08])h("Piscina parete",0,S-.65,F,14.4,1.3,.16,"#a8dadb",M),h("Bordo piscina cotto",0,S+.025,F,14.5,.12,.32,r,M);for(let F of[-7.1,7.1])h("Piscina parete",F,S-.65,0,.2,1.3,6.1,"#a8dadb",M),h("Bordo piscina cotto",F,S+.025,0,.32,.12,6.45,r,M);let R=new Ar({color:"#28b8d3",roughness:.16,metalness:.12,transparent:!0,opacity:.78,clearcoat:1}),x=new Yi(14,6,45,20);x.rotateX(-Math.PI/2);let C=x.attributes.position;for(let F=0;F<C.count;F++)C.setY(F,.012*Math.sin(C.getX(F)*8+C.getZ(F)*11));x.computeVertexNormals(),l(x,R,"Piscina acqua",[0,S-.12,0],M);for(let F=0;F<65;F++){let L=-6.7+m()*13.4,T=-2.8+m()*5.6,D=h("Riflesso acqua piscina",L,S-.105,T,.1+m()*.35,.004,.008,"#72dae0",M);D.rotation.y=m(),D.castShadow=!1}h("Trampolino bianco",-7,S+.4,0,2.6,.12,.55,s,M),h("Base trampolino",-8,S+.18,0,.5,.36,.48,s,M);for(let F of[5.45,6])d("Scaletta piscina",[F,S-1,2.8],[F,S+.65,2.8],.035,"#b9ccca",M),d("Scaletta piscina maniglia",[F,S+.65,2.8],[F,S+.65,3.45],.035,"#b9ccca",M);for(let F=0;F<4;F++)d("Scaletta piscina gradino",[5.45,S-.95+F*.26,2.8],[6,S-.95+F*.26,2.8],.036,"#b9ccca",M);for(let F=-10;F<=10;F+=.65)for(let L of[-5,5])h("Fuga cotto",F,S+.005,L,.012,.006,2.95,"#c18a69",M);function I(F,L,T){let D=new Zt;D.position.set(F,S,L),D.rotation.y=T,M.add(D),h("Lettino tela bianca",0,.34,0,.7,.09,1.9,s,D);let V=h("Lettino schienale",0,.58,-.62,.7,.08,.65,s,D);V.rotation.x=.5;for(let B of[-.32,.32])d("Lettino telaio",[B,.05,-.8],[B,.34,.8],.025,c,D),d("Lettino telaio",[B,.34,-.8],[B,.05,.8],.025,c,D)}for(let[F,L,T]of[[-4,-4.7,.25],[0,-4.7,0],[4,-4.7,-.2],[8.9,-1,Math.PI/2],[8.9,1.7,Math.PI/2],[-8.9,2,-Math.PI/2]])I(F,L,T);for(let[F,L]of[[-9.5,-5.5],[9.6,-5.5],[-9.5,5.5]])b(F,L,3.1,S,M);for(let[F,L]of[[-6,-5.4],[2,-5.5],[6,5.7],[-6,5.7],[-9,3.8],[9,3.8]])w(F,L,S,!0,M);_([-10.4,-6.5],[10.4,-6.5],S,M),p([-10.7,-6.8],[10.7,-6.8],S-.2,M),h("Casa volume bianco",0,S+2,11.8,19,4,8.6,s,M),h("Veranda pavimento",0,S+.37,7.1,18,.24,3.1,r,M),h("Veranda soffitto",0,S+3.4,7.1,19,.2,3.4,s,M);for(let F of[-8.7,-3.1,3.1,8.7])h("Veranda pilastro",F,S+1.95,5.8,.25,2.9,.25,s,M);for(let F=0;F<3;F++)h("Scala veranda",0,S+.06+F*.12,5.1+F*.25,4,.12+F*.12,.3,r,M);function N(F,L,T=1.8){h("Infisso legno",F,S+1.8,L,T+.14,1.9,.12,"#6b4f35",M),h("Vetro finestra",F,S+1.8,L-.075,T,1.75,.035,"#283e3c",M);for(let D=-T/2;D<=T/2;D+=.2)d("Grata finestra",[F+D,S+.9,L-.12],[F+D,S+2.7,L-.12],.017,c,M);for(let D of[1.1,2.4])d("Grata traversa",[F-T/2,S+D,L-.12],[F+T/2,S+D,L-.12],.019,c,M)}for(let F of[-6.1,-1.2,4.2,7.2])N(F,7.46,F===-1.2?2.4:1.8);for(let F of[10,13.2]){h("Finestra laterale",9.56,S+2,F,.08,1.8,1.5,"#293e39",M);for(let L=0;L<8;L++)d("Inferriata laterale",[9.62,S+1.1,F-.7+L*.2],[9.62,S+2.9,F-.7+L*.2],.017,c,M)}h("Terrazzo tetto calpestio",0,S+4.07,11.7,13,.14,7.6,r,M);for(let F of[8,15.4])h("Parapetto terrazzo",0,S+4.48,F,13,.8,.2,s,M),h("Cimasa cotto",0,S+4.9,F,13.2,.055,.28,r,M);for(let F of[-6.5,6.5])h("Parapetto terrazzo",F,S+4.48,11.7,.2,.8,7.6,s,M);function k(F,L,T,D,V=0){let B=new Zt;B.position.set(F,S+4.02,L),B.rotation.z=V,M.add(B),h("Tetto falda cotto",0,0,0,T,.15,D,r,B);for(let Y=-T/2;Y<=T/2;Y+=.2)d("Coppo terracotta",[Y,.1,-D/2],[Y,.1,D/2],.055,Y%1>.4?"#a66447":"#c18a61",B)}k(-8.15,11.65,3.8,9.5,.16),k(8.15,11.65,3.8,9.5,-.16),k(0,6.5,19,1.1),h("Camino",-4.6,S+5.25,14.2,.5,2.2,.55,s,M);for(let F=0;F<3;F++)h("Camino cappello",-4.6,S+6.3+F*.1,14.2,.64,.06,.68,r,M);for(let[F,L]of[[-5.6,8.8],[5.5,14.6]])w(F,L,S+4.15,!1,M);for(let F of[-6,5]){h("Tavolo veranda legno",F,S+1.1,6.8,1.3,.12,.8,"#79583d",M);for(let L of[-.55,.55])for(let T of[-.3,.3])h("Gamba tavolo veranda",F+L,S+.78,6.8+T,.06,.55,.06,"#79583d",M);for(let L of[6,7.7])h("Panca veranda",F,S+.84,L,1.9,.12,.55,"#79583d",M),h("Panca veranda schienale",F,S+1.2,L+.2,1.9,.7,.08,"#79583d",M)}for(let F=0;F<7;F++){let L=.8+(F+1)*.13;h("Scala giardino alzata bianca",-13,L-.065,-1.8+F*.36,4.5,.13,.36,s,M),h("Scala giardino pedata cotto",-13,L+.01,-1.8+F*.36,4.55,.04,.36,r,M);for(let T of[-1,1])w(-13+T*2,-1.8+F*.36,L,!1,M)}for(let F of[-1,1])d("Corrimano scala giardino",[-13+F*2.35,1.6,-2],[-13+F*2.35,2.51,.7],.025,c,M);u("Patio giardino cotto",[[-17,-7],[-10.5,-7],[-10.5,-2],[-17,-2]],.81,r,M),p([-17,-7],[-17,5],.8,M);for(let[F,L]of[[-15,4],[-12,15],[12,13],[12,4]])y(F,L,1.2,.8,!0,M);let z=[[-5.698,0],[5.698,0],[8.197,3.677],[11.2,12.359],[7.557,20.132],[-1.767,15.689],[-2.625,14.427],[-1.719,13.809],[-2.903,12.068],[-3.809,12.686],[-5.378,10.38]],O=["Casa volume bianco","Terrazzo tetto calpestio","Parapetto terrazzo","Cimasa cotto"];for(let F of[...M.children])(O.includes(F.name)||F.children.some(L=>L.name==="Tetto falda cotto"))&&F.removeFromParent();let H=new he().makeScale(11.3957907/19,1,.8).multiply(new he().makeTranslation(0,0,-5.65));for(let F of M.children)F.applyMatrix4(H);M.position.copy(i(1317.46,753.485)),M.rotation.y=-.333027111,M.userData={footprintSource:"planimetria.pdf, A3 1:200, vector outline",frontWidthMetres:11.3957907,hiddenOutline:"Northern connection under PDF legend reconstructed",poolDimensionsEstimated:!0};let $=z.map(([F,L])=>[F,L===0?1.6:L]),q=new Cn;$.forEach(([F,L],T)=>T?q.lineTo(F,-L):q.moveTo(F,-L)),q.closePath();let at=new ni(q,{depth:3.5,bevelEnabled:!1});at.rotateX(-Math.PI/2),l(at,s,"Casa sagoma da planimetria",[0,S,0],M),u("Tetto terrazza sagoma originale",z,S+3.55,r,M);for(let F=0;F<z.length;F++){let L=z[F],T=z[(F+1)%z.length];d("Parapetto sagoma villa",[L[0],S+3.85,L[1]],[T[0],S+3.85,T[1]],.25,s,M),d("Cimasa sagoma villa",[L[0],S+4.12,L[1]],[T[0],S+4.12,T[1]],.075,r,M);let D=Math.hypot(T[0]-L[0],T[1]-L[1]);for(let V=0;V<D/.19;V++){let B=V*.19/D,Y=L[0]+(T[0]-L[0])*B,tt=L[1]+(T[1]-L[1])*B,rt=new ut(-(T[1]-L[1]),T[0]-L[0]).normalize();d("Coppi bordo sagoma",[Y,S+3.6,tt],[Y+rt.x*.6,S+3.37,tt+rt.y*.6],.048,r,M)}}for(let F=1;F<z.length;F++){let L=z[F],T=z[(F+1)%z.length],D=T[0]-L[0],V=T[1]-L[1],B=Math.hypot(D,V);if(B<2)continue;let Y=[V/B,-D/B];for(let tt=1;tt<=Math.floor(B/2.4);tt++){let rt=tt/(Math.floor(B/2.4)+1),ft=new Zt;ft.position.set(L[0]+D*rt+Y[0]*.03,S+1.9,L[1]+V*rt+Y[1]*.03),ft.rotation.y=-Math.atan2(V,D),M.add(ft),h("Finestra villa telaio",0,0,0,1.14,1.65,.06,"#6b4f35",ft),h("Finestra villa vetro",0,0,-.045,1.03,1.52,.02,"#30423d",ft);for(let U=0;U<6;U++)d("Grata villa",[-.48+U*.192,-.8,-.085],[-.48+U*.192,.8,-.085],.015,c,ft);for(let U of[-.55,.55])d("Traversa grata villa",[-.54,U,-.085],[.54,U,-.085],.017,c,ft)}}for(let F=1;F<z.length;F++){let L=z[F],T=z[(F+1)%z.length],D=Math.hypot(T[0]-L[0],T[1]-L[1]);if(D<3)continue;let V=new ut(-(T[1]-L[1]),T[0]-L[0]).normalize();for(let B=0;B<D/.16;B++){let Y=B*.16/D,tt=L[0]+(T[0]-L[0])*Y,rt=L[1]+(T[1]-L[1])*Y;d("Coppi falda villa",[tt,S+3.65,rt],[tt+V.x*1.65,S+4.2,rt+V.y*1.65],.078,B%3?"#b87954":"#a16245",M)}}u("Raccordo prato costa",[[11,18],[15,-29],[22,-35],[35,-35],[40,74],[20,74]],-.09,a);for(let F=0;F<30;F++){let L=23+F*1.35;y(18+Math.sin(F*.5),L,.8,.78,F%5===0)}for(let F=0;F<22;F++){let L=26+F*1.65;y(-31+Math.sin(F)*1.7,L,.8,.78,F%4===0)}let j=new xe;j.setAttribute("position",new ne([17,-.2,-27,25,-.2,24,58,-8,45,17,-.2,-27,58,-8,45,62,-8,-48],3)),j.computeVertexNormals(),l(j,"#70794a","Pendio macchia mediterranea");for(let F=0;F<85;F++){let L=25+m()*25,T=-29+m()*64;y(L,T,.4+m()*.65,-.3-(L-25)*.16)}let et=new Zt;et.name="Mare Isola di Dino e costa",t.add(et);let ot=h("Mare",560,-10.2,0,1050,.1,1550,new le({color:"#377b99",roughness:.34,metalness:.28}),et);ot.castShadow=!1;for(let F=0;F<110;F++){let L=65+m()*740,T=-600+m()*1200,D=h("Increspatura mare",L,-10.13,T,.1,.01,2+m()*13,"#6495aa",et);D.castShadow=!1}let _t=new Zt;_t.name="Isola di Dino",_t.position.set(245,-10,-155),_t.rotation.y=-.2,et.add(_t);let xt=[[-16,-47],[-24,-35],[-26,-14],[-24,12],[-16,43],[-6,52],[7,49],[17,35],[22,8],[18,-23],[8,-43]],te=[],Jt=[],jt=new Ht("#aaa68c"),nt=new Ht("#657856");function ct(F,L,T,D){te.push(...F,...L,...T);for(let V=0;V<3;V++)Jt.push(D.r,D.g,D.b)}for(let F=0;F<xt.length;F++){let L=xt[F],T=xt[(F+1)%xt.length],D=7.5+Math.sin(F*1.7)*1.3,V=7.5+Math.sin((F+1)*1.7)*1.3,B=[L[0]*.83,D,L[1]*.9],Y=[T[0]*.83,V,T[1]*.9];ct([L[0],0,L[1]],[T[0],0,T[1]],B,jt),ct([T[0],0,T[1]],Y,B,jt),ct(B,Y,[0,10.5,0],nt)}let mt=new xe;mt.setAttribute("position",new ne(te,3)),mt.setAttribute("color",new ne(Jt,3)),mt.computeVertexNormals(),l(mt,new le({vertexColors:!0,roughness:1,side:Ie}),"Falesia e sommit\xE0 isola",[0,0,0],_t);for(let F=0;F<18;F++){let L=-37+F*4.5;d("Striatura falesia",[-23,-.1,L],[-19,6.8,L+.8],.24,"#959880",_t)}let Ft=[[370,-450],[330,-335],[348,-210],[400,-80],[470,70],[600,240],[880,480]],bt=[];for(let F=1;F<Ft.length;F++){let L=Ft[F-1],T=Ft[F];bt.push(L[0],-10,L[1],T[0],-10,T[1],T[0]+220,40+28*Math.sin(F),T[1],L[0],-10,L[1],T[0]+220,40+28*Math.sin(F),T[1],L[0]+220,40+28*Math.sin(F-1),L[1])}let Vt=new xe;Vt.setAttribute("position",new ne(bt,3)),Vt.computeVertexNormals(),l(Vt,new le({color:"#7f9188",roughness:1,side:Ie}),"Costa e rilievi sullo sfondo",[0,0,0],et);for(let F=0;F<38;F++){let L=-340+F*18,T=360+(L+340)*.35;h("Edifici lontani sulla costa",T,-4,L,2+m()*3,2+m()*3,3,"#cac7b4",et)}return{root:t,villa:M,panorama:et,gardenTarget:i(1370,620,2),panoramaTarget:new A(130,-3,-70)}}function Rd(){let i=new Zt;i.name="Console DJ parallela arco",i.userData={frontClearance:.6,depth:.84};let t={},e=a=>t[a]??=new le({color:a,roughness:.55}),n=(a,c,l,h,d,u,f,m,y)=>{let g=new ae(new Ye(u,f,m),e(y));return g.name=c,g.position.set(l,h,d),a.add(g),g},s=(a,c,l,h,d,u,f,m)=>{let y=new ae(new Ae(u,u,f,32),e(m));return y.name=c,y.position.set(l,h,d),a.add(y),y};n(i,"Banco DJ",0,.525,0,2.7,1.05,.8,"#edece5"),n(i,"Piano DJ",0,1.075,0,2.75,.05,.84,"#202326");let r=1.1;for(let[a,c]of[-.79,-.41,.41,.79].entries()){let l=new Zt;l.name="CDJ-3000X "+(a+1),l.position.set(c,r,0),l.userData={model:"CDJ-3000X",dimensions:[.3446,.4904,.1301]},i.add(l),n(l,"CDJ chassis",0,.035,0,.3446,.07,.4904,"#16191c"),n(l,"CDJ display cornice",-.016,.095,.145,.245,.065,.17,"#252a30"),n(l,"CDJ touchscreen",-.016,.1301,.145,.223,.001,.145,"#132c38");for(let h=0;h<25;h++)n(l,"CDJ waveform",-.12+h*.0087,.131,.16,.005,.001,.012+.033*Math.abs(Math.sin(h*2.1)),h%3?"#53c9da":"#e2b260");s(l,"Jog wheel bordo",-.025,.081,-.065,.098,.018,"#676b70"),s(l,"Jog wheel",-.025,.092,-.065,.09,.012,"#24272b"),s(l,"Jog display",-.025,.099,-.065,.036,.002,"#337088");for(let h=0;h<8;h++)n(l,"Hot cue",-.139+h*.027,.079,.025,.021,.013,.016,h%2?"#619cb4":"#96b78d");n(l,"Pitch guida",.133,.074,-.09,.007,.007,.16,"#565b61"),n(l,"Pitch cursore",.133,.083,-.07,.032,.013,.013,"#c3c5c8"),s(l,"Play",-.136,.079,-.207,.014,.008,"#66b27e"),s(l,"Cue",-.136,.079,-.167,.014,.008,"#bc924e"),s(l,"Browse",.138,.081,.12,.013,.017,"#686d73")}let o=new Zt;o.name="DJM-A9",o.position.set(0,r,-(.4904-.4583)/2),i.add(o),o.userData={model:"DJM-A9",dimensions:[.4074,.4583,.1079]},n(o,"A9 chassis",0,.043,0,.4074,.086,.4583,"#15181b");for(let a=0;a<4;a++){let c=-.105+a*.06;for(let l=0;l<5;l++)s(o,"A9 manopola canale",c,.096,.17-l*.048,.01,.023,"#6f747a");n(o,"A9 guida fader",c,.087,-.126,.005,.002,.1,"#868b90"),n(o,"A9 fader",c,.1,-.12,.025,.015,.014,"#c4c9ce");for(let l=0;l<8;l++)n(o,"A9 meter",c+.016,.088,.12-l*.018,.004,.002,.01,l>5?"#dbaa49":"#5ba069")}n(o,"A9 crossfader guida",-.01,.088,-.197,.17,.004,.005,"#8a8d91"),n(o,"A9 crossfader",-.01,.1,-.197,.013,.014,.027,"#bfc4c8"),n(o,"A9 display FX",.155,.09,.14,.065,.005,.085,"#2e6c85");for(let a=0;a<4;a++)s(o,"A9 FX knob",.155,.096,.05-a*.06,.015,.022,"#737a80");for(let a of[-1.17,1.17])n(i,"Monitor DJ",a,.99,-.05,.28,.36,.28,"#1b2023");return i.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0)}),i}var lh={bounds:[270.9079,414.4896,805.5987,665.1777],paths:[[["M",400.284912109375,418.62957763671875],["C",406.03790283203125,420.4925842285156,411.430908203125,423.3315734863281,416.8839111328125,425.9385681152344],["C",417.0099182128906,425.9985656738281,417.1219177246094,426.0715637207031,417.2419128417969,426.1415710449219],["C",418.0399169921875,426.6005859375,420.08990478515625,427.45758056640625,418.9149169921875,429.06658935546875],["C",405.3258972167969,420.9095764160156,390.71490478515625,416.66656494140625,374.75592041015625,416.7995910644531],["C",363.40692138671875,416.89459228515625,352.80889892578125,417.2955627441406,341.3908996582031,421.17657470703125],["C",341.07891845703125,421.2815856933594,340.76690673828125,421.402587890625,340.4659118652344,421.5345764160156],["C",320.6859130859375,430.1435852050781,307.41693115234375,445.01458740234375,299.10992431640625,464.506591796875],["C",293.8109130859375,476.9385681152344,291.66790771484375,490.09759521484375,291.1639099121094,503.674560546875],["C",290.1799011230469,530.1445922851562,296.28289794921875,554.2296142578125,313.7958984375,574.6195678710938],["C",332.4059143066406,596.28759765625,356.6708984375,602.2595825195312,384.0049133300781,598.8485717773438],["C",393.25091552734375,597.695556640625,402.2119140625,595.3585815429688,410.9399108886719,591.93359375],["C",415.2029113769531,590.2605590820312,416.58990478515625,587.904541015625,416.54791259765625,583.3945922851562],["C",416.326904296875,560.0135498046875,416.51690673828125,534.7815551757812,416.5749206542969,511.3985595703125],["C",416.5799255371094,509.37359619140625,416.263916015625,507.95758056640625,418.00091552734375,507.4925842285156],["C",421.4369201660156,506.5735778808594,425.294921875,506.5845947265625,428.8149108886719,507.6675720214844],["C",429.9609069824219,508.02056884765625,429.73492431640625,509.9195861816406,429.7519226074219,511.1365966796875],["C",430.076904296875,534.3345947265625,429.7069091796875,557.53857421875,429.8099060058594,580.7385864257812],["C",429.82891845703125,585.1135864257812,426.347900390625,586.03955078125,423.6979064941406,587.5855712890625],["C",412.8739013671875,593.8995971679688,401.1899108886719,597.8375854492188,388.7698974609375,599.6295776367188],["C",367.7549133300781,602.66259765625,347.22991943359375,601.2935791015625,327.6559143066406,592.465576171875],["C",303.15789794921875,581.4176025390625,286.8879089355469,562.9486083984375,279.617919921875,537.0655517578125],["C",270.90789794921875,506.06158447265625,274.57891845703125,476.6385803222656,293.721923828125,450.2835693359375],["C",310.48492431640625,427.2065734863281,334.02789306640625,416.3285827636719,362.3249206542969,415.0645751953125],["C",375.17291259765625,414.48956298828125,388.1009216308594,414.6845703125,400.284912109375,418.62957763671875]],[["M",485.9779968261719,532.2437133789062],["C",485.98199462890625,534.4117431640625,485.9020080566406,536.9437255859375,485.9779968261719,539.1196899414062],["C",485.9469909667969,557.564697265625,486.2139892578125,575.2366943359375,485.9779968261719,593.480712890625],["C",485.9329833984375,596.9967041015625,487.97900390625,597.0966796875,490.5899963378906,597.0867309570312],["C",504.1029968261719,597.0357055664062,517.6170043945312,597.0596923828125,531.1300048828125,597.0877075195312],["C",533.0349731445312,597.0726928710938,534.010009765625,597.0496826171875,536.5980224609375,597.0267333984375],["C",534.9639892578125,599.6097412109375,533.5889892578125,599.3737182617188,531.9140014648438,599.376708984375],["C",513.8359985351562,599.4006958007812,495.7559814453125,599.2607421875,477.6789855957031,599.4117431640625],["C",473.6619873046875,599.4457397460938,472.2850036621094,598.2557373046875,472.322998046875,594.1376953125],["C",472.47900390625,577.3417358398438,472.3800048828125,560.543701171875,472.3070068359375,543.7457275390625],["C",472.2959899902344,541.3847045898438,472.2829895019531,539.0247192382812,472.3070068359375,536.6177368164062],["C",472.2799987792969,534.3267211914062,472.30499267578125,531.9647216796875,472.3070068359375,529.6146850585938],["C",472.33599853515625,494.38671875,472.3599853515625,458.5577087402344,472.43499755859375,423.3307189941406],["C",472.4389953613281,421.14971923828125,472.82000732421875,418.2977294921875,474.6130065917969,417.4017028808594],["C",478.0069885253906,416.0287170410156,480.9679870605469,416.001708984375,483.7969970703125,417.44671630859375],["C",485.781982421875,418.33673095703125,485.9389953613281,421.57672119140625,485.94500732421875,423.3307189941406],["L",485.9779968261719,532.2437133789062]],[["M",565.2459716796875,591.750244140625],["C",565.2459716796875,597.2002563476562,567.6799926757812,599.4042358398438,572.5029907226562,599.4042358398438],["C",577.0149536132812,599.2892456054688,579.35595703125,597.2352294921875,579.35595703125,591.9252319335938],["C",579.35595703125,534.9222412109375,579.1319580078125,479.1862487792969,579.35595703125,422.1832275390625],["C",579.3779907226562,416.4532470703125,576.8199462890625,416.146240234375,572.4339599609375,416.19622802734375],["C",568.1739501953125,416.2452392578125,565.3529663085938,416.250244140625,565.4149780273438,422.11822509765625],["L",565.2459716796875,591.750244140625]],[["M",800.7166748046875,597.7426147460938],["C",801.149658203125,598.1016235351562,801.1526489257812,598.671630859375,800.70068359375,599.005615234375],["C",799.7486572265625,599.7056274414062,797.3016967773438,599.6356201171875,795.9956665039062,599.6365966796875],["C",771.3246459960938,599.6586303710938,746.4906616210938,599.5866088867188,721.8197021484375,599.6386108398438],["C",717.7796630859375,599.6476440429688,715.7476806640625,599.6216430664062,718.0116577148438,594.360595703125],["C",728.545654296875,569.8765869140625,738.6326904296875,545.1995849609375,748.8206787109375,520.5665893554688],["C",762.1817016601562,488.2606201171875,775.4526977539062,455.9176025390625,788.8606567382812,423.6316223144531],["C",790.4136962890625,419.89361572265625,789.9536743164062,418.6266174316406,785.57568359375,418.66961669921875],["C",767.8506469726562,418.84161376953125,750.1236572265625,418.72760009765625,732.397705078125,418.6776123046875],["C",730.65869140625,418.672607421875,728.649658203125,418.735595703125,727.0836791992188,418.2606201171875],["C",726.2766723632812,418.015625,726.1806640625,416.8746337890625,726.9256591796875,416.4806213378906],["C",727.5286865234375,416.16259765625,728.1427001953125,416.1876220703125,728.899658203125,416.15960693359375],["C",752.8386840820312,416.089599609375,776.7786865234375,416.296630859375,800.7176513671875,416.15960693359375],["C",805.1856689453125,416.1346130371094,805.5986938476562,417.51361083984375,803.9946899414062,421.2936096191406],["C",791.2406616210938,451.35162353515625,778.1126708984375,481.2646179199219,766.1016845703125,511.6186218261719],["C",755.4006958007812,538.6636352539062,744.0506591796875,565.4326171875,733.0996704101562,592.3685913085938],["C",731.6786499023438,595.8635864257812,732.0056762695312,596.9885864257812,736.1646728515625,596.9515991210938],["C",755.899658203125,596.7745971679688,776.2796630859375,596.8926391601562,796.0156860351562,596.9515991210938],["C",797.5307006835938,596.9556274414062,799.9656982421875,597.11962890625,800.7166748046875,597.7426147460938]],[["M",642.794189453125,418.4912109375],["C",637.3911743164062,418.46722412109375,618.7252197265625,418.5062255859375,607.59619140625,418.4912109375],["C",601.585205078125,418.48321533203125,601.0311889648438,416.8102111816406,601.0311889648438,416.8102111816406],["C",601.5491943359375,416.8102111816406,673.5521850585938,416.814208984375,709.7611694335938,416.8102111816406],["C",709.7611694335938,416.8102111816406,708.127197265625,418.48822021484375,703.2711791992188,418.4912109375],["C",691.6212158203125,418.49920654296875,680.2061767578125,418.44122314453125,668.201171875,418.4912109375],["C",665.9451904296875,418.4851989746094,662.3541870117188,419.8731994628906,662.3641967773438,424.4201965332031],["C",662.501220703125,480.4862060546875,662.51318359375,537.7371826171875,662.4421997070312,593.80419921875],["C",662.440185546875,596.0042114257812,663.6521606445312,598.033203125,660.9801635742188,599.0081787109375],["C",657.5941772460938,600.2432250976562,653.6602172851562,600.1412353515625,650.2072143554688,598.979248046875],["C",647.9481811523438,598.2182006835938,648.816162109375,595.4661865234375,648.814208984375,593.5732421875],["C",648.773193359375,565.0831909179688,648.8101806640625,536.5932006835938,648.80419921875,508.1022033691406],["C",648.7982177734375,480.16021728515625,648.8742065429688,427.84820556640625,648.8372192382812,424.2762145996094],["C",648.8081665039062,421.4532165527344,646.2481689453125,418.5072021484375,642.794189453125,418.4912109375]],[["M",667.9552001953125,642.306640625],["L",667.9552001953125,644.8146362304688],["C",667.9552001953125,646.4916381835938,669.2952270507812,647.8616333007812,670.97119140625,647.901611328125],["C",673.8822021484375,647.9706420898438,676.63818359375,648.0616455078125,679.3311767578125,647.6956176757812],["C",680.772216796875,647.5006103515625,683.0751953125,646.3306274414062,683.0751953125,643.86865234375],["C",683.0751953125,641.1906127929688,681.085205078125,639.9506225585938,679.6192016601562,639.609619140625],["C",677.0972290039062,638.9886474609375,674.13720703125,639.2186279296875,671.1962280273438,639.22265625],["C",669.4312133789062,639.2246704101562,667.9552001953125,640.5416259765625,667.9552001953125,642.306640625],["M",667.8171997070312,658.1796264648438],["C",667.8171997070312,659.8446655273438,669.13818359375,661.2056274414062,670.8021850585938,661.2616577148438],["C",673.9722290039062,661.3666381835938,676.1411743164062,661.483642578125,678.7562255859375,661.254638671875],["C",678.9841918945312,661.234619140625,679.2222290039062,661.1896362304688,679.4412231445312,661.1206665039062],["C",682.7232055664062,660.0816650390625,684.4942016601562,658.1346435546875,684.9942016601562,656.2666625976562],["C",685.7971801757812,653.2626342773438,683.1812133789062,651.6636352539062,680.3621826171875,651.5146484375],["C",677.2421875,651.3486328125,674.1112060546875,651.4036254882812,670.8751831054688,651.4386596679688],["C",669.1832275390625,651.4576416015625,667.8171997070312,652.8336181640625,667.8171997070312,654.525634765625],["L",667.8171997070312,658.1796264648438],["M",684.9641723632812,648.24462890625],["C",684.5991821289062,648.8016357421875,684.730224609375,649.5476684570312,685.26123046875,649.9506225585938],["C",687.9992065429688,652.026611328125,689.7081909179688,654.6386108398438,688.4262084960938,658.4396362304688],["C",686.9102172851562,662.9296264648438,683.1522216796875,664.1056518554688,678.9212036132812,664.3466186523438],["C",664.3892211914062,665.1776123046875,664.38818359375,665.170654296875,664.38818359375,650.5836181640625],["C",664.38818359375,648.66064453125,664.377197265625,646.7376708984375,664.3901977539062,644.8146362304688],["C",664.3822021484375,636.2276611328125,663.3472290039062,636.254638671875,673.3101806640625,636.2566528320312],["C",675.5382080078125,636.2566528320312,677.815185546875,636.3916625976562,679.9862060546875,636.8556518554688],["C",686.5831909179688,638.265625,688.501220703125,642.8486328125,684.9641723632812,648.24462890625]],[["M",591.251220703125,636.381591796875],["C",592.1842041015625,636.3585815429688,592.7822265625,636.8955688476562,592.8302001953125,637.9696044921875],["C",593.0872192382812,643.7445678710938,593.2022094726562,651.9215698242188,591.9161987304688,656.82861328125],["C",591.408203125,658.7645874023438,590.252197265625,660.4415893554688,588.6802368164062,661.6785888671875],["C",585.3532104492188,664.298583984375,581.7282104492188,665.1795654296875,577.365234375,664.4285888671875],["C",572.002197265625,663.5036010742188,568.2882080078125,660.2015991210938,567.5491943359375,655.1356201171875],["C",566.7022094726562,649.3225708007812,567.2261962890625,643.3065795898438,567.252197265625,637.3786010742188],["C",567.26123046875,636.6975708007812,567.9352416992188,636.3576049804688,568.8222045898438,636.3585815429688],["C",569.6212158203125,636.3585815429688,570.2672119140625,636.6975708007812,570.2952270507812,637.4776000976562],["C",570.3522338867188,639.08056640625,570.240234375,641.984619140625,570.2492065429688,643.2536010742188],["C",570.2792358398438,647.3895874023438,570.2232055664062,649.3905639648438,570.5701904296875,653.3765869140625],["C",571.0042114257812,658.3685913085938,574.8192138671875,661.2075805664062,579.9161987304688,661.318603515625],["C",585.1192016601562,661.4315795898438,588.792236328125,658.7645874023438,589.3482055664062,653.7205810546875],["C",589.8641967773438,649.9475708007812,589.7131958007812,642.8065795898438,589.7572021484375,637.8555908203125],["C",589.7651977539062,636.9215698242188,590.3641967773438,636.403564453125,591.251220703125,636.381591796875]],[["M",423.0013122558594,639.5242919921875],["C",423.9403076171875,640.4902954101562,422.78631591796875,642.0213012695312,421.6023254394531,641.3773193359375],["C",417.03131103515625,638.894287109375,412.3463134765625,637.6693115234375,407.5333251953125,641.7033081054688],["C",405.3353271484375,643.5462646484375,403.6053161621094,647.0863037109375,403.47430419921875,649.9342651367188],["C",403.34429931640625,652.7783203125,404.7593078613281,656.5133056640625,406.8263244628906,658.4132690429688],["C",409.0063171386719,660.4163208007812,412.75830078125,661.5162963867188,415.82232666015625,661.5142822265625],["C",417.7362976074219,661.5133056640625,419.6493225097656,660.5682983398438,421.6683044433594,659.5682983398438],["C",422.768310546875,659.0242919921875,423.8663024902344,660.3292846679688,423.1383056640625,661.3172607421875],["C",421.184326171875,663.9702758789062,417.5973205566406,665.3363037109375,413.2633056640625,665.1602783203125],["C",406.45831298828125,664.88427734375,400.7853088378906,659.09228515625,400.01031494140625,651.6282958984375],["C",399.2903137207031,644.6983032226562,403.7213134765625,638.4403076171875,410.6893005371094,636.5422973632812],["C",415.29632568359375,635.2882690429688,419.97430419921875,636.4102783203125,423.0013122558594,639.5242919921875]],[["M",509.9468994140625,664.226806640625],["C",503.23089599609375,664.19482421875,497.9638977050781,664.3057861328125,491.9869079589844,664.226806640625],["C",489.4359130859375,664.2357788085938,489.4169006347656,664.2138061523438,489.3938903808594,661.7568359375],["C",489.3829040527344,660.5418090820312,489.2789001464844,646.0548095703125,489.3938903808594,638.2037963867188],["C",489.4049072265625,637.4907836914062,490.21990966796875,636.2448120117188,491.9978942871094,636.2448120117188],["L",491.9978942871094,660.3248291015625],["C",491.9978942871094,660.3598022460938,492.00689697265625,660.923828125,492.014892578125,661.4288330078125],["C",492.02191162109375,661.872802734375,492.3799133300781,662.2288208007812,492.82489013671875,662.2288208007812],["C",495.8489074707031,662.2308349609375,506.534912109375,662.1558227539062,509.9458923339844,662.226806640625],["C",510.89788818359375,662.246826171875,510.89990234375,664.2318115234375,509.9468994140625,664.226806640625]]]};function rc(i=1.85,t=.045,e=!1){let n=new Zt;n.name="Logo GLITZ originale PDF";let[s,r,o,a]=lh.bounds,c=e?602.6626:a,l=i/(o-s),h=new ei({color:"#ffffff",side:Ie});for(let d of lh.paths){if(e&&d[0][2]>610)continue;let u=new Dr;for(let[f,...m]of d){let y=p=>(p-(s+o)/2)*l,g=p=>(c-p)*l;f==="M"?u.moveTo(y(m[0]),g(m[1])):f==="L"?u.lineTo(y(m[0]),g(m[1])):f==="C"?u.bezierCurveTo(y(m[0]),g(m[1]),y(m[2]),g(m[3]),y(m[4]),g(m[5])):f==="Z"&&u.currentPath.closePath()}for(let f of u.toShapes(!0)){let m=new ae(new ni(f,{depth:t,bevelEnabled:!1,curveSegments:20}),h);m.name="Logo originale vettoriale",n.add(m)}}return n.userData={source:"Logo bianco su nero 3(1).pdf",width:i,height:(c-r)*l,wordmarkOnly:e},n}var Yr=new A;function vn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Yr.copy(t),Yr[n]=0,Yr.normalize();let l=.5*o/(o+a),h=1-Yr.angleTo(i)/c;return Math.sign(Yr[e])===1?h*l:a/(o+a)+l+l*(1-h)}var oi=class i extends Ye{constructor(t=1,e=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new A,l=new A,h=new A(t,e,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,y=new A,g=.5/o;for(let p=0,b=0;p<d.length;p+=3,b+=2)switch(c.fromArray(d,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),d[p+0]=h.x*Math.sign(c.x)+l.x*r,d[p+1]=h.y*Math.sign(c.y)+l.y*r,d[p+2]=h.z*Math.sign(c.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/m)){case 0:y.set(1,0,0),f[b+0]=vn(y,l,"z","y",r,n),f[b+1]=1-vn(y,l,"y","z",r,e);break;case 1:y.set(-1,0,0),f[b+0]=1-vn(y,l,"z","y",r,n),f[b+1]=1-vn(y,l,"y","z",r,e);break;case 2:y.set(0,1,0),f[b+0]=1-vn(y,l,"x","z",r,t),f[b+1]=vn(y,l,"z","x",r,n);break;case 3:y.set(0,-1,0),f[b+0]=1-vn(y,l,"x","z",r,t),f[b+1]=1-vn(y,l,"z","x",r,n);break;case 4:y.set(0,0,1),f[b+0]=1-vn(y,l,"x","y",r,t),f[b+1]=1-vn(y,l,"y","x",r,e);break;case 5:y.set(0,0,-1),f[b+0]=vn(y,l,"x","y",r,t),f[b+1]=1-vn(y,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var oc=[{id:"R1",zoneId:"riva",schematicPosition:[605,236],planPosition:[578.1115,284.8948],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R2",zoneId:"riva",schematicPosition:[618,319],planPosition:[583.5358,330.8489],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R3",zoneId:"riva",schematicPosition:[633,418],planPosition:[589.7481,386.5943],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R4",zoneId:"riva",schematicPosition:[645,509],planPosition:[594.256,438.8066],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R5",zoneId:"riva",schematicPosition:[746,237],planPosition:[676.429,284.7854],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R6",zoneId:"riva",schematicPosition:[761,319],planPosition:[683.8613,329.0998],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R7",zoneId:"riva",schematicPosition:[771,439],planPosition:[686.6616,395.3518],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R8",zoneId:"riva",schematicPosition:[792,516],planPosition:[698.6514,438.284],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R9",zoneId:"riva",schematicPosition:[906,237],planPosition:[782.6637,284.0729],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R10",zoneId:"riva",schematicPosition:[917,318],planPosition:[788.045,326.7514],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R11",zoneId:"riva",schematicPosition:[933,439],planPosition:[795.9485,391.693],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R12",zoneId:"riva",schematicPosition:[955,516],planPosition:[808.8624,433.4353],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R13",zoneId:"riva",schematicPosition:[1073,237],planPosition:[887.8866,283.3671],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R14",zoneId:"riva",schematicPosition:[1083,318],planPosition:[893.2601,324.9309],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R15",zoneId:"riva",schematicPosition:[1096,439],planPosition:[900.2273,388.202],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R16",zoneId:"riva",schematicPosition:[1111,516],planPosition:[875,426],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B0",zoneId:"back",schematicPosition:[80,195],planPosition:[233.13,261.7103],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B1",zoneId:"back",schematicPosition:[104,260],planPosition:[248.25,305.6414],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B2",zoneId:"back",schematicPosition:[171,195],planPosition:[290.46,261.7103],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B3",zoneId:"back",schematicPosition:[207,260],planPosition:[313.14,305.6414],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B4",zoneId:"back",schematicPosition:[262,195],planPosition:[347.79,261.7103],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B5",zoneId:"back",schematicPosition:[89,346],planPosition:[238.8,361.0123],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B6",zoneId:"back",schematicPosition:[201,346],planPosition:[309.36,361.0123],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B7",zoneId:"back",schematicPosition:[88,415],planPosition:[238.17,398.7391],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B8",zoneId:"back",schematicPosition:[76,626],planPosition:[230.61,554.2336],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B9",zoneId:"back",schematicPosition:[160,626],planPosition:[283.53,554.2336],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B10",zoneId:"back",schematicPosition:[247,626],planPosition:[338.34,554.2336],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B11",zoneId:"back",schematicPosition:[325,698],planPosition:[387.48,595.2804],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B12",zoneId:"back",schematicPosition:[400,718],planPosition:[434.73,606.6822],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B13",zoneId:"back",schematicPosition:[478,742],planPosition:[483.87,620.3645],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B14",zoneId:"back",schematicPosition:[391,772],planPosition:[429.06,637.4673],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B15",zoneId:"back",schematicPosition:[79,748],planPosition:[232.5,623.785],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G1",zoneId:"glitzbar",schematicPosition:[134,822],planPosition:[291.368,677.33],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G2",zoneId:"glitzbar",schematicPosition:[213,863],planPosition:[347.616,708.9],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G3",zoneId:"glitzbar",schematicPosition:[144,914],planPosition:[298.488,748.17],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G4",zoneId:"glitzbar",schematicPosition:[175,979],planPosition:[340,818],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G5",zoneId:"glitzbar",schematicPosition:[161,1038],planPosition:[310.592,843.65],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G6",zoneId:"glitzbar",schematicPosition:[263,1072],planPosition:[383.216,869.83],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G7",zoneId:"glitzbar",schematicPosition:[371,1038],planPosition:[441,843.65],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G8",zoneId:"glitzbar",schematicPosition:[382,940],planPosition:[441,768.19],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"SV1",zoneId:"seaview",schematicPosition:null,planPosition:[902,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV2",zoneId:"seaview",schematicPosition:null,planPosition:[830,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV3",zoneId:"seaview",schematicPosition:null,planPosition:[758,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV4",zoneId:"seaview",schematicPosition:null,planPosition:[686,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV5",zoneId:"seaview",schematicPosition:null,planPosition:[614,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV6",zoneId:"seaview",schematicPosition:null,planPosition:[583,161.3],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV7",zoneId:"seaview",schematicPosition:null,planPosition:[652,168.2],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV8",zoneId:"seaview",schematicPosition:null,planPosition:[721,175.1],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV9",zoneId:"seaview",schematicPosition:null,planPosition:[790,182],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV10",zoneId:"seaview",schematicPosition:null,planPosition:[859,188.9],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV11",zoneId:"seaview",schematicPosition:null,planPosition:[928,195.8],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"PB1",zoneId:"prato-back",schematicPosition:null,planPosition:[245,183],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB2",zoneId:"prato-back",schematicPosition:null,planPosition:[307,183],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB3",zoneId:"prato-back",schematicPosition:null,planPosition:[369,183],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB4",zoneId:"prato-back",schematicPosition:null,planPosition:[383,137],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB5",zoneId:"prato-back",schematicPosition:null,planPosition:[104,246],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB6",zoneId:"prato-back",schematicPosition:null,planPosition:[151,251],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB7",zoneId:"prato-back",schematicPosition:null,planPosition:[103,182],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB8",zoneId:"prato-back",schematicPosition:null,planPosition:[151,178],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB9",zoneId:"prato-back",schematicPosition:null,planPosition:[236,138],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB10",zoneId:"prato-back",schematicPosition:null,planPosition:[305,144],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1}];var $t={ivory:"#eeeae0",fabric:"#cec8bc",seam:"#b5ada0",wood:"#87522c",metal:"#f1efe8",masonry:"#e9e6dd",black:"#262a2a"},Pd={},Ld=i=>Pd[i]??(Pd[i]=new le({color:i,roughness:i===$t.wood?.53:.9}));function Xn(i,t,e,n,s=[0,0,0]){let r=new ae(i,typeof t=="string"?Ld(t):t);return r.name=e,r.position.set(...s),r.castShadow=!0,r.receiveShadow=!0,n.add(r),r}function de(i,t,e,n,s,r=0){return Xn(r?new oi(...n,3,r):new Ye(...n),s,t,i,e)}function Wn(i,t,e,n,s,r){let o=new A(...e),a=new A(...n),c=a.clone().sub(o),l=Xn(new Ae(s,s,c.length(),7),r,t,i,o.clone().add(a).multiplyScalar(.5).toArray());return l.quaternion.setFromUnitVectors(new A(0,1,0),c.normalize()),l}function cc(i,t,e,n=0){let s=new Zt;return s.position.set(t,0,e),s.rotation.y=n,i.add(s),s}function ac(i,t,e,n,s=!1){let r=s?$t.metal:$t.black;for(let a of[-.055,.055])for(let c of[-.055,.055])Wn(i,"Lanterne montante",[t+a,e,n+c],[t+a,e+.27,n+c],.008,r);de(i,"Lanterne base",[t,e,n],[.13,.025,.13],r),de(i,"Lanterne tetto",[t,e+.28,n],[.13,.025,.13],r),Xn(new Ae(.025,.025,.07,8),"#e3d3b7","Candela",i,[t,e+.055,n]);let o=Xn(new Tr(.04,.006,5,12),r,"Manico lanterna",i,[t,e+.325,n])}function hh(i,t,e,n=.48,s=.9,r=.7,o=!0){de(i,"Tavolo piano legno",[t,n,e],[s,.105,r],$t.wood,.014);for(let a=1;a<7;a++)de(i,"Tavolo fughe doghe",[t-s/2+a*s/7,n+.053,e],[.006,.002,r-.035],"#684125");for(let a of[-s/2+.055,s/2-.055])for(let c of[-r/2+.055,r/2-.055])de(i,"Tavolo gamba",[t+a,(n-.05)/2,e+c],[.042,n-.05,.042],o?$t.metal:$t.wood);ac(i,t,n+.065,e,o)}function Id(i,t,e,n=0,s=1.6){let r=cc(i,t,e,n);de(r,"Divano fascia in legno",[0,.16,0],[s,.17,.78],$t.wood,.017),de(r,"Divano telaio bianco",[0,.065,0],[s+.02,.05,.8],$t.metal,.008);for(let a of[-s/2+.055,s/2-.055])for(let c of[-.33,.33])de(r,"Divano piedino bianco",[a,.07,c],[.04,.14,.04],$t.metal);de(r,"Divano seduta imbottita",[0,.375,.03],[s,.29,.84],$t.ivory,.095);let o=de(r,"Divano schienale alto",[0,.77,-.32],[s,.85,.24],$t.ivory,.09);o.rotation.x=-.11;for(let a of[-s*.23,s*.23]){let c=de(r,"Divano cuscino decorativo",[a,.71,-.135],[s*.34,.35,.115],"#ded8ce",.055);c.rotation.x=-.23,c.rotation.z=a<0?.07:-.06}return r}function Kx(i,t,e,n=1.35,s=.64){let r=cc(i,t,e);de(r,"Pouf rettangolare fascia legno",[0,.16,0],[n,.17,s],$t.wood,.018),de(r,"Pouf rettangolare imbottitura",[0,.39,0],[n,.3,s+.015],$t.ivory,.07);for(let o of[-n/2+.05,n/2-.05])for(let a of[-s/2+.05,s/2-.05])de(r,"Pouf piedino bianco",[o,.065,a],[.04,.13,.04],$t.metal);return r}function Gs(i,t,e,n=0,s=.92){let r=cc(i,t,e,n),o=new oi(s,.51,s*.96,5,.19),a=o.attributes.position;for(let l=0;l<a.count;l++){let h=a.getX(l),d=a.getY(l),u=a.getZ(l),f=.009*Math.sin(h*35+u*21)*Math.cos(d*22);a.setXYZ(l,h+f,d+.012*Math.sin(u*18)*Math.cos(h*15),u+f*.6)}o.computeVertexNormals(),Xn(o,$t.fabric,"Poltrona sacco corpo morbido",r,[0,.275,0]);let c=de(r,"Poltrona sacco schienale",[0,.62,-s*.31],[s*.98,.6,.35],$t.fabric,.145);c.rotation.x=-.18;for(let l of[-s*.32,s*.32]){let h=new Ps([new A(l,.08,.3),new A(l,.46,.4),new A(l,.53,.05),new A(l,.57,-.2)]);Xn(new wr(h,15,.003,4,!1),$t.seam,"Cucitura tessuto",r)}return r}function $x(i,t,e,n=.33){Xn(new Ae(n,n,.035,32),$t.metal,"Tavolino tondo bianco",i,[t,.43,e]);for(let s of[0,Math.PI*.5,Math.PI,Math.PI*1.5])Wn(i,"Tavolino piede inclinato",[t+Math.cos(s)*n*.8,0,e+Math.sin(s)*n*.8],[t+Math.cos(s)*n*.5,.41,e+Math.sin(s)*n*.5],.018,$t.metal);ac(i,t,.46,e)}function Dd(i,t,e,n=0){let s=cc(i,t,e,n);for(let o of[-.26,.26])Wn(s,"Sedia gamba incrociata",[o,.015,-.28],[o,.48,.23],.014,$t.metal),Wn(s,"Sedia gamba incrociata",[o,.015,.28],[o,.48,-.23],.014,$t.metal),Wn(s,"Sedia montante",[o,.42,-.25],[o,.92,-.3],.014,$t.metal),Wn(s,"Sedia supporto bracciolo",[o,.46,.23],[o,.65,.23],.014,$t.metal),de(s,"Bracciolo legno",[o,.65,-.015],[.035,.035,.54],$t.wood,.008);de(s,"Sedia tela seduta",[0,.46,0],[.49,.025,.47],$t.fabric,.006);let r=de(s,"Sedia tela schienale",[0,.745,-.278],[.48,.32,.022],$t.fabric,.006);r.rotation.x=-.075,Wn(s,"Sedia traverso basso",[-.26,.025,.28],[.26,.025,.28],.014,$t.metal)}function jx(i){let t="#353735";Xn(new Ae(.1,.12,.025,24),t,"Lampada ricaricabile base",i,[0,.6,0]),Wn(i,"Lampada ricaricabile stelo",[0,.61,0],[0,.84,0],.014,t);let e=new le({color:"#fff0ca",emissive:"#ffcc81",emissiveIntensity:.65});Xn(new Ae(.075,.115,.14,24),e,"Lampada ricaricabile diffusore",i,[0,.8,0]);for(let n=0;n<16;n++){let s=n*Math.PI/8;Wn(i,"Lampada ricaricabile gabbia",[Math.cos(s)*.125,.73,Math.sin(s)*.125],[Math.cos(s)*.085,.89,Math.sin(s)*.085],.007,t)}Xn(new Ae(.085,.085,.018,24),t,"Lampada ricaricabile cappello",i,[0,.9,0])}function Qx(i){de(i,"Seat View panca murata",[0,.22,0],[3.2,.44,.76],$t.masonry),de(i,"Seat View tavolino murato",[0,.5,0],[.48,.16,.76],$t.masonry);for(let e of[-1.14,-.59,.59,1.14])de(i,"Seat View cuscino panca",[e,.48,.015],[.53,.08,.68],$t.fabric,.025);jx(i);let t=new le({color:"#fff2d1",emissive:"#ffc875",emissiveIntensity:.8});for(let e of[-1.08,0,1.08])de(i,"Seat View incasso luce",[e,.2,.383],[.13,.1,.018],$t.metal),de(i,"Seat View luce calda",[e,.2,.394],[.095,.065,.008],t)}function Nd(i,t){let e=new Zt;if(e.name="ARREDI_"+t,i==="panorama-masonry")Qx(e);else if(i==="riva-compact")Id(e,0,-.62,0,1.35),hh(e,0,.08,.47,.8,.64);else if(i==="riva-lounge")Id(e,0,-.87,0,1.6),hh(e,0,0,.48,.95,.72),Kx(e,0,.87,1.38,.61);else if(i==="lawn-short-l"){Gs(e,-.39,-.35,0,.76),Gs(e,.39,-.35,0,.76);let n=Gs(e,-.39,.4,Math.PI/2,.76);n.name="Pouf morbido senza schienale",n.getObjectByName("Poltrona sacco schienale").removeFromParent(),de(e,"Tavolino quadrato bianco",[.4,.43,.42],[.48,.045,.48],$t.metal,.01);for(let s of[.19,.61])for(let r of[.21,.63])de(e,"Tavolino bianco gamba",[s,.21,r],[.026,.42,.026],$t.metal);ac(e,.4,.46,.42,!0)}else if(i==="lawn-pair"){Gs(e,-.65,0,0,.92),Gs(e,.65,0,0,.92),de(e,"Tavolino quadrato bianco",[0,.43,0],[.55,.045,.55],$t.metal,.01);for(let n of[-.24,.24])for(let s of[-.24,.24])de(e,"Tavolino bianco gamba",[n,.21,s],[.026,.42,.026],$t.metal);ac(e,0,.46,0,!0)}else i==="beanbag-round"?(Gs(e,0,-.46,0,.89),$x(e,.05,.45,.3)):(hh(e,0,.08,.67,.86,.67,!1),Dd(e,0,.9,Math.PI));return e}function Zr(i,t,e,n=.812){for(let s=1;s<e.length;s++){let r=t(...e[s-1],n),o=t(...e[s],n),a=o.clone().sub(r),c=a.length(),l=new Zt;l.name="GLITZ_BAR_PANCA_CONTINUA",l.position.copy(r).add(o).multiplyScalar(.5),l.rotation.y=Math.atan2(-a.z,a.x),i.add(l),de(l,"Muratura continua base",[0,.23,0],[c+.02,.46,.72],$t.masonry),de(l,"Muratura schienale continuo",[0,.56,-.36],[c+.02,.92,.16],$t.masonry);let h=Math.max(1,Math.round(c/.74));for(let d=0;d<h;d++){let u=-c/2+(d+.5)*c/h;de(l,"Cuscino su panca murata",[u,.505,.035],[c/h-.015,.09,.64],$t.fabric,.025);let f=de(l,"Cuscino schienale",[u,.735,-.2],[.38,.37,.12],d%3===1?$t.black:$t.fabric,.055);f.rotation.x=-.18,f.rotation.z=d%2?.075:-.06}}}function Ud(){let i=new Zt;return i.name="Sgabello ingresso",Dd(i,0,0),i.scale.y=1.42,i.traverse(t=>{t.name.startsWith("Sedia tela")&&(t.material=Ld($t.metal))}),Wn(i,"Poggiapiedi sgabello",[-.26,.2,.28],[.26,.2,.28],.016,$t.metal),i}var ai={width:9,heightAboveSupport:4,heightAboveDancefloor:5,supportAboveDancefloor:1,dancefloorY:.1,supportY:1.1,crownY:5.1,widthReference:"outer structural envelope",heightReference:"crown of truss; fixtures and sign separate",source:"User supplied dimensions"};function Fd(i){let t=new Zt;t.name="GLITZ_ARCH_9M",t.position.copy(i),t.position.y=ai.supportY,t.userData={...ai};let e=new Zt,n=new Zt,s=new Zt;e.name="ARCH_TRUSS",n.name="ARCH_LIGHTS_AUDIO",s.name="ARCH_GLITZ_LETTERS",t.add(e,n,s);let r=new le({color:"#bdc4c5",metalness:.8,roughness:.3}),o=new le({color:"#20252a",roughness:.65}),a=new le({color:"#f4f1e7",roughness:.5});function c(p,b,w,_,M,S,R,x,C){let I=new ae(new oi(S,R,x,2,Math.min(.025,S/8)),C);return I.position.set(w,_,M),I.name=b,p.add(I),I}function l(p,b,w,_,M=.024,S=r){let R=_.clone().sub(w),x=new ae(new Ae(M,M,R.length(),8),S);return x.position.copy(w).add(_).multiplyScalar(.5),x.quaternion.setFromUnitVectors(new A(0,1,0),R.normalize()),x.name=b,p.add(x),x}let h=(p,b=!1,w=0)=>new A((b?4.195:4.475)*Math.cos(p),.025+(b?3.695:3.95)*Math.sin(p),w);for(let p=0;p<48;p++){let b=p*Math.PI/48,w=(p+1)*Math.PI/48;for(let _ of[-.16,.16])l(e,"Corrente esterno",h(b,!1,_),h(w,!1,_)),l(e,"Corrente interno",h(b,!0,_),h(w,!0,_)),l(e,"Diagonale faccia",h(b,p%2===0,_),h(w,p%2!==0,_),.01),p%2===0&&l(e,"Montante radiale",h(b,!1,_),h(b,!0,_),.012);if(l(e,"Diagonale profondita",h(b,!1,-.16),h(w,!1,.16),.01),p%4===0)for(let _ of[!1,!0])l(e,"Traverso",h(b,_,-.16),h(b,_,.16),.014)}for(let p of[-4.475,4.475])c(n,"Piastra piede",p,-.025,0,.43,.05,.47,r);for(let p=0;p<24;p++){let b=.16+p*(Math.PI-.32)/24,w=b+(Math.PI-.32)/24*.91;if(Math.abs(4.475*Math.cos((b+w)/2))<1.12)continue;let _=h(b,!1,.202),M=h(w,!1,.202);l(n,"Barra LED scocca",_,M,.039,o);let S=new Ht().setHSL(.66+p/24*.07,.9,.66),R=new le({color:S,emissive:S,emissiveIntensity:.65});l(n,"Barra LED diffusore",_.clone().add(new A(0,0,.022)),M.clone().add(new A(0,0,.022)),.017,R)}for(let p of[.25,.58,.91,1.22,1.91,2.24,2.57,2.89]){let b=h(p,!1,0),w=new Zt;w.position.copy(b),w.rotation.z=p-Math.PI/2,n.add(w),c(w,"Testa mobile base",0,.045,0,.26,.085,.29,o);for(let S of[-.14,.14])c(w,"Forcella testa mobile",S,.22,0,.04,.3,.08,o);let _=c(w,"Testa mobile proiettore",0,.29,.02,.24,.32,.23,o);_.rotation.x=-.38;let M=new ae(new Ae(.074,.074,.014,20),new le({color:"#99a6ba",metalness:.2,roughness:.22}));M.rotation.x=Math.PI/2-.38,M.position.set(0,.29,.155),M.name="Lente testa mobile",w.add(M)}for(let p of[-3.13,3.13]){let b=.025+3.95*Math.sqrt(1-(p/4.475)**2);l(n,"Sospensione audio",new A(p,b-.1,-.07),new A(p,b-.65,-.07),.014,o);for(let w=0;w<2;w++){let _=c(n,"Line array modulo",p,b-.67-w*.32,.01,.7,.29,.42,o);_.rotation.x=.035+w*.045,c(n,"Griglia diffusore",p,b-.67-w*.32,.228,.65,.25,.015,new le({color:"#333941",roughness:1}))}}let d=new Zt;d.name="REAR_SCREEN_TRUSS",t.add(d);function u(p,b,w=.3){let _=b.clone().sub(p).normalize(),M=Math.abs(_.y)>.9?new A(1,0,0):new A(0,1,0),S=new A().crossVectors(_,M).normalize().multiplyScalar(w/2),R=new A().crossVectors(_,S).normalize().multiplyScalar(w/2),x=[S.clone().add(R),S.clone().sub(R),S.clone().negate().sub(R),R.clone().sub(S)];for(let I of x)l(d,"Corrente truss rettilinea",p.clone().add(I),b.clone().add(I),.024);let C=Math.ceil(p.distanceTo(b)/.34);for(let I=0;I<C;I++)for(let N=0;N<4;N++){let k=p.clone().lerp(b,I/C),z=p.clone().lerp(b,(I+1)/C);l(d,"Diagonale truss rettilinea",k.clone().add(x[N]),z.clone().add(x[(N+1)%4]),.009),I%3===0&&l(d,"Traverso truss",k.clone().add(x[N]),k.clone().add(x[(N+1)%4]),.012)}}let f=-5.79,m=3.7;for(let p of[-1,1]){u(new A(p*2.95,-.5,f),new A(p*2.95,m-.42,f));for(let b=0;b<8;b++){let w=b*Math.PI/16,_=(b+1)*Math.PI/16;u(new A(p*(2.53+.42*Math.cos(w)),m-.42+.42*Math.sin(w),f),new A(p*(2.53+.42*Math.cos(_)),m-.42+.42*Math.sin(_),f))}}u(new A(-2.53,m,f),new A(2.53,m,f)),u(new A(0,3.81,-.16),new A(0,m,f));for(let p=1;p<8;p++){let b=p*Math.PI/8;for(let w of[-.16,.16])l(n,"Giunto modulo arco",h(b,!1,w).add(new A(0,-.045,0)),h(b,!1,w).add(new A(0,.045,0)),.034,r)}let y=rc(1.85,.045,!0),g=(3.975+3.72)/2;y.position.set(0,g-y.userData.height/2,.29),s.add(y);for(let p of[-.65,.65])l(s,"Staffa aggancio logo alla truss",new A(p,g,.16),new A(p,g,.31),.012,r);return t.traverse(p=>{p.isMesh&&(p.castShadow=!0,p.receiveShadow=!0,p.userData.archComponent=!0)}),{root:t,truss:e,equipment:n,sign:s,rear:d,spec:ai}}var ty=["#354b2a","#425e32","#58713b","#657c46","#486536"],Od=ty.map(i=>new le({color:i,roughness:1,side:Ie})),ey=new le({color:"#79644e",roughness:1});function Bd(i,t){let e=159,n=()=>(e=e*1664525+1013904223>>>0,e/4294967296);function s(_,M,S=.025){let R=M.clone().sub(_),x=new ae(new Ae(S*.7,S,R.length(),6),ey);x.position.copy(_).add(M).multiplyScalar(.5),x.quaternion.setFromUnitVectors(new A(0,1,0),R.normalize()),x.name="Ramo",x.castShadow=!0,i.add(x)}function r(_,M=.2,S=0){let R=[];for(let I=0;I<12;I++){let N=n()*Math.PI*2,k=Math.sqrt(n())*M,z=_.clone().add(new A(Math.cos(N)*k,(n()-.5)*M*1.7,Math.sin(N)*k)),O=n()*Math.PI*2,H=M*(.28+n()*.25),$=H*.45,q=new A(Math.cos(O)*H,.03,Math.sin(O)*H),at=new A(-Math.sin(O)*$,0,Math.cos(O)*$),j=z.clone().add(q),et=z.clone().sub(q),ot=z.clone().add(at),_t=z.clone().sub(at);z.y+=.025;for(let xt of[[et,ot,z],[ot,j,z],[j,_t,z],[_t,et,z]])for(let te of xt)R.push(...te.toArray())}let x=new xe;x.setAttribute("position",new ne(R,3)),x.computeVertexNormals();let C=new ae(x,Od[S%5]);C.name="Foglie singole ripiegate",C.castShadow=!0,C.receiveShadow=!0,i.add(C)}function o(_,M,S,R=3,x=0){let C=t(_,M,x);s(C,C.clone().add(new A(.08,R*.7,0)),.11);for(let I=0;I<12;I++){let N=I*2.399,k=S*(.3+.6*n()),z=C.clone().add(new A(Math.cos(N)*k,R*(.6+.35*n()),Math.sin(N)*k));s(C.clone().add(new A(0,R*.5,0)),z,.022);for(let O=0;O<13;O++)r(z.clone().add(new A((n()-.5)*S*.8,(n()-.5)*S*.6,(n()-.5)*S*.8)),S*(.14+.12*n()),I+O)}}[[810,936,3.5,6.2]].forEach(_=>o(..._));function a(_,M,S=.8,R=.6){let x=t(..._),C=t(...M),I=Math.ceil(x.distanceTo(C)/.3);for(let N=0;N<=I;N++){let k=x.clone().lerp(C,N/I);for(let z=0;z<4;z++)r(k.clone().add(new A((n()-.5)*R,S*(.4+n()*.5),(n()-.5)*R)),.22+n()*.08,N+z)}}a([560,137],[982,174],1,.75),a([1030,355],[1030,655],.95,.9),a([670,677],[1004,696],.75,.75),a([210,653],[253,895],1.1,.6),a([190,237],[190,624],1.4,.85);function c(_,M,S,R=0){let x=t(_,M,R),C=x.clone().add(new A(.18,S,0));s(x,C,.15);for(let I=0;I<16;I++){let N=I*2.399,k=2.3+I%3*.2,z=[];for(let q=0;q<=12;q++){let at=q/12;z.push(C.clone().add(new A(Math.cos(N)*k*at,.7*Math.sin(at*Math.PI)-.9*at*at,Math.sin(N)*k*at)))}for(let q=1;q<z.length;q++)s(z[q-1],z[q],.014);let O=[];for(let q=1;q<12;q++){let at=q/12;for(let j of[-1,1]){let et=z[q],ot=.55*Math.sin(Math.PI*at),_t=et.clone().add(new A(Math.cos(N+Math.PI/2)*ot*j,-.25,Math.sin(N+Math.PI/2)*ot*j));_t.add(new A(Math.cos(N)*.25,0,Math.sin(N)*.25)),O.push(...et.toArray(),..._t.toArray(),...et.clone().add(new A(Math.cos(N)*.11,0,Math.sin(N)*.11)).toArray())}}let H=new xe;H.setAttribute("position",new ne(O,3)),H.computeVertexNormals();let $=new ae(H,Od[I%5]);$.name="Palma fronda pennata",$.castShadow=!0,i.add($)}}c(610,735,6.3,.8),c(1238,392,4.8);let l=new le({color:"#deded4",roughness:.7}),h=new le({color:"#a74f83",roughness:1});for(let[_,M]of[[490,739],[490,795]]){let S=t(_,M,.8),R=new ae(new Ae(.29,.2,.48,16),l);R.position.copy(S).add(new A(0,.24,0)),R.name="Vaso bianco",i.add(R);for(let x=0;x<30;x++)r(S.clone().add(new A((n()-.5)*.6,.75+n()*.6,(n()-.5)*.6)),.13,x)}o(548,774,.55,1.9,.8);let d=t(490,767,.81);for(let _=0;_<65;_++){let M=n()*Math.PI,S=d.clone().add(new A(Math.cos(M)*1.25,1.65+Math.sin(M)*.7,(n()-.5)*.28));if(r(S,.1+n()*.05,_),_%3===0){let R=new ae(new br(.065),h);R.position.copy(S).add(new A(.07,.03,.04)),R.name="Bougainvillea fiore",i.add(R)}}let u=new le({color:"#343b32",roughness:.8});function f(_,M,S=.012){let R=M.clone().sub(_),x=new ae(new Ae(S,S,R.length(),5),u);x.position.copy(_).add(M).multiplyScalar(.5),x.quaternion.setFromUnitVectors(new A(0,1,0),R.normalize()),x.name="Recinzione mare",i.add(x)}let m=t(90,90),y=t(1020,183);for(let _=0;_<=110;_++){let M=m.clone().lerp(y,_/110);if(f(M,M.clone().add(new A(0,1.12,0)),_%10===0?.025:.009),_%9===0)for(let S=0;S<26;S++)r(M.clone().add(new A((n()-.5)*.35,.12+n()*1.2,(n()-.5)*.5)),.13,S)}f(m.clone().add(new A(0,1.12,0)),y.clone().add(new A(0,1.12,0)),.018);let g=new Zt;g.name="Grande pianta PB chioma alta";let p=i.children.length,b=t(103,125,0),w=b.clone().add(new A(0,3.2,0));s(b,w,.18);for(let _=0;_<12;_++){let M=_*Math.PI/6,S=w.clone().add(new A(Math.cos(M)*2.5,1.2+_%3*.3,Math.sin(M)*2.5));s(w,S,.065);for(let R=0;R<18;R++){let x=R*2.399;r(S.clone().add(new A(Math.cos(x)*.7,.2+n()*.6,Math.sin(x)*.7)),.37+R%3*.05,R)}}for(let _ of i.children.slice(p))g.add(_);i.add(g),g.userData={trunkPlan:[103,125],clearHeight:3.2};for(let[_,M]of[[1030,384],[1030,434],[1030,478],[1030,562],[1030,603],[1030,645],[852,669],[889,670],[925,670],[959,670],[995,670]])o(_,M,.38,.85);for(let[_,M]of[[164,520]]){let S=t(_,M);for(let R=0;R<12;R++){let x=R*2.399,C=.9+n()*.5,I=S.clone().add(new A(Math.cos(x)*C,3.5+n(),Math.sin(x)*C));s(S,I,.03);for(let N=0;N<10;N++)r(I.clone().add(new A((n()-.5)*.25,-N*.19,(n()-.5)*.25)),.17,R+N)}}}var ue=1191/1888*25.4/72*200/1e3,fe=(i,t,e=0)=>new A((440-t)*ue,e,(i-580)*ue);function zd(){let i=new Zt;i.name="GLITZ_CLUB",i.userData={version:"15.0",archDimensions:ai,layoutSource:"Pianta schematica monocromatica della venue.png",tableIdsFromUserPlan:!0,scaleBasis:"A3 PDF, nominal 1:200, hand digitized",surveyVerified:!1,up:"Y",units:"metres"};let t=[],e=[],n=[],s={},r=(T,D=.8)=>s[T]??(s[T]=new le({color:T,roughness:D,metalness:0})),o={white:"#efede3",stone:"#c5c3b9",light:"#d6d3c7",grass:"#50634d",leaf:"#496247",wood:"#a27549",metal:"#bbc4bf",dark:"#22282c",puff:"#c4c0b3",path:"#b8b1a0"};function a(T,D,V,B=i){let Y=new ae(T,typeof D=="string"?r(D):D);return Y.name=V,Y.castShadow=!0,Y.receiveShadow=!0,B.add(Y),Y}function c(T,D,V,B,Y,tt=o.white,rt=i,ft=0){let U=ft?new oi(V,B,Y,2,ft):new Ye(V,B,Y),Xt=a(U,tt,T,rt);return Xt.position.copy(D),Xt}function l(T,D,V,B,Y,tt,rt,ft,U=i,Xt=0){return c(T,fe(D,V,B),Y,tt,rt,ft,U,Xt)}function h(T,D,V,B,Y=o.white,tt=i){let rt=V.clone().sub(D),ft=a(new Ae(B,B,rt.length(),6),Y,T,tt);return ft.position.copy(D).add(V).multiplyScalar(.5),ft.quaternion.setFromUnitVectors(new A(0,1,0),rt.normalize()),ft}function d(T,D,V,B,Y,tt=i){let rt=new Cn;D.forEach(([Xt,qt],P)=>{let v=fe(Xt,qt);P?rt.lineTo(v.x,-v.z):rt.moveTo(v.x,-v.z)}),rt.closePath();let ft=new ni(rt,{depth:B,bevelEnabled:!1,steps:1});ft.rotateX(-Math.PI/2);let U=a(ft,Y,T,tt);return U.position.y=V-B,U}function u(T,D,V=i){for(let B=1;B<T.length;B++){let Y=fe(...T[B-1],D),tt=fe(...T[B],D),rt=Math.ceil(Y.distanceTo(tt)/1.4);for(let ft=0;ft<=rt;ft++){let U=Y.clone().lerp(tt,ft/rt);h("Montante",U,U.clone().add(new A(0,1.03,0)),.027,o.white,V)}for(let ft of[.2,.4,.6,.8,1.03])h("Corrimano",Y.clone().add(new A(0,ft,0)),tt.clone().add(new A(0,ft,0)),.016,o.white,V)}}d("Terreno",[[30,85],[70,70],[1035,160],[1206,265],[1260,580],[1360,620],[1250,890],[1490,964],[1540,1110],[1370,1125],[190,930]],-.04,.32,o.grass),d("Accesso esterno ingresso",[[530,1030],[620,1050],[650,958],[570,946]],.8,.12,o.path),d("Pavimento perimetrale",[[180,213],[1007,213],[1007,654],[201,654],[201,233],[180,233]],.05,.11,o.light);let m=[[544,257],[979,257],[979,380]];for(let T=0;T<=10;T++){let D=T*Math.PI/2/10;m.push([941+38*Math.cos(D),380+64*Math.sin(D)])}m.push([572,478]);let y=[[391,233],[543,233],[572,478],[565,516],[583,532],[513,606],[498,604],[374,568],[345,381],[343,349],[347,329],[363,300],[379,268]],g=[[201,234],[388,234],[379,268],[363,300],[347,329],[343,349],[345,381],[275,406],[258,423],[201,426]],p=[[201,426],[258,423],[265,498],[276,525],[295,531],[368,532],[374,568],[498,604],[513,618],[514,654],[201,654]],b=[[345,382],[275,406],[261,419],[256,435],[264,496],[277,523],[295,531],[368,532]],w=[[228,655],[572,655],[505,909],[263,895]],_=[[546,170],[956,195],[979,212],[547,212]];d("Pista da ballo \xB7 quota -0.50",y,.1,.15,o.stone),d("Piazzale \xB7 quota 0.00",[[543,233],[979,239],[979,478],[1007,478],[1007,654],[514,654],[514,618],[498,604],[513,606],[583,532],[565,516],[572,478]],.6,.55,o.light),d("Palco DJ \xB7 quota 0.00",b,.6,.55,o.stone);function M(T,D,V,B,Y,tt){d(D,V,B,B+.04,o.white),d(D+" finitura",V,B+.012,.024,o.stone);let rt={id:T,name:D,coords:V,y:B,anchor:fe(...Y,B+.8),description:tt};return t.push(rt),rt}M("riva","RIVA DECK",m,1.1,[760,365],"Divani bianchi, base in legno e tavolini quadrati. Tavoli R1\u2013R16.");let S=[[201,234],[388,234],[355,322],[201,322]],R=.85,x=201+R/ue,C=[[x,322],[355,322],[350,338],[x,338]],I=[[201,338],[350,338],[343,349],[345,381],[275,406],[258,423],[201,426]];for(let[T,D]of[[I,.9],[p,.9],[S,.6],[C,.9]])d("BACK THE STAGE",T,D,D+.04,o.white),d("BACK THE STAGE finitura",T,D+.012,.024,o.stone);t.push({id:"back",name:"BACK THE STAGE",coords:[...g,...p],y:.9,parts:[{coords:C,y:.9},{coords:I,y:.9},{coords:p,y:.9},{coords:S,y:.6}],anchor:fe(280,574,1.7),description:"Sedute morbide e tavolini tondi intorno al palco. Tavoli B0\u2013B15."}),M("glitzbar","GLITZ BAR",w,.8,[388,786],"Panche in muratura, tavoli in legno e sedie pieghevoli. Tavoli G1\u2013G8."),u([[544,257],[943,257]],1.12),u([[980,286],[980,380]],1.12),u([[980,380],...m.slice(3,-1),[793,458]],1.12),u([[708,466],[572,478],[544,257]],1.12),u([[241,234],[388,234]],.62),u([[202,271],[202,322]],.62),u([[202,339],[202,425],[202,427],[202,653],[330,653]],.92),u([[411,653],[512,653],[512,619]],.92);let N=new Zt;N.name="Ringhiera dalla scala dietro B5-B6 e fronte B6",i.add(N),u([[x,322],[355,322],[350,338],[343,349],[345,381]],.92,N);let k=new Zt;k.name="Ringhiera fronte B3-B4",i.add(k),u([[388,234],[355,322]],.62,k),u([[368,532],[374,568],[498,604],[513,618]],.92),u([[345,381],[276,406],[257,430],[265,495],[278,526],[368,531]],.6);function z(T,D,V,B,Y,tt,rt,ft=0,U=4){let Xt=new Zt;Xt.name=T,Xt.position.copy(fe(D,V)),Xt.rotation.y=ft,i.add(Xt);for(let qt=0;qt<U;qt++){let P=B+(Y-B)*(qt+1)/U;c("Gradino",new A(0,P/2,(qt+.5)*rt/U-rt/2),tt,P,rt/U,o.white,Xt);let v=c("Luce gradino",new A(0,P-.04,(qt+1)*rt/U-rt/2),tt*.95,.025,.02,new le({color:"#ffe3ad",emissive:"#ffc778",emissiveIntensity:.4}),Xt);v.castShadow=!1}}z("Scala terrazza laterale",752,474,1.1,.6,3.8,1.1,-Math.atan2(369,34),3),z("Seat View scala bassa quattro gradini",958,222,.05,.65,1.7,1.12,-Math.PI/2,4),d("Seat View pianerottolo",[[939,235],[977,235],[977,242],[939,242]],.65,.6,o.light),z("Seat View scala alta tre gradini",958,249,.65,1.1,1.7,.62,-Math.PI/2,3);for(let T of[937,979])d("Seat View muretto scala",[[T-2,208],[T+2,208],[T+2,257],[T-2,257]],.8,.75,o.white),u([[T,242],[T,257]],1.1);z("Scala pista",548,565,.1,.6,Math.hypot(70,-74)*ue,1.15,Math.atan2(-70,74),3),z("Scala priv\xE9 giardino",370,660,.8,.9,1.9,.6,Math.PI/2,2),z("Due gradini in discesa verso B0-B4",201+R/ue/2,330,.6,.9,R,16*ue,-Math.PI/2,2);let O=new Zt;O.name="Scala angolare dietro B0 su due lati",i.add(O);for(let T=0;T<4;T++){let D=(4-T)*.31/ue;d("Gradino angolare",[[201-D,234-D],[240,234-D],[240,270],[201-D,270]],.6*(T+1)/4,.6*(T+1)/4,o.white,O)}u([[572,478],[565,516],[583,532]],.6);let H=Fd(fe(356.5,457));H.root.rotation.y=Math.atan2(23,150),i.add(H.root),H.root.updateMatrixWorld(!0);for(let T of[-4.475,4.475]){let D=H.root.localToWorld(new A(T,0,0));D.y=(ai.supportY+.9)/2;let V=c("Appoggio arco quota confermata",D,.47,ai.supportY-.9,.47,o.white);V.rotation.y=H.root.rotation.y}let $=c("LED wall",new A(0,(.6+4.65)/2-ai.supportY,-5.6),5.6,4.05,.12,o.dark,H.root);$.userData.sign="GLITZ";let q=rc(4.3,.008);q.position.set(0,(.6+4.65)/2-ai.supportY-q.userData.height/2,-5.53),H.root.add(q);let at=Rd();at.rotation.y=H.root.rotation.y,at.position.copy(fe(356.5,457,.6)).add(new A(0,0,-1.02).applyAxisAngle(new A(0,1,0),at.rotation.y)),i.add(at);for(let T of[405,500])l("Subwoofer",398,T,.39,.7,.58,.62,o.dark);let j=[[78,92],[428,127],[428,210],[178,210],[178,282],[78,282]],et=[[546,147],[979,185],[979,213],[546,213]];for(let[T,D,V,B,Y]of[["prato-back","Prato Back the Stage",j,[280,183],"Salottini sul prato accanto a Back the Stage, con poltrone morbide e tavolini bianchi."],["seaview","Seat View",et,[765,193],"Il panorama. La zona vista mare, tra aperitivo e tramonto sull\u2019Isola di Dino."]]){d(D+" prato",V,0,.04,o.grass);let tt={id:T,name:D,coords:V,y:0,anchor:fe(...B,.8),description:Y};T==="seaview"&&(tt.parts=[{coords:V,y:0},{coords:[[574,233],[940,233],[940,255],[574,255]],y:.05}],tt.description="Seduta panoramica in muratura SV1\u2013SV5, con lampade ricaricabili; salottini SV6\u2013SV11 lungo la ringhiera nera."),t.push(tt)}for(let T of oc){let D=Nd(T.furniture,T.id);D.name="TABLE_"+T.id,D.userData={tableId:T.id,zoneId:T.zoneId,idConfirmedBySource:T.idConfirmedBySource!==!1,furnitureDimensionsEstimated:!0};let V=T.zoneId==="back"?Number(T.id.slice(1))<=4?.62:.92:T.height;D.position.copy(fe(...T.planPosition,V)),T.furnitureScale&&D.scale.setScalar(T.furnitureScale),Number.isFinite(T.rotation)?D.rotation.y=T.rotation:T.zoneId==="riva"?D.rotation.y=Math.PI:T.id==="G6"?D.rotation.y=Math.PI/2:["G7","G8"].includes(T.id)&&(D.rotation.y=Math.PI),D.traverse(B=>{B.isMesh&&(B.userData.tableId=T.id,B.userData.zoneId=T.zoneId,n.push(B))}),i.add(D),e.push({...T,height:V,label:T.id,position:D.position.clone().add(new A(0,.85,0)),capacity:null,minSpend:null,status:"unconfigured",source:"ID and layout from user schematic; furniture appearance from supplied photos",group:D})}function ot(T,D,V,B,Y,tt=.6){l(T+" pavimento",D,V,tt,B,.1,Y,"#a7a69d"),l(T+" fronte",D,V-B/ue/2+6,tt+.51,.28,1.02,Y,o.white),l(T+" piano frontale",D,V-B/ue/2+6,tt+1.045,.46,.07,Y+.08,"#b08757");for(let rt of[-1,1])l(T+" fianco",D+rt*(Y/2-.16)/ue,V,tt+.51,B,1.02,.28,o.white),l(T+" piano laterale",D+rt*(Y/2-.16)/ue,V,tt+1.045,B+.12,.07,.46,"#b08757");for(let rt=0;rt<Math.floor(Y/.14);rt++)l(T+" doga verticale",D+(rt*.14-Y/2+.07)/ue,V-B/ue/2+2.7,tt+.5,.013,.94,.018,"#d2d0c5");l(T+" banco lavoro inox",D,V+B/ue/2-10,tt+.82,.65,.065,Y*.7,"#a4aaab");for(let rt of[-Y*.22,Y*.22])l(T+" frigorifero",D+rt/ue,V+B/ue/2-10,tt+.37,.58,.74,.68,"#b6bdba"),l(T+" porta frigorifero",D+rt/ue,V+B/ue/2-2.9,tt+.39,.022,.56,.53,"#363f3e");for(let rt=0;rt<7;rt++){let ft=D+(rt-3)*.22/ue;l(T+" bottiglia corpo",ft,V-B/ue/2+6,tt+1.19,.07,.24,.07,rt%2?"#708265":"#b89761"),l(T+" bottiglia collo",ft,V-B/ue/2+6,tt+1.34,.027,.07,.027,"#596454")}l(T+" lavello",D,V+B/ue/2-10,tt+.855,.43,.012,.4,"#4c5657")}ot("Main Bar",936,613,2.35,5.25,.6);let _t=new Zt;_t.name="Main Bar rivolto verso Riva Deck",_t.position.copy(fe(936,613)),i.add(_t);for(let T of[...i.children])T.name.startsWith("Main Bar ")&&T!==_t&&(T.position.sub(_t.position),_t.add(T));_t.rotation.y=0,_t.userData.frontFacesRiva=!0,l("Bar mare fronte",467,180,.59,.14,1.12,4.9,o.white),l("Bar mare piano legno",467,180,1.18,.66,.065,5.02,"#ab794f"),l("Bar mare zoccolo",467,180,.075,.2,.09,4.96,o.white);for(let T=0;T<35;T++)l("Bar mare fuga doghe",467+(T*.14-2.38)/ue,178.35,.61,.008,1,.007,"#c4c5bd");for(let T of[-2.38,2.38])l("Bar mare fianco",467+T/ue,185,.59,.6,1.12,.09,o.white);for(let T of[-1.8,1.8]){l("Bar mare lanterna base",467+T/ue,180,1.235,.22,.025,.22,o.white);for(let D of[-.1,.1])for(let V of[-.1,.1]){let B=fe(467+T/ue,180,1.25).add(new A(D,0,V));h("Bar mare lanterna",B,B.clone().add(new A(0,.42,0)),.012,o.white)}l("Bar mare lanterna tetto",467+T/ue,180,1.68,.22,.025,.22,o.white)}let xt=new Zt;xt.name="Bar mare ruotato 180 gradi",xt.position.copy(fe(467,180)),i.add(xt);for(let T of[...i.children])T.name.startsWith("Bar mare ")&&T!==xt&&(T.position.sub(xt.position),xt.add(T));xt.rotation.y=Math.PI;for(let T=0;T<10;T++)for(let D=0;D<3;D++)l("Bar mare lastra",414+T*12.1,183+D*12.1,.04,.525,.055,.525,"#a9aba3");d("Gin xp",[[1104,422],[1192,398],[1225,495],[1272,564],[1240,583],[1148,612]],.16,.2,o.stone),l("Gin xp banco",1145,448,.65,2.3,1,.58,o.white),l("Regia",526,684,1.13,1.7,1.05,2.4,o.white),l("Regia vetro",518,684,1.7,1.6,.06,1.7,o.dark),h("Muro fonico",fe(105,380,1.6),fe(157,688,1.6),.07,o.white),d("Parete fonica",[[102,379],[110,379],[163,687],[155,689]],3.25,3.25,o.white),d("Garden parete",[[218,655],[228,655],[270,900],[263,901]],2.9,2.9,o.white),d("Garden parete fondo",[[264,896],[505,907],[504,917],[264,905]],2.9,2.9,o.white),Zr(i,fe,[[326,888],[278,885],[240,660]]),Zr(i,fe,[[250,705],[317,705]]),Zr(i,fe,[[267,801],[321,801]]),Zr(i,fe,[[472,774],[472,895],[410,895]]),d("Aiuola Gin XP sinistra",[[1091,429],[1143,601],[1084,616],[1080,459]],.06,.1,"#60734f"),d("Aiuola Gin XP ingresso",[[1083,650],[1146,633],[1164,679],[1150,716],[1093,692]],.06,.1,"#536e46");function te(T,D,V){let B=D.map(([ft,U],Xt)=>fe(ft,U,V[Xt])),Y=new xe().setFromPoints(B);Y.setIndex([0,1,2,0,2,3]),Y.computeVertexNormals();let tt=new le({color:o.light,roughness:.95,side:Ie}),rt=a(Y,tt,T);rt.castShadow=!1}te("Rampa ingresso divide i prati",[[570,946],[650,958],[760,655],[680,655]],[.8,.8,.6,.6]),d("Prato ingresso sinistro",[[505,909],[570,946],[680,655],[572,655]],.8,.84,o.grass),d("Prato ingresso destro",[[650,958],[925,1040],[1006,658],[760,655]],.8,.84,o.grass),d("Prato davanti ingresso Glitz Bar",[[573,660],[640,660],[570,934],[507,909]],.8,.84,o.grass),te("Raccordo ingresso Glitz Bar a prato",[[525,777],[592,795],[578,848],[511,830]],[.8,.8,.8,.8]),te("Rampa curva Riva Deck verso prato",[[979,257],[1007,257],[1007,478],[979,478]],[.05,.05,.6,.6]);function Jt(T,D,V,B){let Y=new Zt;Y.name=T,Y.position.copy(fe(D,V,.8)),Y.rotation.y=B,i.add(Y),c("Pannello dogato bianco",new A(0,.54,0),.14,1.08,2.45,o.white,Y),c("Top superiore legno",new A(0,1.11,0),.66,.07,2.55,o.wood,Y),c("Scrivania interna bianca operatori",new A(-.4,.77,0),.7,.06,2.35,o.white,Y);for(let tt=0;tt<17;tt++)c("Fuga doghe ingresso",new A(.073,.54,-1.18+tt*.14),.006,1.04,.007,"#c4c5bd",Y);for(let tt of[-1.12,1.12])c("Supporto scrivania",new A(-.65,.37,tt),.07,.74,.07,o.white,Y);for(let tt of[-.78,0,.78]){let rt=Ud();rt.position.set(-1.02,0,tt),rt.rotation.y=Math.PI/2,Y.add(rt)}return Y}let jt=fe(720,655).sub(fe(610,952)).normalize(),nt=new A(-jt.z,0,jt.x),ct=fe(665,803.5,.8),mt=Math.atan2(jt.x,jt.z);for(let[T,D]of[["Ingresso tavoli",-1],["Ingresso ticket",1]]){let V=Jt(T,0,0,mt+(D===-1?Math.PI:0));V.position.copy(ct).addScaledVector(nt,D*2.05),V.userData.alignedToEntranceRamp=!0}let Ft=fe(490,767,.81);for(let T=0;T<24;T++){let D=T*Math.PI/24,V=(T+1)*Math.PI/24;h("Pergola garden",Ft.clone().add(new A(Math.cos(D)*1.25,1.65+Math.sin(D)*.7,0)),Ft.clone().add(new A(Math.cos(V)*1.25,1.65+Math.sin(V)*.7,0)),.022,"#646550")}for(let T of[-1.25,1.25])h("Montante pergola",Ft.clone().add(new A(T,0,0)),Ft.clone().add(new A(T,1.65,0)),.025,"#646550");Bd(i,fe);function bt(T,D,V,B,Y){l(T,D,V,1.15,B,2.3,Y,"#e6e6de"),l(T+" tetto",D,V,2.34,B+.22,.08,Y+.2,"#e6e6de");let tt=T==="WC donne"?2:1;for(let rt=0;rt<tt;rt++){let ft=V+(rt-(tt-1)/2)*B*.42/ue;l(T+" porta bianca",D+Y/ue/2+.4,ft,1.1,.85,2.1,.035,"#f1f0e9"),l(T+" gradino",D+Y/ue/2+5,ft,.12,1,.24,.45,"#969b97"),l(T+" maniglia",D+Y/ue/2+1,ft-6,.98,.15,.025,.025,"#a7adae")}for(let rt=0;rt<14;rt++)l(T+" fuga tavole",D+Y/ue/2+.43,V,.15+rt*.155,B,.007,.01,"#cdd0c9")}bt("WC accessibile",1095,230,1.7,1.9),bt("WC donne",1005,980,4.2,6.5),bt("WC uomini",1413,1080,1.8,7.4);let Vt=[["Palco DJ",314,457,2.1],["Pista",461,404,.12],["Main Bar",936,613,1.9],["Bar",467,180,1.4],["Gin xp",1165,490,1.6],["Ingresso",610,958,1.1],["WC",1005,980,2.2]],F=[];for(let T of t){T.overlays=[],T.lines=[];for(let D of T.parts||[{coords:T.coords,y:T.y}]){let V=d("Area "+T.id,D.coords,D.y+.035,.006,new ei({color:"#edcb94",transparent:!0,opacity:0,depthWrite:!1,side:Ie}));V.userData.zoneId=T.id,V.castShadow=!1,V.receiveShadow=!1,F.push(V),T.overlays.push(V);let B=D.coords.map(tt=>fe(...tt,D.y+.045));B.push(B[0].clone());let Y=new hr(new xe().setFromPoints(B),new Cs({color:"#f9eed8",transparent:!0,opacity:0}));Y.name="Contorno "+T.id,i.add(Y),T.lines.push(Y)}}let L=Cd(fe);return i.add(L.root),{root:i,zones:t,tables:e,pickables:n,hotspots:F,pois:Vt,materials:s,arch:H,environment:L}}function kd(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new xe,l=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}c.setIndex(d)}for(let h in r){let d=Vd(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(let h in o){let d=o[h][0].length;if(d!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let y=0;y<o[h].length;++y)f.push(o[h][y][u]);let m=Vd(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}}return c}function Vd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ce(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let d=c/e;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<e;m++){let y=h.getComponent(u,m);a.setComponent(u+d,m,y)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Hd(i){i.root.updateMatrixWorld(!0);function t(n,s,r={}){let o=n.matrixWorld.clone().invert(),a=new Map;for(let c of s){if(Array.isArray(c.material))continue;let l=c.material.uuid,h=a.get(l);h||(h={material:c.material,meshes:[]},a.set(l,h)),h.meshes.push(c)}for(let c of a.values()){let l=[];for(let u of c.meshes){let f=u.geometry.clone();f.index&&(f=f.toNonIndexed()),f.attributes.normal||f.computeVertexNormals(),f.attributes.uv||f.setAttribute("uv",new Ce(new Float32Array(f.attributes.position.count*2),2));for(let m of Object.keys(f.attributes))["position","normal","uv","color"].includes(m)||f.deleteAttribute(m);f.applyMatrix4(o.clone().multiply(u.matrixWorld)),l.push(f)}let h=kd(l);if(!h)continue;let d=new ae(h,c.material);d.name=r.tableId?"TABLE_"+r.tableId+"_parts":"Architecture_"+c.material.color.getHexString(),d.userData={...r,components:[...new Set(c.meshes.map(u=>u.name))]},d.castShadow=!0,d.receiveShadow=!0,n.add(d);for(let u of c.meshes)u.removeFromParent();for(let u of l)u.dispose()}}let e=[];if(i.root.traverse(n=>{n.isMesh&&!n.userData.tableId&&!n.userData.zoneId&&!n.userData.sign&&!n.userData.archComponent&&e.push(n)}),t(i.root,e),i.arch)for(let n of[i.arch.truss,i.arch.equipment,i.arch.sign,i.arch.rear]){let s=[];n.traverse(r=>{r.isMesh&&s.push(r)}),t(n,s,{archComponent:!0})}i.pickables.length=0;for(let n of i.tables){let s=[];n.group.traverse(r=>{r.isMesh&&s.push(r)}),t(n.group,s,{tableId:n.id,zoneId:n.zoneId}),n.group.traverse(r=>{r.isMesh&&i.pickables.push(r)})}i.root.updateMatrixWorld(!0)}var qd=new URLSearchParams(location.search).get("embedded")==="1",Jr=null,ny=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Rt=i=>document.querySelector(i),ve=zd(),Ui=new Mi;qd&&(document.body.classList.add("embedded"),ve.tables.forEach(i=>i.status="unavailable"));Ui.background=new Ht("#000000");Ui.add(ve.root);var li=Rt("#map"),ui=new tc({canvas:li,antialias:!0,alpha:!1,preserveDrawingBuffer:!0});ui.setPixelRatio(Math.min(devicePixelRatio,2));ui.shadowMap.enabled=!0;ui.shadowMap.type=aa;ui.outputColorSpace=ke;ui.toneMapping=Fr;ui.toneMappingExposure=1.04;Ui.add(new Pr("#fff7e7","#6d7970",1.8));var Fi=new Ls("#fff1d7",2.6);Fi.position.set(-14,35,18);Fi.castShadow=!0;Fi.shadow.mapSize.set(2048,2048);Object.assign(Fi.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:1,far:110});Fi.shadow.bias=-4e-4;Fi.shadow.normalBias=.035;Ui.add(Fi);Ui.add(Fi.target);var Yd=new Ls("#c4dbe0",.8);Yd.position.set(20,15,-25);Ui.add(Yd);var Se=new Ci(-25,25,25,-25,.1,2200);Se.position.set(-36,48,54);var Ge=new sc(Se,li);Ge.target.set(0,0,0);Ge.enableDamping=!0;Ge.dampingFactor=.12;Ge.minPolarAngle=.08;Ge.maxPolarAngle=1.37;Ge.minZoom=.08;Ge.maxZoom=5;Ge.enablePan=!0;Ge.mouseButtons={LEFT:yn.ROTATE,MIDDLE:yn.DOLLY,RIGHT:yn.PAN};var cn=null,Je=null,en=null,ci=!1,hc=1,dh=[],Xs=null,Nn=!0,Kr=null,uh=new Lr,Gd=new ut;function iy(){let i=li.parentElement.getBoundingClientRect();ui.setSize(i.width,i.height,!1);let t=i.width/i.height,e=Math.max(40,47/t);Se.left=-e*t/2,Se.right=e*t/2,Se.top=e/2,Se.bottom=-e/2,Se.updateProjectionMatrix(),Nn=!0}new ResizeObserver(iy).observe(li.parentElement);function uc(i){hc=i,document.querySelectorAll(".step").forEach((t,e)=>{t.classList.toggle("active",e+1===i),t.classList.toggle("done",e+1<i)}),Rt("#back").hidden=i===1,Rt("#back").textContent=i===3?"\u2190 Torna al tavolo":"\u2190 Tutte le zone",Rt("#panel").classList.toggle("summary-mode",i===3)}function qs(i,t,e=!1){let n=Se.position.clone().sub(Ge.target);e&&(n=new A(-36,48,54)),ci&&(n=new A(.01,75,.01)),en={start:performance.now(),from:Se.position.clone(),to:i.clone().add(n),t0:Ge.target.clone(),t1:i.clone(),z0:Se.zoom,z1:t},Nn=!0}function Zd(){for(let i of ve.zones){let t=i.id===cn;i.overlays.forEach(e=>e.material.opacity=t?.14:0),i.lines.forEach(e=>e.material.opacity=t?1:0)}}function dc(){for(let i of ve.tables)i.group.traverse(t=>{t.isMesh&&t.userData.originalMaterial&&(t.material=t.userData.originalMaterial,delete t.userData.originalMaterial)})}function Jd(i){dc(),i&&i.group.traverse(t=>{t.isMesh&&(t.userData.originalMaterial=t.material,t.material=t.material.clone(),t.material.emissive=new Ht("#e10600"),t.material.emissiveIntensity=.18)})}function $r(){cn=null,Je=null,Kr=null,uc(1),Zd(),dc(),Rt("#panel-title").textContent="Scegli la tua zona.",Rt("#panel-kicker").textContent="IL CLUB, DA UN ALTRO PUNTO DI VISTA",Rt("#panel-content").innerHTML='<p class="intro">Dal palco al giardino: esplora gli spazi e trova il tuo salottino.</p><div class="source-note">Nomi e tavoli dalla tua piantina.<br>Arredi modellati sulle fotografie del Glitz.</div>',Rt("#panel-content").querySelectorAll("[data-zone]").forEach(i=>i.onclick=()=>Ys(i.dataset.zone)),Rt("#sticky-action").hidden=!1,Rt("#action").textContent="Prenota",Rt("#action").disabled=!0,Rt("#action").onclick=null,Rt("#action-note").textContent="Seleziona un tavolo sulla mappa",Rt("#map-caption").textContent="Tocca una zona per esplorarla",fc(),qs(new A(0,0,0),1,!0),Rt("#view-name").textContent="Vista generale"}function Kd(i){return{unconfigured:"Da verificare",available:"Disponibile",soldout:"Esaurito",unavailable:"Non disponibile"}[i.status]||"Da verificare"}function $d(i){return i.priceLabel?ny(i.priceLabel):Number.isFinite(i.minSpend)?new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(i.minSpend)+" min. tavolo":"Prezzo su richiesta"}function sy(){return`<div class="table-list">${ve.tables.filter(i=>i.zoneId===cn).map(i=>`<button data-table="${i.id}" class="table-chip ${i.id===Je?"selected":""}" ${["soldout","unavailable"].includes(i.status)?"disabled":""}><i class="dot ${i.status}"></i>${i.id}</button>`).join("")}</div>`}function ry(){document.querySelectorAll("[data-table]").forEach(i=>i.onclick=()=>hi(i.dataset.table))}function Ys(i,t=!0){let e=ve.zones.find(n=>n.id===i);if(e&&(cn=i,Je=null,Kr=null,uc(2),Zd(),dc(),Rt("#panel-kicker").textContent="SCEGLI IL TUO SALOTTINO",Rt("#panel-title").textContent=e.name,Rt("#panel-content").innerHTML=`<p class="intro">${e.description}</p>${sy()}<div id="table-detail" aria-live="polite"><div class="empty-detail"><span class="selection-icon">\u25CE</span><p>Tocca un indicatore sulla mappa<br>o scegli un ID qui sopra.</p></div></div><div class="source-note">Disposizione e codici dalla piantina fornita. Capienze e condizioni da configurare.</div>`,ry(),Rt("#sticky-action").hidden=!1,Rt("#action").textContent="Prenota",Rt("#action").disabled=!0,Rt("#action").onclick=null,Rt("#action-note").textContent="Seleziona un tavolo sulla mappa",Rt("#view-name").textContent=e.name,Rt("#map-caption").textContent="Seleziona un salottino",fc(),t)){let n=new zn().setFromPoints(e.coords.map(l=>fe(...l,e.y))),s=n.getCenter(new A),r=n.getSize(new A),o=Se.right-Se.left,a=Se.top-Se.bottom,c=Math.max(r.x,r.z);qs(s,Math.min(3.2,Math.max(1.4,Math.min(o,a)/(c*1.35)))),i==="glitzbar"&&!ci&&(en.to=s.clone().add(new A(14,24,14)))}}function hi(i){let t=ve.tables.find(e=>e.id===i);!t||["soldout","unavailable"].includes(t.status)||((cn!==t.zoneId||hc===3)&&Ys(t.zoneId,!1),Je=i,uc(2),Jd(t),document.querySelectorAll("[data-table]").forEach(e=>e.classList.toggle("selected",e.dataset.table===i)),Rt("#table-detail").innerHTML=`<div class="table-detail"><div class="row"><span class="eyebrow">IL TUO SALOTTINO</span><span class="status"><i class="dot ${t.status}"></i>${Kd(t)}</span></div><h3>${t.id}</h3><div class="table-data"><span>Condizioni</span><strong>${$d(t)}</strong><span>Ospiti</span><strong>${t.capacity?`Fino a ${t.capacity}`:"Capienza da confermare"}</strong></div></div>`,Rt("#sticky-action").hidden=!1,Rt("#action").disabled=!1,Rt("#action").textContent="Prenota",Rt("#action").onclick=()=>{Jr?t.status==="available"&&Jr(lc()):qd||oy()},Jr&&(Rt("#action").textContent="Prenota"),Rt("#action-note").textContent=Jr?"Apri il modulo \xB7 conferma dello staff via WhatsApp":`${ve.zones.find(e=>e.id===t.zoneId).name} \xB7 ${t.id} \xB7 Anteprima`,fc(),window.dispatchEvent(new CustomEvent("glitz:table-selected",{detail:lc()})),Nn=!0)}function lc(){let i=ve.tables.find(t=>t.id===Je);return i?{tableId:i.id,zoneId:i.zoneId,zone:ve.zones.find(t=>t.id===i.zoneId).name,guests:Kr?.guests??null,minSpend:i.minSpend,currency:"EUR",status:i.status,layoutConfirmedBySource:i.idConfirmedBySource!==!1,furnitureDimensionsEstimated:!0}:null}function oy(){if(!Je)return;let i=ve.tables.find(t=>t.id===Je);uc(3),Rt("#panel-kicker").textContent="LA TUA SCELTA",Rt("#panel-title").textContent="Una notte al Glitz.",Rt("#panel-content").innerHTML=`<div class="summary-card"><span class="eyebrow">${ve.zones.find(t=>t.id===i.zoneId).name}</span><h3>${i.id}</h3><p>${$d(i)}</p></div><label class="field-label" for="guests">QUANTI SIETE?</label><input id="guests" type="number" inputmode="numeric" min="1" ${i.capacity?`max="${i.capacity}"`:""} value="${Kr?.guests||5}" aria-describedby="guest-note"><p class="source-note" id="guest-note">Il numero di ospiti sar\xE0 da verificare con la capienza effettiva del tavolo.</p><div class="integration-note"><span>Anteprima della selezione</span><p>Disponibilit\xE0, pagamento e conferma non sono ancora collegati al sistema di prenotazione.</p></div>`,Rt("#action").textContent="Salva la selezione",Rt("#action").onclick=ay,Rt("#action-note").textContent="Scarica un riepilogo \xB7 nessuna prenotazione",Rt("#sticky-action").hidden=!1,fc()}function ay(){let i=Rt("#guests");if(!i.reportValidity())return;Kr={guests:Number(i.value)};let t=lc();cy(JSON.stringify(t,null,2),"glitz-selezione.json","application/json"),window.dispatchEvent(new CustomEvent("glitz:selection-confirmed",{detail:t})),Rt("#action-note").textContent="Riepilogo salvato. Nessuna prenotazione effettuata."}function cy(i,t,e){let n=new Blob([i],{type:e}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=t,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),2e3)}function fc(){jd();let i=Rt("#markers");i.replaceChildren(),dh=[];for(let t of ve.tables.filter(e=>!cn||e.zoneId===cn)){let e=document.createElement("button");e.className="table-marker "+t.status+(Je===t.id?" selected":""),e.innerHTML=`<i></i><span>${t.id}</span>`,e.disabled=["soldout","unavailable"].includes(t.status),e.setAttribute("aria-label",`Salottino ${t.id}, ${Kd(t)}`),e.onclick=()=>hi(t.id),i.append(e),dh.push({el:e,p:t.position})}Nn=!0}var Wd=0;function ly(i){if(i-Wd<25)return;Wd=i;let t=li.getBoundingClientRect();for(let e of dh){let n=e.p.clone().project(Se);e.el.style.transform=`translate(-50%,-100%) translate(${(n.x+1)/2*t.width}px,${(1-n.y)/2*t.height}px)`,e.el.style.visibility=n.z>1||n.z<-1||Math.abs(n.x)>1.12||Math.abs(n.y)>1.2?"hidden":"visible"}}li.addEventListener("pointerdown",i=>{Xs=[i.clientX,i.clientY]});li.addEventListener("pointerup",i=>{if(!Xs||Math.hypot(i.clientX-Xs[0],i.clientY-Xs[1])>6)return;Xs=null;let t=li.getBoundingClientRect();if(Gd.set((i.clientX-t.left)/t.width*2-1,-(i.clientY-t.top)/t.height*2+1),uh.setFromCamera(Gd,Se),cn){let n=uh.intersectObjects(ve.pickables.filter(s=>s.userData.zoneId===cn))[0];if(n){hi(n.object.userData.tableId);return}}let e=uh.intersectObjects(ve.hotspots)[0];e&&Ys(e.object.userData.zoneId)});li.addEventListener("pointercancel",()=>Xs=null);Ge.addEventListener("start",()=>{en=null});Ge.addEventListener("change",()=>Nn=!0);Rt("#back").onclick=()=>{if(hc===3){let i=Je;Ys(cn,!1),hi(i)}else $r()};Rt("#reset").onclick=()=>{ci=!1,Rt("#top").classList.remove("active"),$r()};Rt("#zoom-in").onclick=()=>{Se.zoom=Math.min(5,Se.zoom*1.2),Se.updateProjectionMatrix(),Nn=!0};Rt("#zoom-out").onclick=()=>{Se.zoom=Math.max(.08,Se.zoom/1.2),Se.updateProjectionMatrix(),Nn=!0};Rt("#top").onclick=()=>{ci=!ci,Rt("#top").classList.toggle("active",ci),qs(Ge.target.clone(),Se.zoom,!0)};Rt("#arch-view").onclick=()=>{Rt("#source-plan").hidden||Rt("#plan-toggle").click(),ci=!1,Rt("#top").classList.remove("active");let i=ve.arch.root.position.clone().add(new A(0,2,0));qs(i,3.5,!0),en.to=i.clone().add(new A(-7,5,18)),Rt("#view-name").textContent="L\u2019arco del Glitz",Rt("#map-caption").textContent="9 m di larghezza \xB7 5 m sopra la pista"};Rt("#garden-view").onclick=()=>{ci=!1,qs(ve.environment.gardenTarget,.85,!0),en.to=ve.environment.gardenTarget.clone().add(new A(-32,46,50))};Rt("#panorama-view").onclick=()=>{ci=!1,qs(ve.environment.panoramaTarget,.12,!0),en.to=ve.environment.panoramaTarget.clone().add(new A(-95,115,170))};Rt("#help").onclick=()=>Rt("#help-dialog").showModal();Rt("#close-help").onclick=()=>Rt("#help-dialog").close();function hy(i){if(!Array.isArray(i))throw Error("Inventory must be an array");for(let n of i){let s=ve.tables.find(r=>r.id===n.id);s&&(["available","soldout","unavailable","unconfigured"].includes(n.status)&&(s.status=n.status),typeof n.priceLabel=="string"&&(s.priceLabel=n.priceLabel),(n.minSpend===null||Number.isFinite(n.minSpend)&&n.minSpend>=0)&&(s.minSpend=n.minSpend),(n.capacity===null||Number.isInteger(n.capacity)&&n.capacity>0)&&(s.capacity=n.capacity))}let t=cn,e=Je;t?(Ys(t,!1),e&&hi(e)):$r(),Nn=!0}Hd(ve);var Ws=!1;function jd(){document.querySelectorAll("#plan-hits rect").forEach(i=>{i.classList.toggle("current",i.dataset.id===Je),i.style.opacity=cn&&i.dataset.zone!==cn?.28:1})}for(let i of oc.filter(t=>Array.isArray(t.schematicPosition))){let t=document.createElementNS("http://www.w3.org/2000/svg","rect");t.setAttribute("x",i.schematicPosition[0]-27),t.setAttribute("y",i.schematicPosition[1]-25),t.setAttribute("width",54),t.setAttribute("height",50),t.setAttribute("rx",3),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label","Seleziona "+i.id+" sulla piantina"),t.dataset.id=i.id,t.dataset.zone=i.zoneId,t.onclick=()=>hi(i.id),t.onkeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),hi(i.id))},Rt("#plan-hits").append(t)}Rt("#plan-toggle").onclick=()=>{Ws=!Ws,Rt("#source-plan").hidden=!Ws,Rt(".map-stage").classList.toggle("show-plan",Ws),Rt("#plan-toggle").classList.toggle("active",Ws),Rt("#plan-toggle").textContent=Ws?"Torna al 3D":"Pianta",jd()};window.GlitzMap={setBookingHandler:i=>{Jr=typeof i=="function"?i:null,Je&&hi(Je)},selectZone:Ys,selectTable:hi,reset:$r,getSelection:lc,getTables:()=>ve.tables.map(({group:i,position:t,...e})=>({...e,position:t.toArray()})),setInventory:hy,exportGLB:async()=>{dc(),ve.zones.forEach(t=>{t.overlays.forEach(e=>e.visible=!1),t.lines.forEach(e=>e.visible=!1)});let i=await new Ni().parseAsync(ve.root,{binary:!0,onlyVisible:!0});return ve.zones.forEach(t=>{t.overlays.forEach(e=>e.visible=!0),t.lines.forEach(e=>e.visible=!0)}),Je&&Jd(ve.tables.find(t=>t.id===Je)),i},getModelMetadata:()=>ve.root.userData};window.__glitz={model:ve,scene:Ui,camera:Se,renderer:ui,controls:Ge,get state(){return{step:hc,currentZone:cn,currentTable:Je}},ready:!0};$r();var Xd=0;function Qd(i){if(requestAnimationFrame(Qd),en){let t=Math.min(1,(i-en.start)/650),e=1-Math.pow(1-t,3);Se.position.lerpVectors(en.from,en.to,e),Ge.target.lerpVectors(en.t0,en.t1,e),Se.zoom=ii.lerp(en.z0,en.z1,e),Se.updateProjectionMatrix(),t===1&&(en=null),Nn=!0}Ge.update(),(Nn||Xd<5)&&(ui.render(Ui,Se),ly(i),Nn=!1,Xd++)}requestAnimationFrame(Qd);Rt("#loading").remove();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
