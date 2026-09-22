(()=>{var yn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ri={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},iu=0,Qc=1,su=2;var Ur=1,ca=2,Us=3,Pi=0,tn=1,Ce=2,Vn=0,Fs=1,tl=2,el=3,nl=4,ru=5;var Zi=100,ou=101,au=102,cu=103,lu=104,hu=200,uu=201,du=202,fu=203,il=204,sl=205,pu=206,mu=207,gu=208,_u=209,xu=210,yu=211,vu=212,Mu=213,Su=214,Ao=0,Co=1,Ro=2,_s=3,Po=4,Io=5,Lo=6,Do=7,rl=0,bu=1,Eu=2,Rn=0,ol=1,al=2,cl=3,Fr=4,ll=5,hl=6,ul=7;var dl=300,Ii=301,Ji=302,la=303,ha=304,Br=306,xs=1e3,xn=1001,ys=1002,Ue=1003,ua=1004;var Ki=1005;var Fe=1006,Bs=1007;var kn=1008;var rn=1009,fl=1010,pl=1011,Os=1012,da=1013,Pn=1014,In=1015,Ln=1016,fa=1017,pa=1018,zs=1020,ml=35902,gl=35899,_l=1021,xl=1022,on=1023,On=1026,Li=1027,yl=1028,ma=1029,Di=1030,ga=1031;var _a=1033,Or=33776,zr=33777,Vr=33778,kr=33779,xa=35840,ya=35841,va=35842,Ma=35843,Sa=36196,ba=37492,Ea=37496,Ta=37488,wa=37489,Hr=37490,Aa=37491,Ca=37808,Ra=37809,Pa=37810,Ia=37811,La=37812,Da=37813,Na=37814,Ua=37815,Fa=37816,Ba=37817,Oa=37818,za=37819,Va=37820,ka=37821,Ha=36492,Ga=36494,Wa=36495,Xa=36283,qa=36284,Gr=36285,Ya=36286;var Gi=2300,vs=2301,To=2302,Hc=2303,Gc=2400,Wc=2401,Xc=2402;var Tu=3200;var Za=0,wu=1,Dn="",ke="srgb",sr="srgb-linear",rr="linear",xe="srgb";var wo=7680;var Au=519,Cu=512,Ru=513,Pu=514,Ja=515,Iu=516,Lu=517,Ka=518,Du=519,Nu=35044;var vl="300 es",Tn=2e3,Ms=2001;function lf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function hf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function or(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Uu(){let i=or("canvas");return i.style.display="block",i}var Eh={},Ss=null;function Ml(...i){let t="THREE."+i.shift();Ss?Ss("log",t,...i):console.log(t,...i)}function Fu(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Gt(...i){i=Fu(i);let t="THREE."+i.shift();if(Ss)Ss("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=Fu(i);let t="THREE."+i.shift();if(Ss)Ss("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Hi(...i){let t=i.join(" ");t in Eh||(Eh[t]=!0,Gt(...i))}function Bu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Ou={[Ao]:Co,[Ro]:Lo,[Po]:Do,[_s]:Io,[Co]:Ao,[Lo]:Ro,[Do]:Po,[Io]:_s},An=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Th=1234567,tr=Math.PI/180,bs=180/Math.PI;function $i(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function Qt(i,t,e){return Math.max(t,Math.min(e,i))}function Sl(i,t){return(i%t+t)%t}function uf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function df(i,t,e){return i!==t?(e-i)/(t-i):0}function er(i,t,e){return(1-e)*i+e*t}function ff(i,t,e,n){return er(i,t,1-Math.exp(-e*n))}function pf(i,t=1){return t-Math.abs(Sl(i,t*2)-t)}function mf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function gf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function _f(i,t){return i+Math.floor(Math.random()*(t-i+1))}function xf(i,t){return i+Math.random()*(t-i)}function yf(i){return i*(.5-Math.random())}function vf(i){i!==void 0&&(Th=i);let t=Th+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Mf(i){return i*tr}function Sf(i){return i*bs}function bf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ef(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Tf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function wf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:Gt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $e(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ii={DEG2RAD:tr,RAD2DEG:bs,generateUUID:$i,clamp:Qt,euclideanModulo:Sl,mapLinear:uf,inverseLerp:df,lerp:er,damp:ff,pingpong:pf,smoothstep:mf,smootherstep:gf,randInt:_f,randFloat:xf,randFloatSpread:yf,seededRandom:vf,degToRad:Mf,radToDeg:Sf,isPowerOfTwo:bf,ceilPowerOfTwo:Ef,floorPowerOfTwo:Tf,setQuaternionFromProperEuler:wf,normalize:$e,denormalize:ms},ut=class i{static{i.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(u!==y||c!==d||l!==f||h!==m){let g=c*d+l*f+h*m+u*y;g<0&&(d=-d,f=-f,m=-m,y=-y,g=-g);let p=1-a;if(g<.9995){let E=Math.acos(g),C=Math.sin(E);p=Math.sin(p*E)/C,a=Math.sin(a*E)/C,c=c*p+d*a,l=l*p+f*a,h=h*p+m*a,u=u*p+y*a}else{c=c*p+d*a,l=l*p+f*a,h=h*p+m*a,u=u*p+y*a;let E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*f-l*d,t[e+1]=c*m+h*d+l*u-a*f,t[e+2]=l*m+h*f+a*d-c*u,t[e+3]=h*m-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-e;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class i{static{i.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _c.copy(this).projectOnVector(t),this.sub(_c)}reflect(t){return this.sub(_c.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_c=new R,wh=new je,Kt=class i{static{i.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],y=s[0],g=s[3],p=s[6],E=s[1],C=s[4],_=s[7],T=s[2],v=s[5],b=s[8];return r[0]=o*y+a*E+c*T,r[3]=o*g+a*C+c*v,r[6]=o*p+a*_+c*b,r[1]=l*y+h*E+u*T,r[4]=l*g+h*C+u*v,r[7]=l*p+h*_+u*b,r[2]=d*y+f*E+m*T,r[5]=d*g+f*C+m*v,r[8]=d*p+f*_+m*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=u*y,t[1]=(s*l-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=d*y,t[4]=(h*e-s*c)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*c-l*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return Hi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xc.makeScale(t,e)),this}rotate(t){return Hi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xc.makeRotation(-t)),this}translate(t,e){return Hi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},xc=new Kt,Ah=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ch=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Af(){let i={enabled:!0,workingColorSpace:sr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===xe&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===xe&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Dn?rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Hi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Hi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[sr]:{primaries:t,whitePoint:n,transfer:rr,toXYZ:Ah,fromXYZ:Ch,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:n,transfer:xe,toXYZ:Ah,fromXYZ:Ch,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),i}var oe=Af();function $n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ns,Es=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ns===void 0&&(ns=or("canvas")),ns.width=t.width,ns.height=t.height;let s=ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=or("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=$n(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($n(e[n]/255)*255):e[n]=$n(e[n]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Cf=0,jn=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=$i(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yc(s[o].image)):r.push(yc(s[o]))}else r=yc(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function yc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Es.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}var Rf=0,vc=new R,Qe=class i extends An{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=xn,s=xn,r=Fe,o=kn,a=on,c=rn,l=i.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=$i(),this.name="",this.source=new jn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vc).x}get height(){return this.source.getSize(vc).y}get depth(){return this.source.getSize(vc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xs:t.x=t.x-Math.floor(t.x);break;case xn:t.x=t.x<0?0:1;break;case ys:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xs:t.y=t.y-Math.floor(t.y);break;case xn:t.y=t.y<0?0:1;break;case ys:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=dl;Qe.DEFAULT_ANISOTROPY=1;var Pe=class i{static{i.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],y=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let C=(l+1)/2,_=(f+1)/2,T=(p+1)/2,v=(h+d)/4,b=(u+y)/4,x=(m+g)/4;return C>_&&C>T?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=v/n,r=b/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=v/s,r=x/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=b/r,s=x/r),this.set(n,s,r,e),this}let E=Math.sqrt((g-m)*(g-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(u-y)/E,this.z=(d-h)/E,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},No=class extends An{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new Qe(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Fe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new jn(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},sn=class extends No{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ar=class extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Uo=class extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var ue=class i{static{i.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,m,y,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,m,y,g)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,m,y,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=y,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/is.setFromMatrixColumn(t,0).length(),r=1/is.setFromMatrixColumn(t,1).length(),o=1/is.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+m*l,e[5]=d-y*l,e[9]=-a*c,e[2]=y-d*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,f=c*u,m=l*h,y=l*u;e[0]=d+y*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=y+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,f=c*u,m=l*h,y=l*u;e[0]=d-y*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=c*h,e[4]=m*l-f,e[8]=d*l+y,e[1]=c*u,e[5]=y*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,f=o*l,m=a*c,y=a*l;e[0]=c*h,e[4]=y-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+m,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*c,f=o*l,m=a*c,y=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+y,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pf,t,If)}lookAt(t,e,n){let s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),mi.crossVectors(n,ln),mi.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),mi.crossVectors(n,ln)),mi.normalize(),eo.crossVectors(ln,mi),s[0]=mi.x,s[4]=eo.x,s[8]=ln.x,s[1]=mi.y,s[5]=eo.y,s[9]=ln.y,s[2]=mi.z,s[6]=eo.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],y=n[6],g=n[10],p=n[14],E=n[3],C=n[7],_=n[11],T=n[15],v=s[0],b=s[4],x=s[8],P=s[12],D=s[1],U=s[5],V=s[9],W=s[13],F=s[2],k=s[6],Q=s[10],Y=s[14],rt=s[3],et=s[7],st=s[11],it=s[15];return r[0]=o*v+a*D+c*F+l*rt,r[4]=o*b+a*U+c*k+l*et,r[8]=o*x+a*V+c*Q+l*st,r[12]=o*P+a*W+c*Y+l*it,r[1]=h*v+u*D+d*F+f*rt,r[5]=h*b+u*U+d*k+f*et,r[9]=h*x+u*V+d*Q+f*st,r[13]=h*P+u*W+d*Y+f*it,r[2]=m*v+y*D+g*F+p*rt,r[6]=m*b+y*U+g*k+p*et,r[10]=m*x+y*V+g*Q+p*st,r[14]=m*P+y*W+g*Y+p*it,r[3]=E*v+C*D+_*F+T*rt,r[7]=E*b+C*U+_*k+T*et,r[11]=E*x+C*V+_*Q+T*st,r[15]=E*P+C*W+_*Y+T*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],y=t[7],g=t[11],p=t[15],E=c*f-l*d,C=a*f-l*u,_=a*d-c*u,T=o*f-l*h,v=o*d-c*h,b=o*u-a*h;return e*(y*E-g*C+p*_)-n*(m*E-g*T+p*v)+s*(m*C-y*T+p*b)-r*(m*_-y*v+g*b)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],c=t[2],l=t[6],h=t[10];return e*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],y=t[13],g=t[14],p=t[15],E=e*a-n*o,C=e*c-s*o,_=e*l-r*o,T=n*c-s*a,v=n*l-r*a,b=s*l-r*c,x=h*y-u*m,P=h*g-d*m,D=h*p-f*m,U=u*g-d*y,V=u*p-f*y,W=d*p-f*g,F=E*W-C*V+_*U+T*D-v*P+b*x;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/F;return t[0]=(a*W-c*V+l*U)*k,t[1]=(s*V-n*W-r*U)*k,t[2]=(y*b-g*v+p*T)*k,t[3]=(d*v-u*b-f*T)*k,t[4]=(c*D-o*W-l*P)*k,t[5]=(e*W-s*D+r*P)*k,t[6]=(g*_-m*b-p*C)*k,t[7]=(h*b-d*_+f*C)*k,t[8]=(o*V-a*D+l*x)*k,t[9]=(n*D-e*V-r*x)*k,t[10]=(m*v-y*_+p*E)*k,t[11]=(u*_-h*v-f*E)*k,t[12]=(a*P-o*U-c*x)*k,t[13]=(e*U-n*P+s*x)*k,t[14]=(y*C-m*T-g*E)*k,t[15]=(h*T-u*C+d*E)*k,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,m=r*u,y=o*h,g=o*u,p=a*u,E=c*l,C=c*h,_=c*u,T=n.x,v=n.y,b=n.z;return s[0]=(1-(y+p))*T,s[1]=(f+_)*T,s[2]=(m-C)*T,s[3]=0,s[4]=(f-_)*v,s[5]=(1-(d+p))*v,s[6]=(g+E)*v,s[7]=0,s[8]=(m+C)*b,s[9]=(g-E)*b,s[10]=(1-(d+y))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=is.set(s[0],s[1],s[2]).length(),a=is.set(s[4],s[5],s[6]).length(),c=is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Sn.copy(this);let l=1/o,h=1/a,u=1/c;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,e.setFromRotationMatrix(Sn),n.x=o,n.y=a,n.z=c,this}makePerspective(t,e,n,s,r,o,a=Tn,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),m,y;if(c)m=r/(o-r),y=o*r/(o-r);else if(a===Tn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Ms)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Tn,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s),m,y;if(c)m=1/(o-r),y=o/(o-r);else if(a===Tn)m=-2/(o-r),y=-(o+r)/(o-r);else if(a===Ms)m=-1/(o-r),y=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},is=new R,Sn=new ue,Pf=new R(0,0,0),If=new R(1,1,1),mi=new R,eo=new R,ln=new R,Rh=new ue,Ph=new je,Qn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ph.setFromEuler(this),this.setFromQuaternion(Ph,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var Ts=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Lf=0,Ih=new R,ss=new je,qn=new ue,no=new R,Zs=new R,Df=new R,Nf=new je,Lh=new R(1,0,0),Dh=new R(0,1,0),Nh=new R(0,0,1),Uh={type:"added"},Uf={type:"removed"},rs={type:"childadded",child:null},Mc={type:"childremoved",child:null},He=class i extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new R,e=new Qn,n=new je,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new Kt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ts,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(Lh,t)}rotateY(t){return this.rotateOnAxis(Dh,t)}rotateZ(t){return this.rotateOnAxis(Nh,t)}translateOnAxis(t,e){return Ih.copy(t).applyQuaternion(this.quaternion),this.position.add(Ih.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Lh,t)}translateY(t){return this.translateOnAxis(Dh,t)}translateZ(t){return this.translateOnAxis(Nh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?no.copy(t):no.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Zs,no,this.up):qn.lookAt(no,Zs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(qn),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uh),rs.child=t,this.dispatchEvent(rs),rs.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Uf),Mc.child=t,this.dispatchEvent(Mc),Mc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uh),rs.child=t,this.dispatchEvent(rs),rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,Df),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,Nf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};He.DEFAULT_UP=new R(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zt=class extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ff={type:"move"},ws=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let y of t.hand.values()){let g=e.getJointPose(y,n),p=this._getHandJoint(l,y);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ff)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Zt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},zu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},io={h:0,s:0,l:0};function Sc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=Sl(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Sc(o,r,t+1/3),this.g=Sc(o,r,t),this.b=Sc(o,r,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let n=zu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$n(t.r),this.g=$n(t.g),this.b=$n(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return oe.workingToColorSpace(qe.copy(this),t),Math.round(Qt(qe.r*255,0,255))*65536+Math.round(Qt(qe.g*255,0,255))*256+Math.round(Qt(qe.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.workingToColorSpace(qe.copy(this),e);let n=qe.r,s=qe.g,r=qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.workingToColorSpace(qe.copy(this),e),t.r=qe.r,t.g=qe.g,t.b=qe.b,t}getStyle(t=ke){oe.workingToColorSpace(qe.copy(this),t);let e=qe.r,n=qe.g,s=qe.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(gi),this.setHSL(gi.h+t,gi.s+e,gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(gi),t.getHSL(io);let n=er(gi.h,io.h,e),s=er(gi.s,io.s,e),r=er(gi.l,io.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qe=new Wt;Wt.NAMES=zu;var Mi=class extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},bn=new R,Yn=new R,bc=new R,Zn=new R,os=new R,as=new R,Fh=new R,Ec=new R,Tc=new R,wc=new R,Ac=new Pe,Cc=new Pe,Rc=new Pe,vi=class i{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),bn.subVectors(t,e),s.cross(bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){bn.subVectors(s,e),Yn.subVectors(n,e),bc.subVectors(t,e);let o=bn.dot(bn),a=bn.dot(Yn),c=bn.dot(bc),l=Yn.dot(Yn),h=Yn.dot(bc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ac.setScalar(0),Cc.setScalar(0),Rc.setScalar(0),Ac.fromBufferAttribute(t,e),Cc.fromBufferAttribute(t,n),Rc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ac,r.x),o.addScaledVector(Cc,r.y),o.addScaledVector(Rc,r.z),o}static isFrontFacing(t,e,n,s){return bn.subVectors(n,e),Yn.subVectors(t,e),bn.cross(Yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return bn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),bn.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;os.subVectors(s,n),as.subVectors(r,n),Ec.subVectors(t,n);let c=os.dot(Ec),l=as.dot(Ec);if(c<=0&&l<=0)return e.copy(n);Tc.subVectors(t,s);let h=os.dot(Tc),u=as.dot(Tc);if(h>=0&&u<=h)return e.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(os,o);wc.subVectors(t,r);let f=os.dot(wc),m=as.dot(wc);if(m>=0&&f<=m)return e.copy(r);let y=f*l-c*m;if(y<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(as,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Fh.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Fh,a);let p=1/(g+y+d);return o=y*p,a=d*p,e.copy(n).addScaledVector(os,o).addScaledVector(as,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},zn=class{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),so.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),so.copy(n.boundingBox)),so.applyMatrix4(t.matrixWorld),this.union(so)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Js),ro.subVectors(this.max,Js),cs.subVectors(t.a,Js),ls.subVectors(t.b,Js),hs.subVectors(t.c,Js),_i.subVectors(ls,cs),xi.subVectors(hs,ls),Oi.subVectors(cs,hs);let e=[0,-_i.z,_i.y,0,-xi.z,xi.y,0,-Oi.z,Oi.y,_i.z,0,-_i.x,xi.z,0,-xi.x,Oi.z,0,-Oi.x,-_i.y,_i.x,0,-xi.y,xi.x,0,-Oi.y,Oi.x,0];return!Pc(e,cs,ls,hs,ro)||(e=[1,0,0,0,1,0,0,0,1],!Pc(e,cs,ls,hs,ro))?!1:(oo.crossVectors(_i,xi),e=[oo.x,oo.y,oo.z],Pc(e,cs,ls,hs,ro))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Jn=[new R,new R,new R,new R,new R,new R,new R,new R],En=new R,so=new zn,cs=new R,ls=new R,hs=new R,_i=new R,xi=new R,Oi=new R,Js=new R,ro=new R,oo=new R,zi=new R;function Pc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){zi.fromArray(i,r);let a=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),c=t.dot(zi),l=e.dot(zi),h=n.dot(zi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Ne=new R,ao=new ut,Bf=0,Re=class extends An{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Nu,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ao.fromBufferAttribute(this,e),ao.applyMatrix3(t),this.setXY(e,ao.x,ao.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ms(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ms(e,this.array)),e}setX(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ms(e,this.array)),e}setY(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ms(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ms(e,this.array)),e}setW(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var cr=class extends Re{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var lr=class extends Re{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Jt=class extends Re{constructor(t,e,n){super(new Float32Array(t),e,n)}},Of=new zn,Ks=new R,Ic=new R,Wi=class{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Of.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ks.subVectors(t,this.center);let e=Ks.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ks,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ic.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ks.copy(t.center).add(Ic)),this.expandByPoint(Ks.copy(t.center).sub(Ic))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},zf=0,_n=new ue,Lc=new He,us=new R,hn=new zn,$s=new zn,Ve=new R,he=class i extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(lf(t)?lr:cr)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,n){return _n.makeTranslation(t,e,n),this.applyMatrix4(_n),this}scale(t,e,n){return _n.makeScale(t,e,n),this.applyMatrix4(_n),this}lookAt(t){return Lc.lookAt(t),Lc.updateMatrix(),this.applyMatrix4(Lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Jt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];$s.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(hn.min,$s.min),hn.expandByPoint(Ve),Ve.addVectors(hn.max,$s.max),hn.expandByPoint(Ve)):(hn.expandByPoint($s.min),hn.expandByPoint($s.max))}hn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ve));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ve.fromBufferAttribute(a,l),c&&(us.fromBufferAttribute(t,l),Ve.add(us)),s=Math.max(s,n.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Re(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new R,c[x]=new R;let l=new R,h=new R,u=new R,d=new ut,f=new ut,m=new ut,y=new R,g=new R;function p(x,P,D){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,P),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,x),f.fromBufferAttribute(r,P),m.fromBufferAttribute(r,D),h.sub(l),u.sub(l),f.sub(d),m.sub(d);let U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(y.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(U),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),a[x].add(y),a[P].add(y),a[D].add(y),c[x].add(g),c[P].add(g),c[D].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let x=0,P=E.length;x<P;++x){let D=E[x],U=D.start,V=D.count;for(let W=U,F=U+V;W<F;W+=3)p(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let C=new R,_=new R,T=new R,v=new R;function b(x){T.fromBufferAttribute(s,x),v.copy(T);let P=a[x];C.copy(P),C.sub(T.multiplyScalar(T.dot(P))).normalize(),_.crossVectors(v,P);let U=_.dot(c[x])<0?-1:1;o.setXYZW(x,C.x,C.y,C.z,U)}for(let x=0,P=E.length;x<P;++x){let D=E[x],U=D.start,V=D.count;for(let W=U,F=U+V;W<F;W+=3)b(t.getX(W+0)),b(t.getX(W+1)),b(t.getX(W+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Re(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new R,r=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),y=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,m=0;for(let y=0,g=c.length;y<g;y++){a.isInterleavedBufferAttribute?f=c[y]*a.data.stride+a.offset:f=c[y]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Re(d,h,u)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Dc=new R,Vf=new R,kf=new Kt,un=class{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Dc.subVectors(n,e).cross(Vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Dc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||kf.getNormalMatrix(t),s=this.coplanarPoint(Dc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Hf=0,ti=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=Fs,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=il,this.blendDst=sl,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=_s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Au,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wo,this.stencilZFail=wo,this.stencilZPass=wo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new un().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Kn=new R,Nc=new R,co=new R,lo=new R,Si=class{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Nc.copy(t).add(e).multiplyScalar(.5),co.copy(e).sub(t).normalize(),lo.copy(this.origin).sub(Nc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(co),a=lo.dot(this.direction),c=-lo.dot(co),l=lo.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=r*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Nc).addScaledVector(co,d),f}intersectSphere(t,e){if(t.radius<0)return null;Kn.subVectors(t.center,this.origin);let n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=t.x-o.x,d=t.y-o.y,f=t.z-o.z,m=e.x-o.x,y=e.y-o.y,g=e.z-o.z,p=n.x-o.x,E=n.y-o.y,C=n.z-o.z,_=Math.abs(c),T=Math.abs(l),v=Math.abs(h),b,x,P,D,U,V,W,F,k,Q,Y,rt;if(_>=T&&_>=v?(P=c,V=u,k=m,rt=p,c>=0?(b=l,x=h,D=d,U=f,W=y,F=g,Q=E,Y=C):(b=h,x=l,D=f,U=d,W=g,F=y,Q=C,Y=E)):T>=v?(P=l,V=d,k=y,rt=E,l>=0?(b=h,x=c,D=f,U=u,W=g,F=m,Q=C,Y=p):(b=c,x=h,D=u,U=f,W=m,F=g,Q=p,Y=C)):(P=h,V=f,k=g,rt=C,h>=0?(b=c,x=l,D=u,U=d,W=m,F=y,Q=p,Y=E):(b=l,x=c,D=d,U=u,W=y,F=m,Q=E,Y=p)),P===0)return null;let et=b/P,st=x/P,it=1/P,bt=D-et*V,vt=U-st*V,Ut=W-et*k,zt=F-st*k,te=Q-et*rt,nt=Y-st*rt,ct=te*zt-nt*Ut,xt=bt*nt-vt*te,Ot=Ut*vt-zt*bt;if(s){if(ct<0||xt<0||Ot<0)return null}else if((ct<0||xt<0||Ot<0)&&(ct>0||xt>0||Ot>0))return null;let Tt=ct+xt+Ot;if(Tt===0)return null;let Ht=it*(ct*V+xt*k+Ot*rt);return(Tt>0?Ht<0:Ht>0)?null:this.at(Ht/Tt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ei=class extends ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Bh=new ue,Vi=new Si,ho=new Wi,Oh=new R,uo=new R,fo=new R,po=new R,Uc=new R,mo=new R,zh=new R,go=new R,ae=class extends He{constructor(t=new he,e=new ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){mo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Uc.fromBufferAttribute(u,t),o?mo.addScaledVector(Uc,h):mo.addScaledVector(Uc.sub(e),h))}e.add(mo)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(r),Vi.copy(t.ray).recast(t.near),!(ho.containsPoint(Vi.origin)===!1&&(Vi.intersectSphere(ho,Oh)===null||Vi.origin.distanceToSquared(Oh)>(t.far-t.near)**2))&&(Bh.copy(r).invert(),Vi.copy(t.ray).applyMatrix4(Bh),!(n.boundingBox!==null&&Vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Vi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=o[g.materialIndex],E=Math.max(g.start,f.start),C=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=E,T=C;_<T;_+=3){let v=a.getX(_),b=a.getX(_+1),x=a.getX(_+2);s=_o(this,p,t,n,l,h,u,v,b,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let E=a.getX(g),C=a.getX(g+1),_=a.getX(g+2);s=_o(this,o,t,n,l,h,u,E,C,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let g=d[m],p=o[g.materialIndex],E=Math.max(g.start,f.start),C=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=E,T=C;_<T;_+=3){let v=_,b=_+1,x=_+2;s=_o(this,p,t,n,l,h,u,v,b,x),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let g=m,p=y;g<p;g+=3){let E=g,C=g+1,_=g+2;s=_o(this,o,t,n,l,h,u,E,C,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function Gf(i,t,e,n,s,r,o,a){let c;if(t.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Pi,a),c===null)return null;go.copy(a),go.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(go);return l<e.near||l>e.far?null:{distance:l,point:go.clone(),object:i}}function _o(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,uo),i.getVertexPosition(c,fo),i.getVertexPosition(l,po);let h=Gf(i,t,e,n,uo,fo,po,zh);if(h){let u=new R;vi.getBarycoord(zh,uo,fo,po,u),s&&(h.uv=vi.getInterpolatedAttribute(s,a,c,l,u,new ut)),r&&(h.uv1=vi.getInterpolatedAttribute(r,a,c,l,u,new ut)),o&&(h.normal=vi.getInterpolatedAttribute(o,a,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new R,materialIndex:0};vi.getNormal(uo,fo,po,d.normal),h.face=d,h.barycoord=u}return h}var Fo=class extends Qe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=Ue,h=Ue,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ki=new Wi,Wf=new ut(.5,.5),xo=new R,As=class{constructor(t=new un,e=new un,n=new un,s=new un,r=new un,o=new un){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],y=r[9],g=r[10],p=r[11],E=r[12],C=r[13],_=r[14],T=r[15];if(s[0].setComponents(l-o,f-h,p-m,T-E).normalize(),s[1].setComponents(l+o,f+h,p+m,T+E).normalize(),s[2].setComponents(l+a,f+u,p+y,T+C).normalize(),s[3].setComponents(l-a,f-u,p-y,T-C).normalize(),n)s[4].setComponents(c,d,g,_).normalize(),s[5].setComponents(l-c,f-d,p-g,T-_).normalize();else if(s[4].setComponents(l-c,f-d,p-g,T-_).normalize(),e===Tn)s[5].setComponents(l+c,f+d,p+g,T+_).normalize();else if(e===Ms)s[5].setComponents(c,d,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(t){ki.center.set(0,0,0);let e=Wf.distanceTo(t.center);return ki.radius=.7071067811865476+e,ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(xo.x=s.normal.x>0?t.max.x:t.min.x,xo.y=s.normal.y>0?t.max.y:t.min.y,xo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(xo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Cs=class extends ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Bo=new R,Oo=new R,Vh=new ue,js=new Si,yo=new Wi,Fc=new R,kh=new R,hr=class extends He{constructor(t=new he,e=new Cs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Bo.fromBufferAttribute(e,s-1),Oo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Bo.distanceTo(Oo);t.setAttribute("lineDistance",new Jt(n,1))}else Gt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(s),yo.radius+=r,t.ray.intersectsSphere(yo)===!1)return;Vh.copy(s).invert(),js.copy(t.ray).applyMatrix4(Vh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=h.getX(y),E=h.getX(y+1),C=vo(this,t,js,c,p,E,y);C&&e.push(C)}if(this.isLineLoop){let y=h.getX(m-1),g=h.getX(f),p=vo(this,t,js,c,y,g,m-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let y=f,g=m-1;y<g;y+=l){let p=vo(this,t,js,c,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){let y=vo(this,t,js,c,m-1,f,m-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function vo(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(Bo.fromBufferAttribute(a,s),Oo.fromBufferAttribute(a,r),e.distanceSqToSegment(Bo,Oo,Fc,kh)>n)return;Fc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Fc);if(!(l<t.near||l>t.far))return{distance:l,point:kh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var bi=class extends Qe{constructor(t,e,n,s,r,o,a,c,l,h,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}};var ur=class extends Qe{constructor(t=[],e=Ii,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Ei=class extends Qe{constructor(t,e,n=Pn,s,r,o,a=Ue,c=Ue,l,h=On,u=1){if(h!==On&&h!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new jn(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},zo=class extends Ei{constructor(t,e=Pn,n=Ii,s,r,o=Ue,a=Ue,c,l=On){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},dr=class extends Qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ye=class i extends he{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2));function m(y,g,p,E,C,_,T,v,b,x,P){let D=_/b,U=T/x,V=_/2,W=T/2,F=v/2,k=b+1,Q=x+1,Y=0,rt=0,et=new R;for(let st=0;st<Q;st++){let it=st*U-W;for(let bt=0;bt<k;bt++){let vt=bt*D-V;et[y]=vt*E,et[g]=it*C,et[p]=F,l.push(et.x,et.y,et.z),et[y]=0,et[g]=0,et[p]=v>0?1:-1,h.push(et.x,et.y,et.z),u.push(bt/b),u.push(1-st/x),Y+=1}}for(let st=0;st<x;st++)for(let it=0;it<b;it++){let bt=d+it+k*st,vt=d+it+k*(st+1),Ut=d+(it+1)+k*(st+1),zt=d+(it+1)+k*st;c.push(bt,vt,zt),c.push(vt,Ut,zt),rt+=6}a.addGroup(f,rt,P),f+=rt,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var we=class i extends he{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,y=[],g=n/2,p=0;E(),o===!1&&(t>0&&C(!0),e>0&&C(!1)),this.setIndex(h),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(d,3)),this.setAttribute("uv",new Jt(f,2));function E(){let _=new R,T=new R,v=0,b=(e-t)/n;for(let x=0;x<=r;x++){let P=[],D=x/r,U=D*(e-t)+t;for(let V=0;V<=s;V++){let W=V/s,F=W*c+a,k=Math.sin(F),Q=Math.cos(F);T.x=U*k,T.y=-D*n+g,T.z=U*Q,u.push(T.x,T.y,T.z),_.set(k,b,Q).normalize(),d.push(_.x,_.y,_.z),f.push(W,1-D),P.push(m++)}y.push(P)}for(let x=0;x<s;x++)for(let P=0;P<r;P++){let D=y[P][x],U=y[P+1][x],V=y[P+1][x+1],W=y[P][x+1];(t>0||P!==0)&&(h.push(D,U,W),v+=3),(e>0||P!==r-1)&&(h.push(U,V,W),v+=3)}l.addGroup(p,v,0),p+=v}function C(_){let T=m,v=new ut,b=new R,x=0,P=_===!0?t:e,D=_===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,g*D,0),d.push(0,D,0),f.push(.5,.5),m++;let U=m;for(let V=0;V<=s;V++){let F=V/s*c+a,k=Math.cos(F),Q=Math.sin(F);b.x=P*Q,b.y=g*D,b.z=P*k,u.push(b.x,b.y,b.z),d.push(0,D,0),v.x=k*.5+.5,v.y=Q*.5*D+.5,f.push(v.x,v.y),m++}for(let V=0;V<s;V++){let W=T+V,F=U+V;_===!0?h.push(F,F+1,W):h.push(F+1,F,W),x+=3}l.addGroup(p,x,_===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var fr=class i extends he{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){let C=new R,_=new R,T=new R;for(let v=0;v<e.length;v+=3)f(e[v+0],C),f(e[v+1],_),f(e[v+2],T),c(C,_,T,E)}function c(E,C,_,T){let v=T+1,b=[];for(let x=0;x<=v;x++){b[x]=[];let P=E.clone().lerp(_,x/v),D=C.clone().lerp(_,x/v),U=v-x;for(let V=0;V<=U;V++)V===0&&x===v?b[x][V]=P:b[x][V]=P.clone().lerp(D,V/U)}for(let x=0;x<v;x++)for(let P=0;P<2*(v-x)-1;P++){let D=Math.floor(P/2);P%2===0?(d(b[x][D+1]),d(b[x+1][D]),d(b[x][D])):(d(b[x][D+1]),d(b[x+1][D+1]),d(b[x+1][D]))}}function l(E){let C=new R;for(let _=0;_<r.length;_+=3)C.x=r[_+0],C.y=r[_+1],C.z=r[_+2],C.normalize().multiplyScalar(E),r[_+0]=C.x,r[_+1]=C.y,r[_+2]=C.z}function h(){let E=new R;for(let C=0;C<r.length;C+=3){E.x=r[C+0],E.y=r[C+1],E.z=r[C+2];let _=g(E)/2/Math.PI+.5,T=p(E)/Math.PI+.5;o.push(_,1-T)}m(),u()}function u(){for(let E=0;E<o.length;E+=6){let C=o[E+0],_=o[E+2],T=o[E+4],v=Math.max(C,_,T),b=Math.min(C,_,T);v>.9&&b<.1&&(C<.2&&(o[E+0]+=1),_<.2&&(o[E+2]+=1),T<.2&&(o[E+4]+=1))}}function d(E){r.push(E.x,E.y,E.z)}function f(E,C){let _=E*3;C.x=t[_+0],C.y=t[_+1],C.z=t[_+2]}function m(){let E=new R,C=new R,_=new R,T=new R,v=new ut,b=new ut,x=new ut;for(let P=0,D=0;P<r.length;P+=9,D+=6){E.set(r[P+0],r[P+1],r[P+2]),C.set(r[P+3],r[P+4],r[P+5]),_.set(r[P+6],r[P+7],r[P+8]),v.set(o[D+0],o[D+1]),b.set(o[D+2],o[D+3]),x.set(o[D+4],o[D+5]),T.copy(E).add(C).add(_).divideScalar(3);let U=g(T);y(v,D+0,E,U),y(b,D+2,C,U),y(x,D+4,_,U)}}function y(E,C,_,T){T<0&&E.x===1&&(o[C]=E.x-1),_.x===0&&_.z===0&&(o[C]=T/2/Math.PI+.5)}function g(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}};var dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Gt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ut:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new R,s=[],r=[],o=[],a=new R,c=new ue;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new R)}r[0]=new R,o[0]=new R;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Qt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Qt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Rs=class extends dn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ut){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Vo=class extends Rs{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function bl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Hh=new R,Gh=new R,Bc=new bl,Oc=new bl,zc=new bl,Ps=class extends dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new R){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Gh.subVectors(s[0],s[1]).add(s[0]),l=Gh);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Hh.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Hh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),g<1e-4&&(g=y),Bc.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,y,g),Oc.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,y,g),zc.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,y,g)}else this.curveType==="catmullrom"&&(Bc.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Oc.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),zc.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Bc.calc(c),Oc.calc(c),zc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new R().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Wh(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Xf(i,t){let e=1-i;return e*e*t}function qf(i,t){return 2*(1-i)*i*t}function Yf(i,t){return i*i*t}function nr(i,t,e,n){return Xf(i,t)+qf(i,e)+Yf(i,n)}function Zf(i,t){let e=1-i;return e*e*e*t}function Jf(i,t){let e=1-i;return 3*e*e*i*t}function Kf(i,t){return 3*(1-i)*i*i*t}function $f(i,t){return i*i*i*t}function ir(i,t,e,n,s){return Zf(i,t)+Jf(i,e)+Kf(i,n)+$f(i,s)}var pr=class extends dn{constructor(t=new ut,e=new ut,n=new ut,s=new ut){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ir(t,s.x,r.x,o.x,a.x),ir(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ko=class extends dn{constructor(t=new R,e=new R,n=new R,s=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new R){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ir(t,s.x,r.x,o.x,a.x),ir(t,s.y,r.y,o.y,a.y),ir(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},mr=class extends dn{constructor(t=new ut,e=new ut){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ut){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ut){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ho=class extends dn{constructor(t=new R,e=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new R){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new R){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},gr=class extends dn{constructor(t=new ut,e=new ut,n=new ut){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ut){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(nr(t,s.x,r.x,o.x),nr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_r=class extends dn{constructor(t=new R,e=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new R){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(nr(t,s.x,r.x,o.x),nr(t,s.y,r.y,o.y),nr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},xr=class extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ut){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Wh(a,c.x,l.x,h.x,u.x),Wh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ut().fromArray(s))}return this}},Go=Object.freeze({__proto__:null,ArcCurve:Vo,CatmullRomCurve3:Ps,CubicBezierCurve:pr,CubicBezierCurve3:ko,EllipseCurve:Rs,LineCurve:mr,LineCurve3:Ho,QuadraticBezierCurve:gr,QuadraticBezierCurve3:_r,SplineCurve:xr}),Wo=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Go[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Go[s.type]().fromJSON(s))}return this}},Xi=class extends Wo{constructor(t){super(),this.type="Path",this.currentPoint=new ut,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new mr(this.currentPoint.clone(),new ut(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new gr(this.currentPoint.clone(),new ut(t,e),new ut(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new pr(this.currentPoint.clone(),new ut(t,e),new ut(n,s),new ut(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new xr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){let l=new Rs(t,e,n,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Cn=class extends Xi{constructor(t){super(t),this.uuid=$i(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new Xi().fromJSON(s))}return this}};function jf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Vu(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=ip(i,t,r,e)),i.length>80*e){a=i[0],c=i[1];let h=a,u=c;for(let d=e;d<s;d+=e){let f=i[d],m=i[d+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return yr(r,o,e,a,c,l,0),o}function Vu(i,t,e,n,s){let r;if(s===pp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Xh(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Xh(o/n|0,i[o],i[o+1],r);return r&&Is(r,r.next)&&(Mr(r),r=r.next),r}function qi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Is(e,e.next)||Ie(e.prev,e,e.next)===0)){if(Mr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function yr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&cp(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?tp(i,n,s,r):Qf(i)){t.push(c.i,i.i,l.i),Mr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=ep(qi(i),t),yr(i,t,e,n,s,r,2)):o===2&&np(i,t,e,n,s,r):yr(qi(i),t,e,n,s,r,1);break}}}function Qf(i){let t=i.prev,e=i,n=i.next;if(Ie(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),d=Math.max(s,r,o),f=Math.max(a,c,l),m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&Qs(s,a,r,c,o,l,m.x,m.y)&&Ie(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function tp(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Ie(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,c,l),m=Math.min(h,u,d),y=Math.max(a,c,l),g=Math.max(h,u,d),p=qc(f,m,t,e,n),E=qc(y,g,t,e,n),C=i.prevZ,_=i.nextZ;for(;C&&C.z>=p&&_&&_.z<=E;){if(C.x>=f&&C.x<=y&&C.y>=m&&C.y<=g&&C!==s&&C!==o&&Qs(a,h,c,u,l,d,C.x,C.y)&&Ie(C.prev,C,C.next)>=0||(C=C.prevZ,_.x>=f&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Qs(a,h,c,u,l,d,_.x,_.y)&&Ie(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;C&&C.z>=p;){if(C.x>=f&&C.x<=y&&C.y>=m&&C.y<=g&&C!==s&&C!==o&&Qs(a,h,c,u,l,d,C.x,C.y)&&Ie(C.prev,C,C.next)>=0)return!1;C=C.prevZ}for(;_&&_.z<=E;){if(_.x>=f&&_.x<=y&&_.y>=m&&_.y<=g&&_!==s&&_!==o&&Qs(a,h,c,u,l,d,_.x,_.y)&&Ie(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ep(i,t){let e=i;do{let n=e.prev,s=e.next.next;!Is(n,s)&&Hu(n,e,e.next,s)&&vr(n,s)&&vr(s,n)&&(t.push(n.i,e.i,s.i),Mr(e),Mr(e.next),e=i=s),e=e.next}while(e!==i);return qi(e)}function np(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&up(o,a)){let c=Gu(o,a);o=qi(o,o.next),c=qi(c,c.next),yr(o,t,e,n,s,r,0),yr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function ip(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Vu(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(hp(l))}s.sort(sp);for(let r=0;r<s.length;r++)e=rp(s[r],e);return e}function sp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function rp(i,t){let e=op(i,t);if(!e)return t;let n=Gu(e,i);return qi(n,n.next),qi(e,e.next)}function op(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(Is(i,e))return e;do{if(Is(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&ku(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);vr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&ap(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function ap(i,t){return Ie(i.prev,i,t.prev)<0&&Ie(t.next,i,i.next)<0}function cp(i,t,e,n){let s=i;do s.z===0&&(s.z=qc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,lp(s)}function lp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function qc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function hp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ku(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Qs(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&ku(i,t,e,n,s,r,o,a)}function up(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!dp(i,t)&&(vr(i,t)&&vr(t,i)&&fp(i,t)&&(Ie(i.prev,i,t.prev)||Ie(i,t.prev,t))||Is(i,t)&&Ie(i.prev,i,i.next)>0&&Ie(t.prev,t,t.next)>0)}function Ie(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Is(i,t){return i.x===t.x&&i.y===t.y}function Hu(i,t,e,n){let s=So(Ie(i,t,e)),r=So(Ie(i,t,n)),o=So(Ie(e,n,i)),a=So(Ie(e,n,t));return!!(s!==r&&o!==a||s===0&&Mo(i,e,t)||r===0&&Mo(i,n,t)||o===0&&Mo(e,i,n)||a===0&&Mo(e,t,n))}function Mo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function So(i){return i>0?1:i<0?-1:0}function dp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Hu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function vr(i,t){return Ie(i.prev,i,i.next)<0?Ie(i,t,i.next)>=0&&Ie(i,i.prev,t)>=0:Ie(i,t,i.prev)<0||Ie(i,i.next,t)<0}function fp(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Gu(i,t){let e=Yc(i.i,i.x,i.y),n=Yc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Xh(i,t,e,n){let s=Yc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Yc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function pp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Zc=class{static triangulate(t,e,n=2){return jf(t,e,n)}},wn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];qh(t),Yh(n,t);let o=t.length;e.forEach(qh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Yh(n,e[c]);let a=Zc.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function qh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Yh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ni=class i extends he{constructor(t=new Cn([new ut(.5,.5),new ut(-.5,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Jt(s,3)),this.setAttribute("uv",new Jt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:mp,C,_=!1,T,v,b,x;if(p){C=p.getSpacedPoints(h),_=!0,d=!1;let ot=p.isCatmullRomCurve3?p.closed:!1;T=p.computeFrenetFrames(h,ot),v=new R,b=new R,x=new R}d||(g=0,f=0,m=0,y=0);let P=a.extractPoints(l),D=P.shape,U=P.holes;if(!wn.isClockWise(D)){D=D.reverse();for(let ot=0,N=U.length;ot<N;ot++){let X=U[ot];wn.isClockWise(X)&&(U[ot]=X.reverse())}}function W(ot){let X=10000000000000001e-36,Z=ot[0];for(let j=1;j<=ot.length;j++){let ht=j%ot.length,dt=ot[ht],pt=dt.x-Z.x,St=dt.y-Z.y,B=pt*pt+St*St,Xt=Math.max(Math.abs(dt.x),Math.abs(dt.y),Math.abs(Z.x),Math.abs(Z.y)),Yt=X*Xt*Xt;if(B<=Yt){ot.splice(ht,1),j--;continue}Z=dt}}W(D),U.forEach(W);let F=U.length,k=D;for(let ot=0;ot<F;ot++){let N=U[ot];D=D.concat(N)}function Q(ot,N,X){return N||qt("ExtrudeGeometry: vec does not exist"),ot.clone().addScaledVector(N,X)}let Y=D.length;function rt(ot,N,X){let Z,j,ht,dt=ot.x-N.x,pt=ot.y-N.y,St=X.x-ot.x,B=X.y-ot.y,Xt=dt*dt+pt*pt,Yt=dt*B-pt*St;if(Math.abs(Yt)>Number.EPSILON){let I=Math.sqrt(Xt),M=Math.sqrt(St*St+B*B),S=N.x-pt/I,A=N.y+dt/I,L=X.x-B/M,O=X.y+St/M,$=((L-S)*B-(O-A)*St)/(dt*B-pt*St);Z=S+dt*$-ot.x,j=A+pt*$-ot.y;let z=Z*Z+j*j;if(z<=2)return new ut(Z,j);ht=Math.sqrt(z/2)}else{let I=!1;dt>Number.EPSILON?St>Number.EPSILON&&(I=!0):dt<-Number.EPSILON?St<-Number.EPSILON&&(I=!0):Math.sign(pt)===Math.sign(B)&&(I=!0),I?(Z=-pt,j=dt,ht=Math.sqrt(Xt)):(Z=dt,j=pt,ht=Math.sqrt(Xt/2))}return new ut(Z/ht,j/ht)}let et=[];for(let ot=0,N=k.length,X=N-1,Z=ot+1;ot<N;ot++,X++,Z++)X===N&&(X=0),Z===N&&(Z=0),et[ot]=rt(k[ot],k[X],k[Z]);let st=[],it,bt=et.concat();for(let ot=0,N=F;ot<N;ot++){let X=U[ot];it=[];for(let Z=0,j=X.length,ht=j-1,dt=Z+1;Z<j;Z++,ht++,dt++)ht===j&&(ht=0),dt===j&&(dt=0),it[Z]=rt(X[Z],X[ht],X[dt]);st.push(it),bt=bt.concat(it)}let vt;if(g===0)vt=wn.triangulateShape(k,U);else{let ot=[],N=[];for(let X=0;X<g;X++){let Z=X/g,j=f*Math.cos(Z*Math.PI/2),ht=m*Math.sin(Z*Math.PI/2)+y;for(let dt=0,pt=k.length;dt<pt;dt++){let St=Q(k[dt],et[dt],ht);xt(St.x,St.y,-j),Z===0&&ot.push(St)}for(let dt=0,pt=F;dt<pt;dt++){let St=U[dt];it=st[dt];let B=[];for(let Xt=0,Yt=St.length;Xt<Yt;Xt++){let I=Q(St[Xt],it[Xt],ht);xt(I.x,I.y,-j),Z===0&&B.push(I)}Z===0&&N.push(B)}}vt=wn.triangulateShape(ot,N)}let Ut=vt.length,zt=m+y;for(let ot=0;ot<Y;ot++){let N=d?Q(D[ot],bt[ot],zt):D[ot];_?(b.copy(T.normals[0]).multiplyScalar(N.x),v.copy(T.binormals[0]).multiplyScalar(N.y),x.copy(C[0]).add(b).add(v),xt(x.x,x.y,x.z)):xt(N.x,N.y,0)}for(let ot=1;ot<=h;ot++)for(let N=0;N<Y;N++){let X=d?Q(D[N],bt[N],zt):D[N];_?(b.copy(T.normals[ot]).multiplyScalar(X.x),v.copy(T.binormals[ot]).multiplyScalar(X.y),x.copy(C[ot]).add(b).add(v),xt(x.x,x.y,x.z)):xt(X.x,X.y,u/h*ot)}for(let ot=g-1;ot>=0;ot--){let N=ot/g,X=f*Math.cos(N*Math.PI/2),Z=m*Math.sin(N*Math.PI/2)+y;for(let j=0,ht=k.length;j<ht;j++){let dt=Q(k[j],et[j],Z);xt(dt.x,dt.y,u+X)}for(let j=0,ht=U.length;j<ht;j++){let dt=U[j];it=st[j];for(let pt=0,St=dt.length;pt<St;pt++){let B=Q(dt[pt],it[pt],Z);_?xt(B.x,B.y+C[h-1].y,C[h-1].x+X):xt(B.x,B.y,u+X)}}}te(),nt();function te(){let ot=s.length/3;if(d){let N=0,X=Y*N;for(let Z=0;Z<Ut;Z++){let j=vt[Z];Ot(j[2]+X,j[1]+X,j[0]+X)}N=h+g*2,X=Y*N;for(let Z=0;Z<Ut;Z++){let j=vt[Z];Ot(j[0]+X,j[1]+X,j[2]+X)}}else{for(let N=0;N<Ut;N++){let X=vt[N];Ot(X[2],X[1],X[0])}for(let N=0;N<Ut;N++){let X=vt[N];Ot(X[0]+Y*h,X[1]+Y*h,X[2]+Y*h)}}n.addGroup(ot,s.length/3-ot,0)}function nt(){let ot=s.length/3,N=0;ct(k,N),N+=k.length;for(let X=0,Z=U.length;X<Z;X++){let j=U[X];ct(j,N),N+=j.length}n.addGroup(ot,s.length/3-ot,1)}function ct(ot,N){let X=ot.length;for(;--X>=0;){let Z=X,j=X-1;j<0&&(j=ot.length-1);for(let ht=0,dt=h+g*2;ht<dt;ht++){let pt=Y*ht,St=Y*(ht+1),B=N+Z+pt,Xt=N+j+pt,Yt=N+j+St,I=N+Z+St;Tt(B,Xt,Yt,I)}}}function xt(ot,N,X){c.push(ot),c.push(N),c.push(X)}function Ot(ot,N,X){Ht(ot),Ht(N),Ht(X);let Z=s.length/3,j=E.generateTopUV(n,s,Z-3,Z-2,Z-1);ee(j[0]),ee(j[1]),ee(j[2])}function Tt(ot,N,X,Z){Ht(ot),Ht(N),Ht(Z),Ht(N),Ht(X),Ht(Z);let j=s.length/3,ht=E.generateSideWallUV(n,s,j-6,j-3,j-2,j-1);ee(ht[0]),ee(ht[1]),ee(ht[3]),ee(ht[1]),ee(ht[2]),ee(ht[3])}function Ht(ot){s.push(c[ot*3+0]),s.push(c[ot*3+1]),s.push(c[ot*3+2])}function ee(ot){r.push(ot.x),r.push(ot.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return gp(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Go[s.type]().fromJSON(s)),new i(n,t.options)}},mp={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ut(r,o),new ut(a,c),new ut(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ut(o,1-c),new ut(l,1-u),new ut(d,1-m),new ut(y,1-p)]:[new ut(a,1-c),new ut(h,1-u),new ut(f,1-m),new ut(g,1-p)]}};function gp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Sr=class i extends fr{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var br=class i extends fr{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Yi=class i extends he{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],m=[],y=[],g=[];for(let p=0;p<h;p++){let E=p*d-o;for(let C=0;C<l;C++){let _=C*u-r;m.push(_,-E,0),y.push(0,0,1),g.push(C/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){let C=E+l*p,_=E+l*(p+1),T=E+1+l*(p+1),v=E+1+l*p;f.push(C,_,v),f.push(_,T,v)}this.setIndex(f),this.setAttribute("position",new Jt(m,3)),this.setAttribute("normal",new Jt(y,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Er=class i extends he{constructor(t=new Cn([new ut(0,.5),new ut(-.5,-.5),new ut(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Jt(s,3)),this.setAttribute("normal",new Jt(r,3)),this.setAttribute("uv",new Jt(o,2));function l(h){let u=s.length/3,d=h.extractPoints(e),f=d.shape,m=d.holes;wn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let E=m[g];wn.isClockWise(E)===!0&&(m[g]=E.reverse())}let y=wn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let E=m[g];f=f.concat(E)}for(let g=0,p=f.length;g<p;g++){let E=f[g];s.push(E.x,E.y,0),r.push(0,0,1),o.push(E.x,E.y)}for(let g=0,p=y.length;g<p;g++){let E=y[g],C=E[0]+u,_=E[1]+u,T=E[2]+u;n.push(C,_,T),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return _p(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};function _p(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}var Ls=class i extends he{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new R,d=new R,f=[],m=[],y=[],g=[];for(let p=0;p<=n;p++){let E=[],C=p/n,_=o+C*a,T=t*Math.cos(_),v=Math.sqrt(t*t-T*T),b=0;p===0&&o===0?b=.5/e:p===n&&c===Math.PI&&(b=-.5/e);for(let x=0;x<=e;x++){let P=x/e,D=s+P*r;u.x=-v*Math.cos(D),u.y=T,u.z=v*Math.sin(D),m.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),g.push(P+b,1-C),E.push(l++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){let C=h[p][E+1],_=h[p][E],T=h[p+1][E],v=h[p+1][E+1];(p!==0||o>0)&&f.push(C,_,v),(p!==n-1||c<Math.PI)&&f.push(_,T,v)}this.setIndex(f),this.setAttribute("position",new Jt(m,3)),this.setAttribute("normal",new Jt(y,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Tr=class i extends he{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],u=[],d=new R,f=new R,m=new R;for(let y=0;y<=n;y++){let g=o+y/n*a;for(let p=0;p<=s;p++){let E=p/s*r;f.x=(t+e*Math.cos(g))*Math.cos(E),f.y=(t+e*Math.cos(g))*Math.sin(E),f.z=e*Math.sin(g),l.push(f.x,f.y,f.z),d.x=t*Math.cos(E),d.y=t*Math.sin(E),m.subVectors(f,d).normalize(),h.push(m.x,m.y,m.z),u.push(p/s),u.push(y/n)}}for(let y=1;y<=n;y++)for(let g=1;g<=s;g++){let p=(s+1)*y+g-1,E=(s+1)*(y-1)+g-1,C=(s+1)*(y-1)+g,_=(s+1)*y+g;c.push(p,E,_),c.push(E,C,_)}this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};var wr=class i extends he{constructor(t=new _r(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,c=new R,l=new ut,h=new R,u=[],d=[],f=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(d,3)),this.setAttribute("uv",new Jt(f,2));function y(){for(let C=0;C<e;C++)g(C);g(r===!1?e:0),E(),p()}function g(C){h=t.getPointAt(C/e,h);let _=o.normals[C],T=o.binormals[C];for(let v=0;v<=s;v++){let b=v/s*Math.PI*2,x=Math.sin(b),P=-Math.cos(b);c.x=P*_.x+x*T.x,c.y=P*_.y+x*T.y,c.z=P*_.z+x*T.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let C=1;C<=e;C++)for(let _=1;_<=s;_++){let T=(s+1)*(C-1)+(_-1),v=(s+1)*C+(_-1),b=(s+1)*C+_,x=(s+1)*(C-1)+_;m.push(T,v,x),m.push(v,b,x)}}function E(){for(let C=0;C<=e;C++)for(let _=0;_<=s;_++)l.x=C/e,l.y=_/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Go[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ji(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Zh(s))s.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Zh(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ze(i){let t={};for(let e=0;e<i.length;e++){let n=ji(i[e]);for(let s in n)t[s]=n[s]}return t}function Zh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function xp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function El(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var Wu={clone:ji,merge:Ze},yp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fn=class extends ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yp,this.fragmentShader=vp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ji(t.uniforms),this.uniformsGroups=xp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Wt().setHex(s.value);break;case"v2":this.uniforms[n].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Pe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Kt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Xo=class extends fn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ce=class extends ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Za,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ar=class extends ce{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Wt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Wt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Wt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var qo=class extends ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Yo=class extends ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function ds(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Vc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ti=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Zo=class extends Ti{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gc,endingEnd:Gc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Wc:r=t,a=2*e-n;break;case Xc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Wc:o=t,c=2*n-e;break;case Xc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),y=m*m,g=y*m,p=-d*g+2*d*y-d*m,E=(1+d)*g+(-1.5-2*d)*y+(-.5+d)*m+1,C=(-1-f)*g+(1.5+f)*y+.5*m,_=f*g-f*y;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+E*o[l+T]+C*o[c+T]+_*o[u+T];return r}},Jo=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},Ko=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},$o=class extends Ti{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let m=(n-e)/(s-e),y=1-m;for(let g=0;g!==a;++g)r[g]=o[l+g]*y+o[c+g]*m;return r}let d=a*2,f=t-1;for(let m=0;m!==a;++m){let y=o[l+m],g=o[c+m],p=f*d+m*2,E=u[p],C=u[p+1],_=t*d+m*2,T=h[_],v=h[_+1],b=Sp(n,e,E,T,s);r[m]=Xu(b,y,C,v,g)}return r}};function Xu(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function Mp(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function Sp(i,t,e,n,s){let r=(i-t)/(s-t);for(let o=0;o<8;o++){let a=Xu(r,t,e,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Mp(r,t,e,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var pn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ds(e,this.TimeBufferType),this.values=ds(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:ds(t.times,Array),values:ds(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),Vc(t.settings)&&(n.settings={inTangents:ds(t.settings.inTangents,Array),outTangents:ds(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ko(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Jo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Zo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new $o(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Gi:e=this.InterpolantFactoryMethodDiscrete;break;case vs:e=this.InterpolantFactoryMethodLinear;break;case To:e=this.InterpolantFactoryMethodSmooth;break;case Hc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Gt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gi;case this.InterpolantFactoryMethodLinear:return vs;case this.InterpolantFactoryMethodSmooth:return To;case this.InterpolantFactoryMethodBezier:return Hc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;Vc(this.settings)&&(Jh(this.settings.inTangents,t),Jh(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(qt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){qt("KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){qt("KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&hf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){qt("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===To,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let y=e[u+m];if(y!==e[d+m]||y!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,Vc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Jh(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=vs;var wi=class extends pn{constructor(t,e,n){super(t,e,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=Gi;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var jo=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}};jo.prototype.ValueTypeName="color";var Qo=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}};Qo.prototype.ValueTypeName="number";var ta=class extends Ti{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)je.slerpFlat(r,0,o,l-a,o,l,c);return r}},Cr=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new ta(this.times,this.values,this.getValueSize(),t)}};Cr.prototype.ValueTypeName="quaternion";Cr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends pn{constructor(t,e,n){super(t,e,n)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=Gi;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var ea=class extends pn{constructor(t,e,n,s){super(t,e,n,s)}};ea.prototype.ValueTypeName="vector";var na=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},qu=new na,ia=class{constructor(t){this.manager=t!==void 0?t:qu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};ia.DEFAULT_MATERIAL_NAME="__DEFAULT";var Rr=class extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},Pr=class extends Rr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},kc=new ue,Kh=new R,$h=new R,sa=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new As,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Kh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kh),$h.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($h),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(kc,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Ms||t.reversedDepth?e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),e.multiply(kc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},bo=new R,Eo=new je,Bn=new R,Ir=class extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(bo,Eo,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,Eo,Bn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(bo,Eo,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(bo,Eo,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},yi=new R,jh=new ut,Qh=new ut,nn=class extends Ir{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=bs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bs*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(yi.x,yi.y).multiplyScalar(-t/yi.z),yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yi.x,yi.y).multiplyScalar(-t/yi.z)}getViewSize(t,e){return this.getViewBounds(t,jh,Qh),e.subVectors(Qh,jh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ci=class extends Ir{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Jc=class extends sa{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ds=class extends Rr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new Jc}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var fs=-90,ps=1,ra=class extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(fs,ps,t,e);s.layers=this.layers,this.add(s);let r=new nn(fs,ps,t,e);r.layers=this.layers,this.add(r);let o=new nn(fs,ps,t,e);o.layers=this.layers,this.add(o);let a=new nn(fs,ps,t,e);a.layers=this.layers,this.add(a);let c=new nn(fs,ps,t,e);c.layers=this.layers,this.add(c);let l=new nn(fs,ps,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},oa=class extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Tl="\\[\\]\\.:\\/",bp=new RegExp("["+Tl+"]","g"),wl="[^"+Tl+"]",Ep="[^"+Tl.replace("\\.","")+"]",Tp=/((?:WC+[\/:])*)/.source.replace("WC",wl),wp=/(WCOD+)?/.source.replace("WCOD",Ep),Ap=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wl),Cp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wl),Rp=new RegExp("^"+Tp+wp+Ap+Cp+"$"),Pp=["material","materials","bones","map"],Kc=class{constructor(t,e,n){let s=n||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},_e=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(bp,"")}static parseTrackName(t){let e=Rp.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Pp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Gt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;qt("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=Kc;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var d1=new Float32Array(1);var tu=new ue,Lr=class{constructor(t,e,n=0,s=1/0){this.ray=new Si(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ts,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):qt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return tu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(tu),this}intersectObject(t,e=!0,n=[]){return $c(t,this,n,e),n.sort(eu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)$c(t[s],this,n,e);return n.sort(eu),n}};function eu(i,t){return i.distance-t.distance}function $c(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)$c(r[o],t,e,!0)}}var Ns=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Qt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Qt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var jc=class i{static{i.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}},nu=new ut,aa=class{constructor(t=new ut(1/0,1/0),e=new ut(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nu.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nu).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}};var Dr=class{constructor(){this.type="ShapePath",this.color=new Wt,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(t,e){return this.currentPath=new Xi,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,s){return this.currentPath.quadraticCurveTo(t,e,n,s),this}bezierCurveTo(t,e,n,s,r,o){return this.currentPath.bezierCurveTo(t,e,n,s,r,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(){function t(c,l){let h=!1,u=l.length;for(let d=0,f=u-1;d<u;f=d++){let m=l[d],y=l[f];m.y>c.y!=y.y>c.y&&c.x<(y.x-m.x)*(c.y-m.y)/(y.y-m.y)+m.x&&(h=!h)}return h}function e(c,l){let h=l.getCenter(new ut);if(t(h,c))return h;let u=h.y,d=[],f=c.length;for(let m=0;m<f;m++){let y=c[m],g=c[(m+1)%f];if(y.y>u!=g.y>u){let p=y.x+(u-y.y)*(g.x-y.x)/(g.y-y.y);d.push(p)}}return d.length>1&&(d.sort((m,y)=>m-y),h.x=(d[0]+d[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Gt('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(c=>c!==0):(c=>(c&1)!==0),r=[];for(let c of this.subPaths){let l=c.getPoints();if(l.length<3)continue;let h=wn.area(l);if(h===0)continue;let u=new aa;for(let d=0;d<l.length;d++)u.expandByPoint(l[d]);r.push({subPath:c,points:l,boundingBox:u,interiorPoint:e(l,u),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((c,l)=>l.absArea-c.absArea);for(let c=0;c<r.length;c++){let l=r[c],h=0;for(let u=c-1;u>=0;u--){let d=r[u];if(d.boundingBox.containsBox(l.boundingBox)&&t(l.interiorPoint,d.points)){l.container=d.exclude?d.container:d,h=d.winding,l.winding+=h;break}}s(l.winding)===s(h)&&(l.exclude=!0)}for(let c of r)c.exclude||(c.role=c.container===null||c.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let c of r){if(c.exclude||c.role!=="outer")continue;let l=new Cn;l.curves=c.subPath.curves,o.push(l),a.set(c,l)}for(let c of r){if(c.exclude||c.role!=="hole")continue;let l=a.get(c.container);if(!l)continue;let h=new Xi;h.curves=c.subPath.curves,l.holes.push(h)}return o}},Nr=class extends An{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Al(i,t,e,n){let s=Ip(n);switch(e){case _l:return i*t;case yl:return i*t/s.components*s.byteLength;case ma:return i*t/s.components*s.byteLength;case Di:return i*t*2/s.components*s.byteLength;case ga:return i*t*2/s.components*s.byteLength;case xl:return i*t*3/s.components*s.byteLength;case on:return i*t*4/s.components*s.byteLength;case _a:return i*t*4/s.components*s.byteLength;case Or:case zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Vr:case kr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ya:case Ma:return Math.max(i,16)*Math.max(t,8)/4;case xa:case va:return Math.max(i,8)*Math.max(t,8)/2;case Sa:case ba:case Ta:case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ea:case Hr:case Aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Pa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case La:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Na:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case za:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ka:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ha:case Ga:case Wa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Xa:case qa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Gr:case Ya:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ip(i){switch(i){case rn:case fl:return{byteLength:1,components:1};case Os:case pl:case Ln:return{byteLength:2,components:1};case fa:case pa:return{byteLength:2,components:4};case Pn:case da:case In:return{byteLength:4,components:1};case ml:case gl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function pd(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Op(i){let t=new WeakMap;function e(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],y=u[f];y.start<=m.start+m.count+1?m.count=Math.max(m.count,y.start+y.count-m.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let y=u[f];i.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var zp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vp=`#ifdef USE_ALPHAHASH
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
#endif`,kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xp=`#ifdef USE_AOMAP
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
#endif`,qp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yp=`#ifdef USE_BATCHING
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
#endif`,Zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Kp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$p=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jp=`#ifdef USE_IRIDESCENCE
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
#endif`,Qp=`#ifdef USE_BUMPMAP
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
#endif`,tm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,om=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,cm=`#define PI 3.141592653589793
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
} // validated`,lm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hm=`vec3 transformedNormal = objectNormal;
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
#endif`,um=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mm="gl_FragColor = linearToOutputTexel( gl_FragColor );",gm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_m=`#ifdef USE_ENVMAP
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
#endif`,xm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ym=`#ifdef USE_ENVMAP
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
#endif`,vm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mm=`#ifdef USE_ENVMAP
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
#endif`,Sm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Em=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wm=`#ifdef USE_GRADIENTMAP
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
}`,Am=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Im=`#ifdef USE_ENVMAP
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
#endif`,Lm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fm=`PhysicalMaterial material;
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
#endif`,Bm=`uniform sampler2D dfgLUT;
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
#endif`,zm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,km=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ym=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Jm=`#if defined( USE_POINTS_UV )
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
#endif`,Km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Qm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,t0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e0=`#ifdef USE_MORPHTARGETS
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
#endif`,n0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,i0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,s0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,r0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,o0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,c0=`#ifdef USE_NORMALMAP
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
#endif`,l0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,h0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,u0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,d0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,f0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,p0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,m0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,g0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,x0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,y0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,v0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,S0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,b0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,E0=`float getShadowMask() {
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
}`,T0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,w0=`#ifdef USE_SKINNING
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
#endif`,A0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C0=`#ifdef USE_SKINNING
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
#endif`,R0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,P0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,I0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,L0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,D0=`#ifdef USE_TRANSMISSION
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
#endif`,N0=`#ifdef USE_TRANSMISSION
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
#endif`,U0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,z0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,V0=`uniform sampler2D t2D;
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
}`,k0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X0=`#include <common>
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
}`,q0=`#if DEPTH_PACKING == 3200
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
}`,Y0=`#define DISTANCE
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
}`,Z0=`#define DISTANCE
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
}`,J0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,K0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`uniform float scale;
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
}`,j0=`uniform vec3 diffuse;
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
}`,Q0=`#include <common>
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
}`,tg=`uniform vec3 diffuse;
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
}`,eg=`#define LAMBERT
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
}`,ng=`#define LAMBERT
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
}`,ig=`#define MATCAP
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
}`,sg=`#define MATCAP
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
}`,rg=`#define NORMAL
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
}`,og=`#define NORMAL
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
}`,ag=`#define PHONG
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
}`,cg=`#define PHONG
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
}`,lg=`#define STANDARD
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
}`,hg=`#define STANDARD
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
}`,ug=`#define TOON
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
}`,dg=`#define TOON
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
}`,fg=`uniform float size;
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
}`,pg=`uniform vec3 diffuse;
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
}`,mg=`#include <common>
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
}`,gg=`uniform vec3 color;
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
}`,_g=`uniform float rotation;
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
}`,xg=`uniform vec3 diffuse;
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
}`,ie={alphahash_fragment:zp,alphahash_pars_fragment:Vp,alphamap_fragment:kp,alphamap_pars_fragment:Hp,alphatest_fragment:Gp,alphatest_pars_fragment:Wp,aomap_fragment:Xp,aomap_pars_fragment:qp,batching_pars_vertex:Yp,batching_vertex:Zp,begin_vertex:Jp,beginnormal_vertex:Kp,bsdfs:$p,iridescence_fragment:jp,bumpmap_pars_fragment:Qp,clipping_planes_fragment:tm,clipping_planes_pars_fragment:em,clipping_planes_pars_vertex:nm,clipping_planes_vertex:im,color_fragment:sm,color_pars_fragment:rm,color_pars_vertex:om,color_vertex:am,common:cm,cube_uv_reflection_fragment:lm,defaultnormal_vertex:hm,displacementmap_pars_vertex:um,displacementmap_vertex:dm,emissivemap_fragment:fm,emissivemap_pars_fragment:pm,colorspace_fragment:mm,colorspace_pars_fragment:gm,envmap_fragment:_m,envmap_common_pars_fragment:xm,envmap_pars_fragment:ym,envmap_pars_vertex:vm,envmap_physical_pars_fragment:Im,envmap_vertex:Mm,fog_vertex:Sm,fog_pars_vertex:bm,fog_fragment:Em,fog_pars_fragment:Tm,gradientmap_pars_fragment:wm,lightmap_pars_fragment:Am,lights_lambert_fragment:Cm,lights_lambert_pars_fragment:Rm,lights_pars_begin:Pm,lights_toon_fragment:Lm,lights_toon_pars_fragment:Dm,lights_phong_fragment:Nm,lights_phong_pars_fragment:Um,lights_physical_fragment:Fm,lights_physical_pars_fragment:Bm,lights_fragment_begin:Om,lights_fragment_maps:zm,lights_fragment_end:Vm,lightprobes_pars_fragment:km,logdepthbuf_fragment:Hm,logdepthbuf_pars_fragment:Gm,logdepthbuf_pars_vertex:Wm,logdepthbuf_vertex:Xm,map_fragment:qm,map_pars_fragment:Ym,map_particle_fragment:Zm,map_particle_pars_fragment:Jm,metalnessmap_fragment:Km,metalnessmap_pars_fragment:$m,morphinstance_vertex:jm,morphcolor_vertex:Qm,morphnormal_vertex:t0,morphtarget_pars_vertex:e0,morphtarget_vertex:n0,normal_fragment_begin:i0,normal_fragment_maps:s0,normal_pars_fragment:r0,normal_pars_vertex:o0,normal_vertex:a0,normalmap_pars_fragment:c0,clearcoat_normal_fragment_begin:l0,clearcoat_normal_fragment_maps:h0,clearcoat_pars_fragment:u0,iridescence_pars_fragment:d0,opaque_fragment:f0,packing:p0,premultiplied_alpha_fragment:m0,project_vertex:g0,dithering_fragment:_0,dithering_pars_fragment:x0,roughnessmap_fragment:y0,roughnessmap_pars_fragment:v0,shadowmap_pars_fragment:M0,shadowmap_pars_vertex:S0,shadowmap_vertex:b0,shadowmask_pars_fragment:E0,skinbase_vertex:T0,skinning_pars_vertex:w0,skinning_vertex:A0,skinnormal_vertex:C0,specularmap_fragment:R0,specularmap_pars_fragment:P0,tonemapping_fragment:I0,tonemapping_pars_fragment:L0,transmission_fragment:D0,transmission_pars_fragment:N0,uv_pars_fragment:U0,uv_pars_vertex:F0,uv_vertex:B0,worldpos_vertex:O0,background_vert:z0,background_frag:V0,backgroundCube_vert:k0,backgroundCube_frag:H0,cube_vert:G0,cube_frag:W0,depth_vert:X0,depth_frag:q0,distance_vert:Y0,distance_frag:Z0,equirect_vert:J0,equirect_frag:K0,linedashed_vert:$0,linedashed_frag:j0,meshbasic_vert:Q0,meshbasic_frag:tg,meshlambert_vert:eg,meshlambert_frag:ng,meshmatcap_vert:ig,meshmatcap_frag:sg,meshnormal_vert:rg,meshnormal_frag:og,meshphong_vert:ag,meshphong_frag:cg,meshphysical_vert:lg,meshphysical_frag:hg,meshtoon_vert:ug,meshtoon_frag:dg,points_vert:fg,points_frag:pg,shadow_vert:mg,shadow_frag:gg,sprite_vert:_g,sprite_frag:xg},Et={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Gn={basic:{uniforms:Ze([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:Ze([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:Ze([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:Ze([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:Ze([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Wt(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:Ze([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:Ze([Et.points,Et.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:Ze([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:Ze([Et.common,Et.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:Ze([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:Ze([Et.sprite,Et.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distance:{uniforms:Ze([Et.common,Et.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distance_vert,fragmentShader:ie.distance_frag},shadow:{uniforms:Ze([Et.lights,Et.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Gn.physical={uniforms:Ze([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var $a={r:0,b:0,g:0},yg=new ue,md=new Kt;md.set(-1,0,0,0,1,0,0,0,1);function vg(i,t,e,n,s,r){let o=new Wt(0),a=s===!0?0:1,c,l,h=null,u=0,d=null;function f(E){let C=E.isScene===!0?E.background:null;if(C&&C.isTexture){let _=E.backgroundBlurriness>0;C=t.get(C,_)}return C}function m(E){let C=!1,_=f(E);_===null?g(o,a):_&&_.isColor&&(g(_,1),C=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(E,C){let _=f(C);_&&(_.isCubeTexture||_.mapping===Br)?(l===void 0&&(l=new ae(new Ye(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:ji(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,v,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=_,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yg.makeRotationFromEuler(C.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(md),l.material.toneMapped=oe.getTransfer(_.colorSpace)!==xe,(h!==_||u!==_.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,u=_.version,d=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ae(new Yi(2,2),new fn({name:"BackgroundMaterial",uniforms:ji(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=oe.getTransfer(_.colorSpace)!==xe,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||u!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,u=_.version,d=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function g(E,C){E.getRGB($a,El(i)),e.buffers.color.setClear($a.r,$a.g,$a.b,C,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,C=1){o.set(E),a=C,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(E){a=E,g(o,a)},render:m,addToRenderList:y,dispose:p}}function Mg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(U,V,W,F,k){let Q=!1,Y=u(U,F,W,V);r!==Y&&(r=Y,l(r.object)),Q=f(U,F,W,k),Q&&m(U,F,W,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,_(U,V,W,F),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function c(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function u(U,V,W,F){let k=F.wireframe===!0,Q=n[V.id];Q===void 0&&(Q={},n[V.id]=Q);let Y=U.isInstancedMesh===!0?U.id:0,rt=Q[Y];rt===void 0&&(rt={},Q[Y]=rt);let et=rt[W.id];et===void 0&&(et={},rt[W.id]=et);let st=et[k];return st===void 0&&(st=d(c()),et[k]=st),st}function d(U){let V=[],W=[],F=[];for(let k=0;k<e;k++)V[k]=0,W[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:W,attributeDivisors:F,object:U,attributes:{},index:null}}function f(U,V,W,F){let k=r.attributes,Q=V.attributes,Y=0,rt=W.getAttributes();for(let et in rt)if(rt[et].location>=0){let it=k[et],bt=Q[et];if(bt===void 0&&(et==="instanceMatrix"&&U.instanceMatrix&&(bt=U.instanceMatrix),et==="instanceColor"&&U.instanceColor&&(bt=U.instanceColor)),it===void 0||it.attribute!==bt||bt&&it.data!==bt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==F}function m(U,V,W,F){let k={},Q=V.attributes,Y=0,rt=W.getAttributes();for(let et in rt)if(rt[et].location>=0){let it=Q[et];it===void 0&&(et==="instanceMatrix"&&U.instanceMatrix&&(it=U.instanceMatrix),et==="instanceColor"&&U.instanceColor&&(it=U.instanceColor));let bt={};bt.attribute=it,it&&it.data&&(bt.data=it.data),k[et]=bt,Y++}r.attributes=k,r.attributesNum=Y,r.index=F}function y(){let U=r.newAttributes;for(let V=0,W=U.length;V<W;V++)U[V]=0}function g(U){p(U,0)}function p(U,V){let W=r.newAttributes,F=r.enabledAttributes,k=r.attributeDivisors;W[U]=1,F[U]===0&&(i.enableVertexAttribArray(U),F[U]=1),k[U]!==V&&(i.vertexAttribDivisor(U,V),k[U]=V)}function E(){let U=r.newAttributes,V=r.enabledAttributes;for(let W=0,F=V.length;W<F;W++)V[W]!==U[W]&&(i.disableVertexAttribArray(W),V[W]=0)}function C(U,V,W,F,k,Q,Y){Y===!0?i.vertexAttribIPointer(U,V,W,k,Q):i.vertexAttribPointer(U,V,W,F,k,Q)}function _(U,V,W,F){y();let k=F.attributes,Q=W.getAttributes(),Y=V.defaultAttributeValues;for(let rt in Q){let et=Q[rt];if(et.location>=0){let st=k[rt];if(st===void 0&&(rt==="instanceMatrix"&&U.instanceMatrix&&(st=U.instanceMatrix),rt==="instanceColor"&&U.instanceColor&&(st=U.instanceColor)),st!==void 0){let it=st.normalized,bt=st.itemSize,vt=t.get(st);if(vt===void 0)continue;let Ut=vt.buffer,zt=vt.type,te=vt.bytesPerElement,nt=zt===i.INT||zt===i.UNSIGNED_INT||st.gpuType===da;if(st.isInterleavedBufferAttribute){let ct=st.data,xt=ct.stride,Ot=st.offset;if(ct.isInstancedInterleavedBuffer){for(let Tt=0;Tt<et.locationSize;Tt++)p(et.location+Tt,ct.meshPerAttribute);U.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let Tt=0;Tt<et.locationSize;Tt++)g(et.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,Ut);for(let Tt=0;Tt<et.locationSize;Tt++)C(et.location+Tt,bt/et.locationSize,zt,it,xt*te,(Ot+bt/et.locationSize*Tt)*te,nt)}else{if(st.isInstancedBufferAttribute){for(let ct=0;ct<et.locationSize;ct++)p(et.location+ct,st.meshPerAttribute);U.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let ct=0;ct<et.locationSize;ct++)g(et.location+ct);i.bindBuffer(i.ARRAY_BUFFER,Ut);for(let ct=0;ct<et.locationSize;ct++)C(et.location+ct,bt/et.locationSize,zt,it,bt*te,bt/et.locationSize*ct*te,nt)}}else if(Y!==void 0){let it=Y[rt];if(it!==void 0)switch(it.length){case 2:i.vertexAttrib2fv(et.location,it);break;case 3:i.vertexAttrib3fv(et.location,it);break;case 4:i.vertexAttrib4fv(et.location,it);break;default:i.vertexAttrib1fv(et.location,it)}}}}E()}function T(){P();for(let U in n){let V=n[U];for(let W in V){let F=V[W];for(let k in F){let Q=F[k];for(let Y in Q)h(Q[Y].object),delete Q[Y];delete F[k]}}delete n[U]}}function v(U){if(n[U.id]===void 0)return;let V=n[U.id];for(let W in V){let F=V[W];for(let k in F){let Q=F[k];for(let Y in Q)h(Q[Y].object),delete Q[Y];delete F[k]}}delete n[U.id]}function b(U){for(let V in n){let W=n[V];for(let F in W){let k=W[F];if(k[U.id]===void 0)continue;let Q=k[U.id];for(let Y in Q)h(Q[Y].object),delete Q[Y];delete k[U.id]}}}function x(U){for(let V in n){let W=n[V],F=U.isInstancedMesh===!0?U.id:0,k=W[F];if(k!==void 0){for(let Q in k){let Y=k[Q];for(let rt in Y)h(Y[rt].object),delete Y[rt];delete k[Q]}delete W[F],Object.keys(W).length===0&&delete n[V]}}}function P(){D(),o=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:v,releaseStatesOfObject:x,releaseStatesOfProgram:b,initAttributes:y,enableAttribute:g,disableUnusedAttributes:E}}function Sg(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function a(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function bg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==on&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){let x=b===Ln&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==rn&&b!==In&&!x&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(Gt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),v=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:y,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:C,maxFragmentUniforms:_,maxSamples:T,samples:v}}function Eg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new un,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,y=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{let E=r?0:n,C=E*4,_=p.clippingState||null;c.value=_,_=h(m,d,C,f);for(let T=0;T!==C;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=E}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){let y=u!==null?u.length:0,g=null;if(y!==0){if(g=c.value,m!==!0||g===null){let p=f+y*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let C=0,_=f;C!==y;++C,_+=4)o.copy(u[C]).applyMatrix4(E,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}var ks=4,Tg=6,wg=20,Ag=256,Wr=new Ci,Yu=new Wt,Cl=null,Rl=0,Pl=0,Il=!1,Cg=new R,Qi=new R,Qa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=Cg}=r;Cl=this._renderer.getRenderTarget(),Rl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),Il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Cl,Rl,Pl),this._renderer.xr.enabled=Il,t.scissorTest=!1,Vs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ii||t.mapping===Ji?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Cl=this._renderer.getRenderTarget(),Rl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),Il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:Ln,format:on,colorSpace:sr,depthBuffer:!1},s=Zu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zu(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Rg(r)),this._blurMaterial=Ig(r,t,e),this._ggxMaterial=Pg(r,t,e)}return s}_compileMaterial(t){let e=new ae(new he,t);this._renderer.compile(e,Wr)}_sceneToCubeUV(t,e,n,s,r){let c=new nn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Yu),u.toneMapping=Rn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ae(new Ye,new ei({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,g=y.material,p=!1,E=t.background;E?E.isColor&&(g.color.copy(E),t.background=null,p=!0):(g.color.copy(Yu),p=!0);for(let C=0;C<6;C++){let _=C%3;_===0?(c.up.set(0,l[C],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[C],r.y,r.z)):_===1?(c.up.set(0,0,l[C]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[C],r.z)):(c.up.set(0,l[C],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[C]));let T=this._cubeSize;Vs(s,_*T,C>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(y,c),u.render(t,c)}u.toneMapping=f,u.autoClear=d,t.background=E}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ii||t.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ju());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Vs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Wr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,f=u*d,{_lodMax:m}=this,y=this._sizeLods[n],g=3*y*(n>m-ks?n-m+ks:0),p=4*(this._cubeSize-y);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=m-e,Vs(r,g,p,3*y,2*y),s.setRenderTarget(r),s.render(a,Wr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=m-n,Vs(t,g,p,3*y,2*y),s.setRenderTarget(t),s.render(a,Wr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-ks?s-this._lodMax+ks:0),d=4*(this._cubeSize-h);Vs(e,u,d,3*h,2*h),o.setRenderTarget(e),o.render(c,Wr)}};function Rg(i){let t=[],e=[],n=i,s=i-ks+1+Tg;for(let r=0;r<s;r++){let o=Math.pow(2,n);t.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,d=6,f=3,m=new Float32Array(f*d*u),y=new Float32Array(f*d*u);for(let p=0;p<u;p++){let E=p%3*2/3-1,C=p>2?0:-1,_=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];m.set(_,f*d*p);for(let T=0;T<d;T++){let v=h[T*2]*2-1,b=h[T*2+1]*2-1;p===0?Qi.set(1,b,v):p===1?Qi.set(-v,1,-b):p===2?Qi.set(-v,b,1):p===3?Qi.set(-1,b,-v):p===4?Qi.set(-v,-1,b):Qi.set(v,b,-1),Qi.toArray(y,(p*d+T)*f)}}let g=new he;g.setAttribute("position",new Re(m,f)),g.setAttribute("outputDirection",new Re(y,f)),e.push(new ae(g,null)),n>ks&&n--}return{lodMeshes:e,sizeLods:t}}function Zu(i,t,e){let n=new sn(i,t,e);return n.texture.mapping=Br,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Pg(i,t,e){return new fn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ag,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ig(i,t,e){return new fn({name:"SphericalGaussianBlur",defines:{SAMPLES:wg,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ju(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nc(),fragmentShader:`

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
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ku(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function nc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var tc=class extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ur(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ye(5,5,5),r=new fn({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Vn});r.uniforms.tEquirect.value=e;let o=new ae(s,r),a=e.minFilter;return e.minFilter===kn&&(e.minFilter=Fe),new ra(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};function Lg(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===la||f===ha)if(t.has(d)){let m=t.get(d).texture;return a(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let y=new tc(m.height);return y.fromEquirectangularTexture(i,d),t.set(d,y),d.addEventListener("dispose",l),a(y.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,m=f===la||f===ha,y=f===Ii||f===Ji;if(m||y){let g=e.get(d),p=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new Qa(i)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),g.texture;if(g!==void 0)return g.texture;{let E=d.image;return m&&E&&E.height>0||y&&E&&c(E)?(n===null&&(n=new Qa(i)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,e.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function a(d,f){return f===la?d.mapping=Ii:f===ha&&(d.mapping=Ji),d}function c(d){let f=0,m=6;for(let y=0;y<m;y++)d[y]!==void 0&&f++;return f===m}function l(d){let f=d.target;f.removeEventListener("dispose",l);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Dg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Hi("WebGLRenderer: "+n+" extension not supported."),s}}}function Ng(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,m=u.attributes.position,y=0;if(m===void 0)return;if(f!==null){let E=f.array;y=f.version;for(let C=0,_=E.length;C<_;C+=3){let T=E[C+0],v=E[C+1],b=E[C+2];d.push(T,v,v,b,b,T)}}else{let E=m.array;y=m.version;for(let C=0,_=E.length/3-1;C<_;C+=3){let T=C+0,v=C+1,b=C+2;d.push(T,v,v,b,b,T)}}let g=new(m.count>=65535?lr:cr)(d,1);g.version=y;let p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Ug(i,t,e){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*o),e.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let y=0;for(let g=0;g<f;g++)y+=d[g];e.update(y,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Fg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:qt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Bg(i,t,e){let n=new WeakMap,s=new Pe;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let P=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",P)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,y=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],C=0;f===!0&&(C=1),m===!0&&(C=2),y===!0&&(C=3);let _=a.attributes.position.count*C,T=1;_>t.maxTextureSize&&(T=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let v=new Float32Array(_*T*4*u),b=new ar(v,_,T,u);b.type=In,b.needsUpdate=!0;let x=C*4;for(let D=0;D<u;D++){let U=g[D],V=p[D],W=E[D],F=_*T*4*D;for(let k=0;k<U.count;k++){let Q=k*x;f===!0&&(s.fromBufferAttribute(U,k),v[F+Q+0]=s.x,v[F+Q+1]=s.y,v[F+Q+2]=s.z,v[F+Q+3]=0),m===!0&&(s.fromBufferAttribute(V,k),v[F+Q+4]=s.x,v[F+Q+5]=s.y,v[F+Q+6]=s.z,v[F+Q+7]=0),y===!0&&(s.fromBufferAttribute(W,k),v[F+Q+8]=s.x,v[F+Q+9]=s.y,v[F+Q+10]=s.z,v[F+Q+11]=W.itemSize===4?s.w:1)}}d={count:u,texture:b,size:new ut(_,T)},n.set(a,d),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let y=0;y<l.length;y++)f+=l[y];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Og(i,t,e,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,d=t.get(l,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var zg={[ol]:"LINEAR_TONE_MAPPING",[al]:"REINHARD_TONE_MAPPING",[cl]:"CINEON_TONE_MAPPING",[Fr]:"ACES_FILMIC_TONE_MAPPING",[hl]:"AGX_TONE_MAPPING",[ul]:"NEUTRAL_TONE_MAPPING",[ll]:"CUSTOM_TONE_MAPPING"};function Vg(i,t,e,n,s,r){let o=new sn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new he;l.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Jt([0,2,0,0,2,0],2));let h=new Xo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new ae(l,h),d=new Ci(-1,1,1,-1,0,1),f=null,m=null,y=!1,g,p=null,E=[],C=!1;this.setSize=function(_,T){o.setSize(_,T),a!==null&&a.setSize(_,T),c!==null&&c.setSize(_,T);for(let v=0;v<E.length;v++){let b=E[v];b.setSize&&b.setSize(_,T)}},this.setEffects=function(_){E=_,C=E.length>0&&E[0].isRenderPass===!0;let T=o.width,v=o.height;E.length>0&&a===null&&(a=new sn(T,v,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new sn(T,v,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));for(let b=0;b<E.length;b++){let x=E[b];x.setSize&&x.setSize(T,v)}},this.begin=function(_,T){if(y||_.toneMapping===Rn&&E.length===0)return!1;if(p=T,T!==null){let v=T.width,b=T.height;(o.width!==v||o.height!==b)&&this.setSize(v,b)}return C===!1&&_.setRenderTarget(o),g=_.toneMapping,_.toneMapping=Rn,!0},this.hasRenderPass=function(){return C},this.end=function(_,T){_.toneMapping=g,y=!0;let v=o,b=a;for(let x=0;x<E.length;x++){let P=E[x];P.enabled!==!1&&(P.render(_,b,v,T),P.needsSwap!==!1&&(v=b,b=b===a?c:a))}if(f!==_.outputColorSpace||m!==_.toneMapping){f=_.outputColorSpace,m=_.toneMapping,h.defines={},oe.getTransfer(f)===xe&&(h.defines.SRGB_TRANSFER="");let x=zg[m];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=v.texture,_.setRenderTarget(p),_.render(u,d),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var gd=new Qe,Nl=new Ei(1,1),_d=new ar,xd=new Uo,yd=new ur,$u=[],ju=[],Qu=new Float32Array(16),td=new Float32Array(9),ed=new Float32Array(4);function Gs(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=$u[s];if(r===void 0&&(r=new Float32Array(s),$u[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ic(i,t){let e=ju[t];e===void 0&&(e=new Int32Array(t),ju[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function kg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Hg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function Gg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function Wg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function Xg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Be(e,n))return;ed.set(n),i.uniformMatrix2fv(this.addr,!1,ed),Oe(e,n)}}function qg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Be(e,n))return;td.set(n),i.uniformMatrix3fv(this.addr,!1,td),Oe(e,n)}}function Yg(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Be(e,n))return;Qu.set(n),i.uniformMatrix4fv(this.addr,!1,Qu),Oe(e,n)}}function Zg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function $g(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function jg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function t_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function e_(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function n_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nl.compareFunction=e.isReversedDepthBuffer()?Ka:Ja,r=Nl):r=gd,e.setTexture2D(t||r,s)}function i_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||xd,s)}function s_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||yd,s)}function r_(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||_d,s)}function o_(i){switch(i){case 5126:return kg;case 35664:return Hg;case 35665:return Gg;case 35666:return Wg;case 35674:return Xg;case 35675:return qg;case 35676:return Yg;case 5124:case 35670:return Zg;case 35667:case 35671:return Jg;case 35668:case 35672:return Kg;case 35669:case 35673:return $g;case 5125:return jg;case 36294:return Qg;case 36295:return t_;case 36296:return e_;case 35678:case 36198:case 36298:case 36306:case 35682:return n_;case 35679:case 36299:case 36307:return i_;case 35680:case 36300:case 36308:case 36293:return s_;case 36289:case 36303:case 36311:case 36292:return r_}}function a_(i,t){i.uniform1fv(this.addr,t)}function c_(i,t){let e=Gs(t,this.size,2);i.uniform2fv(this.addr,e)}function l_(i,t){let e=Gs(t,this.size,3);i.uniform3fv(this.addr,e)}function h_(i,t){let e=Gs(t,this.size,4);i.uniform4fv(this.addr,e)}function u_(i,t){let e=Gs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function d_(i,t){let e=Gs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function f_(i,t){let e=Gs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function p_(i,t){i.uniform1iv(this.addr,t)}function m_(i,t){i.uniform2iv(this.addr,t)}function g_(i,t){i.uniform3iv(this.addr,t)}function __(i,t){i.uniform4iv(this.addr,t)}function x_(i,t){i.uniform1uiv(this.addr,t)}function y_(i,t){i.uniform2uiv(this.addr,t)}function v_(i,t){i.uniform3uiv(this.addr,t)}function M_(i,t){i.uniform4uiv(this.addr,t)}function S_(i,t,e){let n=this.cache,s=t.length,r=ic(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Nl:o=gd;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function b_(i,t,e){let n=this.cache,s=t.length,r=ic(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||xd,r[o])}function E_(i,t,e){let n=this.cache,s=t.length,r=ic(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||yd,r[o])}function T_(i,t,e){let n=this.cache,s=t.length,r=ic(e,s);Be(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||_d,r[o])}function w_(i){switch(i){case 5126:return a_;case 35664:return c_;case 35665:return l_;case 35666:return h_;case 35674:return u_;case 35675:return d_;case 35676:return f_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return __;case 5125:return x_;case 36294:return y_;case 36295:return v_;case 36296:return M_;case 35678:case 36198:case 36298:case 36306:case 35682:return S_;case 35679:case 36299:case 36307:return b_;case 35680:case 36300:case 36308:case 36293:return E_;case 36289:case 36303:case 36311:case 36292:return T_}}var Ul=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=o_(e.type)}},Fl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=w_(e.type)}},Bl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ll=/(\w+)(\])?(\[|\.)?/g;function nd(i,t){i.seq.push(t),i.map[t.id]=t}function A_(i,t,e){let n=i.name,s=n.length;for(Ll.lastIndex=0;;){let r=Ll.exec(n),o=Ll.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){nd(e,l===void 0?new Ul(a,i,t):new Fl(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Bl(a),nd(e,u)),e=u}}}var Hs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),c=t.getUniformLocation(e,a.name);A_(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function id(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var C_=37297,R_=0;function P_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var sd=new Kt;function I_(i){oe._getMatrix(sd,oe.workingColorSpace,i);let t=`mat3( ${sd.elements.map(e=>e.toFixed(4))} )`;switch(oe.getTransfer(i)){case rr:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function rd(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+P_(i.getShaderSource(t),a)}else return r}function L_(i,t){let e=I_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var D_={[ol]:"Linear",[al]:"Reinhard",[cl]:"Cineon",[Fr]:"ACESFilmic",[hl]:"AgX",[ul]:"Neutral",[ll]:"Custom"};function N_(i,t){let e=D_[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ja=new R;function U_(){oe.getLuminanceCoefficients(ja);let i=ja.x.toFixed(4),t=ja.y.toFixed(4),e=ja.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function B_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function O_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function qr(i){return i!==""}function od(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ad(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var z_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ol(i){return i.replace(z_,k_)}var V_=new Map;function k_(i,t){let e=ie[t];if(e===void 0){let n=V_.get(t);if(n!==void 0)e=ie[n],Gt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ol(e)}var H_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cd(i){return i.replace(H_,G_)}function G_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ld(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}var W_={[Ur]:"SHADOWMAP_TYPE_PCF",[Us]:"SHADOWMAP_TYPE_VSM"};function X_(i){return W_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var q_={[Ii]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[Br]:"ENVMAP_TYPE_CUBE_UV"};function Y_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":q_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Z_={[Ji]:"ENVMAP_MODE_REFRACTION"};function J_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Z_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var K_={[rl]:"ENVMAP_BLENDING_MULTIPLY",[bu]:"ENVMAP_BLENDING_MIX",[Eu]:"ENVMAP_BLENDING_ADD"};function $_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":K_[i.combine]||"ENVMAP_BLENDING_NONE"}function j_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Q_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=X_(e),l=Y_(e),h=J_(e),u=$_(e),d=j_(e),f=F_(e),m=B_(r),y=s.createProgram(),g,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(qr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(qr).join(`
`),p.length>0&&(p+=`
`)):(g=[ld(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),p=[ld(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?ie.tonemapping_pars_fragment:"",e.toneMapping!==Rn?N_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,L_("linearToOutputTexel",e.outputColorSpace),U_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qr).join(`
`)),o=Ol(o),o=od(o,e),o=ad(o,e),a=Ol(a),a=od(a,e),a=ad(a,e),o=cd(o),a=cd(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let C=E+g+o,_=E+p+a,T=id(s,s.VERTEX_SHADER,C),v=id(s,s.FRAGMENT_SHADER,_);s.attachShader(y,T),s.attachShader(y,v),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function b(U){if(i.debug.checkShaderErrors){let V=s.getProgramInfoLog(y)||"",W=s.getShaderInfoLog(T)||"",F=s.getShaderInfoLog(v)||"",k=V.trim(),Q=W.trim(),Y=F.trim(),rt=!0,et=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(rt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,T,v);else{let st=rd(s,T,"vertex"),it=rd(s,v,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+k+`
`+st+`
`+it)}else k!==""?Gt("WebGLProgram: Program Info Log:",k):(Q===""||Y==="")&&(et=!1);et&&(U.diagnostics={runnable:rt,programLog:k,vertexShader:{log:Q,prefix:g},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(T),s.deleteShader(v),x=new Hs(s,y),P=O_(s,y)}let x;this.getUniforms=function(){return x===void 0&&b(this),x};let P;this.getAttributes=function(){return P===void 0&&b(this),P};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(y,C_)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=R_++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=v,this}var tx=0,zl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Vl(t),e.set(t,n)),n}},Vl=class{constructor(t){this.id=tx++,this.code=t,this.usedTimes=0}};function ex(i){return i===Di||i===Hr||i===Gr}function nx(i,t,e,n,s,r){let o=new Ts,a=new zl,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,P,D,U,V,W){let F=U.fog,k=V.geometry,Q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,rt=t.get(x.envMap||Q,Y),et=rt&&rt.mapping===Br?rt.image.height:null,st=f[x.type];x.precision!==null&&(d=n.getMaxPrecision(x.precision),d!==x.precision&&Gt("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));let it=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,bt=it!==void 0?it.length:0,vt=0;k.morphAttributes.position!==void 0&&(vt=1),k.morphAttributes.normal!==void 0&&(vt=2),k.morphAttributes.color!==void 0&&(vt=3);let Ut,zt,te,nt;if(st){let Ee=Gn[st];Ut=Ee.vertexShader,zt=Ee.fragmentShader}else{Ut=x.vertexShader,zt=x.fragmentShader;let Ee=a.getVertexShaderStage(x),me=a.getFragmentShaderStage(x);a.update(x,Ee,me),te=Ee.id,nt=me.id}let ct=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Ot=V.isInstancedMesh===!0,Tt=V.isBatchedMesh===!0,Ht=!!x.map,ee=!!x.matcap,ot=!!rt,N=!!x.aoMap,X=!!x.lightMap,Z=!!x.bumpMap&&x.wireframe===!1,j=!!x.normalMap,ht=!!x.displacementMap,dt=!!x.emissiveMap,pt=!!x.metalnessMap,St=!!x.roughnessMap,B=x.anisotropy>0,Xt=x.clearcoat>0,Yt=x.dispersion>0,I=x.retroreflectivity>0,M=x.iridescence>0,S=x.sheen>0,A=x.transmission>0,L=B&&!!x.anisotropyMap,O=Xt&&!!x.clearcoatMap,$=Xt&&!!x.clearcoatNormalMap,z=Xt&&!!x.clearcoatRoughnessMap,q=M&&!!x.iridescenceMap,at=M&&!!x.iridescenceThicknessMap,_t=S&&!!x.sheenColorMap,mt=S&&!!x.sheenRoughnessMap,gt=!!x.specularMap,Lt=!!x.specularColorMap,Vt=!!x.specularIntensityMap,$t=A&&!!x.transmissionMap,G=A&&!!x.thicknessMap,yt=!!x.gradientMap,lt=!!x.alphaMap,Mt=x.alphaTest>0,Ct=!!x.alphaHash,ft=!!x.extensions,kt=Rn;x.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(kt=i.toneMapping);let Ft={shaderID:st,shaderType:x.type,shaderName:x.name,vertexShader:Ut,fragmentShader:zt,defines:x.defines,customVertexShaderID:te,customFragmentShaderID:nt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Tt,batchingColor:Tt&&V._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&V.instanceColor!==null,instancingMorph:Ot&&V.morphTexture!==null,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ht,matcap:ee,envMap:ot,envMapMode:ot&&rt.mapping,envMapCubeUVHeight:et,aoMap:N,lightMap:X,bumpMap:Z,normalMap:j,displacementMap:ht,emissiveMap:dt,normalMapObjectSpace:j&&x.normalMapType===wu,normalMapTangentSpace:j&&x.normalMapType===Za,packedNormalMap:j&&x.normalMapType===Za&&ex(x.normalMap.format),metalnessMap:pt,roughnessMap:St,anisotropy:B,anisotropyMap:L,clearcoat:Xt,clearcoatMap:O,clearcoatNormalMap:$,clearcoatRoughnessMap:z,dispersion:Yt,retroreflection:I,iridescence:M,iridescenceMap:q,iridescenceThicknessMap:at,sheen:S,sheenColorMap:_t,sheenRoughnessMap:mt,specularMap:gt,specularColorMap:Lt,specularIntensityMap:Vt,transmission:A,transmissionMap:$t,thicknessMap:G,gradientMap:yt,opaque:x.transparent===!1&&x.blending===Fs&&x.alphaToCoverage===!1,alphaMap:lt,alphaTest:Mt,alphaHash:Ct,combine:x.combine,mapUv:Ht&&m(x.map.channel),aoMapUv:N&&m(x.aoMap.channel),lightMapUv:X&&m(x.lightMap.channel),bumpMapUv:Z&&m(x.bumpMap.channel),normalMapUv:j&&m(x.normalMap.channel),displacementMapUv:ht&&m(x.displacementMap.channel),emissiveMapUv:dt&&m(x.emissiveMap.channel),metalnessMapUv:pt&&m(x.metalnessMap.channel),roughnessMapUv:St&&m(x.roughnessMap.channel),anisotropyMapUv:L&&m(x.anisotropyMap.channel),clearcoatMapUv:O&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:$&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:q&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:mt&&m(x.sheenRoughnessMap.channel),specularMapUv:gt&&m(x.specularMap.channel),specularColorMapUv:Lt&&m(x.specularColorMap.channel),specularIntensityMapUv:Vt&&m(x.specularIntensityMap.channel),transmissionMapUv:$t&&m(x.transmissionMap.channel),thicknessMapUv:G&&m(x.thicknessMap.channel),alphaMapUv:lt&&m(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(j||B),vertexNormals:!!k.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!k.attributes.uv&&(Ht||lt),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||k.attributes.normal===void 0&&j===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xt,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:vt,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:kt,decodeVideoTexture:Ht&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===xe,decodeVideoTextureEmissive:dt&&x.emissiveMap.isVideoTexture===!0&&oe.getTransfer(x.emissiveMap.colorSpace)===xe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ce,flipSided:x.side===tn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ft&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ft&&x.extensions.multiDraw===!0||Tt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function g(x){let P=[];if(x.shaderID?P.push(x.shaderID):(P.push(x.customVertexShaderID),P.push(x.customFragmentShaderID)),x.defines!==void 0)for(let D in x.defines)P.push(D),P.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(p(P,x),E(P,x),P.push(i.outputColorSpace)),P.push(x.customProgramCacheKey),P.join()}function p(x,P){x.push(P.precision),x.push(P.outputColorSpace),x.push(P.envMapMode),x.push(P.envMapCubeUVHeight),x.push(P.mapUv),x.push(P.alphaMapUv),x.push(P.lightMapUv),x.push(P.aoMapUv),x.push(P.bumpMapUv),x.push(P.normalMapUv),x.push(P.displacementMapUv),x.push(P.emissiveMapUv),x.push(P.metalnessMapUv),x.push(P.roughnessMapUv),x.push(P.anisotropyMapUv),x.push(P.clearcoatMapUv),x.push(P.clearcoatNormalMapUv),x.push(P.clearcoatRoughnessMapUv),x.push(P.iridescenceMapUv),x.push(P.iridescenceThicknessMapUv),x.push(P.sheenColorMapUv),x.push(P.sheenRoughnessMapUv),x.push(P.specularMapUv),x.push(P.specularColorMapUv),x.push(P.specularIntensityMapUv),x.push(P.transmissionMapUv),x.push(P.thicknessMapUv),x.push(P.combine),x.push(P.fogExp2),x.push(P.sizeAttenuation),x.push(P.morphTargetsCount),x.push(P.morphAttributeCount),x.push(P.numSunLights),x.push(P.numDirLights),x.push(P.numPointLights),x.push(P.numSpotLights),x.push(P.numSpotLightMaps),x.push(P.numHemiLights),x.push(P.numRectAreaLights),x.push(P.numSunLightShadows),x.push(P.numDirLightShadows),x.push(P.numPointLightShadows),x.push(P.numSpotLightShadows),x.push(P.numSpotLightShadowsWithMaps),x.push(P.numLightProbes),x.push(P.shadowMapType),x.push(P.toneMapping),x.push(P.numClippingPlanes),x.push(P.numClipIntersection),x.push(P.depthPacking)}function E(x,P){o.disableAll(),P.instancing&&o.enable(0),P.instancingColor&&o.enable(1),P.instancingMorph&&o.enable(2),P.matcap&&o.enable(3),P.envMap&&o.enable(4),P.normalMapObjectSpace&&o.enable(5),P.normalMapTangentSpace&&o.enable(6),P.clearcoat&&o.enable(7),P.iridescence&&o.enable(8),P.alphaTest&&o.enable(9),P.vertexColors&&o.enable(10),P.vertexAlphas&&o.enable(11),P.vertexUv1s&&o.enable(12),P.vertexUv2s&&o.enable(13),P.vertexUv3s&&o.enable(14),P.vertexTangents&&o.enable(15),P.anisotropy&&o.enable(16),P.alphaHash&&o.enable(17),P.batching&&o.enable(18),P.dispersion&&o.enable(19),P.retroreflection&&o.enable(24),P.batchingColor&&o.enable(20),P.gradientMap&&o.enable(21),P.packedNormalMap&&o.enable(22),P.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),P.fog&&o.enable(0),P.useFog&&o.enable(1),P.flatShading&&o.enable(2),P.logarithmicDepthBuffer&&o.enable(3),P.reversedDepthBuffer&&o.enable(4),P.skinning&&o.enable(5),P.morphTargets&&o.enable(6),P.morphNormals&&o.enable(7),P.morphColors&&o.enable(8),P.premultipliedAlpha&&o.enable(9),P.shadowMapEnabled&&o.enable(10),P.doubleSided&&o.enable(11),P.flipSided&&o.enable(12),P.useDepthPacking&&o.enable(13),P.dithering&&o.enable(14),P.transmission&&o.enable(15),P.sheen&&o.enable(16),P.opaque&&o.enable(17),P.pointsUvs&&o.enable(18),P.decodeVideoTexture&&o.enable(19),P.decodeVideoTextureEmissive&&o.enable(20),P.alphaToCoverage&&o.enable(21),P.numLightProbeGrids>0&&o.enable(22),P.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function C(x){let P=f[x.type],D;if(P){let U=Gn[P];D=Wu.clone(U.uniforms)}else D=x.uniforms;return D}function _(x,P){let D=h.get(P);return D!==void 0?++D.usedTimes:(D=new Q_(i,P,x,s),l.push(D),h.set(P,D)),D}function T(x){if(--x.usedTimes===0){let P=l.indexOf(x);l[P]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function v(x){a.remove(x)}function b(){a.dispose()}return{getParameters:y,getProgramCacheKey:g,getUniforms:C,acquireProgram:_,releaseProgram:T,releaseShaderCache:v,programs:l,dispose:b}}function ix(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function sx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function hd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ud(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,m,y,g,p){let E=i[t];return E===void 0?(E={id:d.id,object:d,geometry:f,material:m,materialVariant:o(d),groupOrder:y,renderOrder:d.renderOrder,z:g,group:p},i[t]=E):(E.id=d.id,E.object=d,E.geometry=f,E.material=m,E.materialVariant=o(d),E.groupOrder=y,E.renderOrder=d.renderOrder,E.z=g,E.group=p),t++,E}function c(d,f,m,y,g,p,E){E.reversedDepth===!0&&(g=-g);let C=a(d,f,m,y,g,p);m.transmission>0?n.push(C):m.transparent===!0?s.push(C):e.push(C)}function l(d,f,m,y,g,p){let E=a(d,f,m,y,g,p);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):e.unshift(E)}function h(d,f){e.length>1&&e.sort(d||sx),n.length>1&&n.sort(f||hd),s.length>1&&s.sort(f||hd)}function u(){for(let d=t,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function rx(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new ud,i.set(n,[o])):s>=r.length?(o=new ud,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function ox(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new R,color:new Wt};break;case"SpotLight":e={position:new R,direction:new R,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function ax(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var cx=0;function lx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function hx(i){let t=new ox,e=ax(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);let s=new R,r=new ue,o=new ue;function a(l){let h=0,u=0,d=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let f=0,m=0,y=0,g=0,p=0,E=0,C=0,_=0,T=0,v=0,b=0,x=0,P=0,D=0;l.sort(lx);for(let V=0,W=l.length;V<W;V++){let F=l[V],k=F.color,Q=F.intensity,Y=F.distance,rt=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Di?rt=F.shadow.map.texture:rt=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)h+=k.r*Q,u+=k.g*Q,d+=k.b*Q;else if(F.isLightProbe){for(let et=0;et<9;et++)n.probe[et].addScaledVector(F.sh.coefficients[et],Q);D++}else if(F.isSunLight){let et=t.get(F);if(et.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let st=F.shadow,it=e.get(F);it.shadowIntensity=st.intensity,it.shadowBias=st.bias,it.shadowNormalBias=st.normalBias,it.shadowRadius=st.radius,it.shadowMapSize.copy(st.mapSize).multiply(st.getFrameExtents()),n.sunShadow[m]=it,n.sunShadowMap[m]=rt;let bt=st.getViewportCount();for(let vt=0;vt<bt;vt++)n.sunShadowMatrix[y+vt]=st.getMatrix(vt),n.sunShadowCascade[y+vt]=st._cascadeData[vt];y+=bt,m++}n.sun[f]=et,f++}else if(F.isDirectionalLight){let et=t.get(F);if(et.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let st=F.shadow,it=e.get(F);it.shadowIntensity=st.intensity,it.shadowBias=st.bias,it.shadowNormalBias=st.normalBias,it.shadowRadius=st.radius,it.shadowMapSize=st.mapSize,n.directionalShadow[g]=it,n.directionalShadowMap[g]=rt,n.directionalShadowMatrix[g]=F.shadow.matrix,T++}n.directional[g]=et,g++}else if(F.isSpotLight){let et=t.get(F);et.position.setFromMatrixPosition(F.matrixWorld),et.color.copy(k).multiplyScalar(Q),et.distance=Y,et.coneCos=Math.cos(F.angle),et.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),et.decay=F.decay,n.spot[E]=et;let st=F.shadow;if(F.map&&(n.spotLightMap[x]=F.map,x++,st.updateMatrices(F),F.castShadow&&P++),n.spotLightMatrix[E]=st.matrix,F.castShadow){let it=e.get(F);it.shadowIntensity=st.intensity,it.shadowBias=st.bias,it.shadowNormalBias=st.normalBias,it.shadowRadius=st.radius,it.shadowMapSize=st.mapSize,n.spotShadow[E]=it,n.spotShadowMap[E]=rt,b++}E++}else if(F.isRectAreaLight){let et=t.get(F);et.color.copy(k).multiplyScalar(Q),et.halfWidth.set(F.width*.5,0,0),et.halfHeight.set(0,F.height*.5,0),n.rectArea[C]=et,C++}else if(F.isPointLight){let et=t.get(F);if(et.color.copy(F.color).multiplyScalar(F.intensity),et.distance=F.distance,et.decay=F.decay,F.castShadow){let st=F.shadow,it=e.get(F);it.shadowIntensity=st.intensity,it.shadowBias=st.bias,it.shadowNormalBias=st.normalBias,it.shadowRadius=st.radius,it.shadowMapSize=st.mapSize,it.shadowCameraNear=st.camera.near,it.shadowCameraFar=st.camera.far,n.pointShadow[p]=it,n.pointShadowMap[p]=rt,n.pointShadowMatrix[p]=F.shadow.matrix,v++}n.point[p]=et,p++}else if(F.isHemisphereLight){let et=t.get(F);et.skyColor.copy(F.color).multiplyScalar(Q),et.groundColor.copy(F.groundColor).multiplyScalar(Q),n.hemi[_]=et,_++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let U=n.hash;(U.sunLength!==f||U.directionalLength!==g||U.pointLength!==p||U.spotLength!==E||U.rectAreaLength!==C||U.hemiLength!==_||U.numSunShadows!==m||U.numDirectionalShadows!==T||U.numPointShadows!==v||U.numSpotShadows!==b||U.numSpotMaps!==x||U.numLightProbes!==D)&&(n.sun.length=f,n.directional.length=g,n.spot.length=E,n.rectArea.length=C,n.point.length=p,n.hemi.length=_,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=v,n.pointShadowMap.length=v,n.pointShadowMatrix.length=v,n.spotShadow.length=b,n.spotShadowMap.length=b,n.spotLightMatrix.length=b+x-P,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=D,U.sunLength=f,U.directionalLength=g,U.pointLength=p,U.spotLength=E,U.rectAreaLength=C,U.hemiLength=_,U.numSunShadows=m,U.numDirectionalShadows=T,U.numPointShadows=v,U.numSpotShadows=b,U.numSpotMaps=x,U.numLightProbes=D,n.version=cx++)}function c(l,h){let u=0,d=0,f=0,m=0,y=0,g=0,p=h.matrixWorldInverse;for(let E=0,C=l.length;E<C;E++){let _=l[E];if(_.isSunLight){let T=n.sun[u];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(p),u++}else if(_.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),d++}else if(_.isSpotLight){let T=n.spot[m];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),m++}else if(_.isRectAreaLight){let T=n.rectArea[y];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(_.width*.5,0,0),T.halfHeight.set(0,_.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),y++}else if(_.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){let T=n.hemi[g];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:n}}function dd(i){let t=new hx(i),e=[],n=[],s=[];function r(d){u.camera=d,e.length=0,n.length=0,s.length=0}function o(d){e.push(d)}function a(d){n.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function h(d){t.setupView(e,d)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function ux(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new dd(i),t.set(s,[a])):r>=o.length?(a=new dd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var dx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fx=`uniform sampler2D shadow_pass;
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
}`,px=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],mx=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],fd=new ue,Xr=new R,Dl=new R;function gx(i,t,e){let n=new As,s=new ut,r=new ut,o=new Pe,a=new qo,c=new Yo,l={},h=e.maxTextureSize,u={[Pi]:tn,[tn]:Pi,[Ce]:Ce},d=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:dx,fragmentShader:fx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new he;m.setAttribute("position",new Re(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ae(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ur;let p=this.type;this.render=function(v,b,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||v.length===0)return;this.type===ca&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ur);let P=i.getRenderTarget(),D=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Vn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let W=p!==this.type;W&&b.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(k=>k.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,k=v.length;F<k;F++){let Q=v[F],Y=Q.shadow;if(Y===void 0){Gt("WebGLShadowMap:",Q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let rt=Y.getFrameExtents();s.multiply(rt),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,Y.mapSize.y=r.y));let et=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=et,Y.map===null||W===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Us){if(Q.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new sn(s.x,s.y,{format:Di,type:Ln,minFilter:Fe,magFilter:Fe,generateMipmaps:!1}),Y.map.texture.name=Q.name+".shadowMap",Y.map.depthTexture=new Ei(s.x,s.y,In),Y.map.depthTexture.name=Q.name+".shadowMapDepth",Y.map.depthTexture.format=On,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ue,Y.map.depthTexture.magFilter=Ue}else Q.isPointLight?(Y.map=new tc(s.x),Y.map.depthTexture=new zo(s.x,Pn)):(Y.map=new sn(s.x,s.y),Y.map.depthTexture=new Ei(s.x,s.y,Pn)),Y.map.depthTexture.name=Q.name+".shadowMap",Y.map.depthTexture.format=On,this.type===Ur?(Y.map.depthTexture.compareFunction=et?Ka:Ja,Y.map.depthTexture.minFilter=Fe,Y.map.depthTexture.magFilter=Fe):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ue,Y.map.depthTexture.magFilter=Ue);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let st=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();Q.isPointLight!==!0&&Y.updateMatrices(Q,x);for(let it=0;it<st;it++){let bt=Y.getCamera(it);if(Q.isPointLight){let vt=Y.camera,Ut=Y.matrix,zt=Q.distance||vt.far;zt!==vt.far&&(vt.far=zt,vt.updateProjectionMatrix()),Xr.setFromMatrixPosition(Q.matrixWorld),vt.position.copy(Xr),Dl.copy(vt.position),Dl.add(px[it]),vt.up.copy(mx[it]),vt.lookAt(Dl),vt.updateMatrixWorld(),Ut.makeTranslation(-Xr.x,-Xr.y,-Xr.z),fd.multiplyMatrices(vt.projectionMatrix,vt.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(fd,vt.coordinateSystem,vt.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,it),i.clear();else{it===0&&(i.setRenderTarget(Y.map),i.clear());let vt=Y.getViewport(it);o.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),V.viewport(o)}n=Y.getFrustum(it),_(b,x,bt,Q,this.type)}Y.isPointLightShadow!==!0&&this.type===Us&&E(Y,x),Y.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(P,D,U)};function E(v,b){let x=t.update(y);d.defines.VSM_SAMPLES!==v.blurSamples&&(d.defines.VSM_SAMPLES=v.blurSamples,f.defines.VSM_SAMPLES=v.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),v.mapPass===null?v.mapPass=new sn(s.x,s.y,{format:Di,type:Ln}):(v.mapPass.width!==v.map.width||v.mapPass.height!==v.map.height)&&v.mapPass.setSize(v.map.width,v.map.height),d.uniforms.shadow_pass.value=v.map.depthTexture,d.uniforms.resolution.value.set(v.map.width,v.map.height),d.uniforms.radius.value=v.radius,i.setRenderTarget(v.mapPass),i.clear(),i.renderBufferDirect(b,null,x,d,y,null),f.uniforms.shadow_pass.value=v.mapPass.texture,f.uniforms.resolution.value.set(v.map.width,v.map.height),f.uniforms.radius.value=v.radius,i.setRenderTarget(v.map),i.clear(),i.renderBufferDirect(b,null,x,f,y,null)}function C(v,b,x,P){let D=null,U=x.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(U!==void 0)D=U;else if(D=x.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){let V=D.uuid,W=b.uuid,F=l[V];F===void 0&&(F={},l[V]=F);let k=F[W];k===void 0&&(k=D.clone(),F[W]=k,b.addEventListener("dispose",T)),D=k}if(D.visible=b.visible,D.wireframe=b.wireframe,P===Us?D.side=b.shadowSide!==null?b.shadowSide:b.side:D.side=b.shadowSide!==null?b.shadowSide:u[b.side],D.alphaMap=b.alphaMap,D.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,D.map=b.map,D.clipShadows=b.clipShadows,D.clippingPlanes=b.clippingPlanes,D.clipIntersection=b.clipIntersection,D.displacementMap=b.displacementMap,D.displacementScale=b.displacementScale,D.displacementBias=b.displacementBias,D.wireframeLinewidth=b.wireframeLinewidth,D.linewidth=b.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let V=i.properties.get(D);V.light=x}return D}function _(v,b,x,P,D){if(v.visible===!1)return;if(v.layers.test(b.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&D===Us)&&(!v.frustumCulled||v.intersectsFrustum(n))){v.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,v.matrixWorld);let W=t.update(v),F=v.material;if(Array.isArray(F)){let k=W.groups;for(let Q=0,Y=k.length;Q<Y;Q++){let rt=k[Q],et=F[rt.materialIndex];if(et&&et.visible){let st=C(v,et,P,D);v.onBeforeShadow(i,v,b,x,W,st,rt),i.renderBufferDirect(x,null,W,st,v,rt),v.onAfterShadow(i,v,b,x,W,st,rt)}}}else if(F.visible){let k=C(v,F,P,D);v.onBeforeShadow(i,v,b,x,W,k,null),i.renderBufferDirect(x,null,W,k,v,null),v.onAfterShadow(i,v,b,x,W,k,null)}}let V=v.children;for(let W=0,F=V.length;W<F;W++)_(V[W],b,x,P,D)}function T(v){v.target.removeEventListener("dispose",T);for(let x in l){let P=l[x],D=v.target.uuid;D in P&&(P[D].dispose(),delete P[D])}}}function _x(i,t){function e(){let G=!1,yt=new Pe,lt=null,Mt=new Pe(0,0,0,0);return{setMask:function(Ct){lt!==Ct&&!G&&(i.colorMask(Ct,Ct,Ct,Ct),lt=Ct)},setLocked:function(Ct){G=Ct},setClear:function(Ct,ft,kt,Ft,Ee){Ee===!0&&(Ct*=Ft,ft*=Ft,kt*=Ft),yt.set(Ct,ft,kt,Ft),Mt.equals(yt)===!1&&(i.clearColor(Ct,ft,kt,Ft),Mt.copy(yt))},reset:function(){G=!1,lt=null,Mt.set(-1,0,0,0)}}}function n(){let G=!1,yt=!1,lt=null,Mt=null,Ct=null;return{setReversed:function(ft){if(yt!==ft){let kt=t.get("EXT_clip_control");ft?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT),yt=ft;let Ft=Ct;Ct=null,this.setClear(Ft)}},getReversed:function(){return yt},setTest:function(ft){ft?ct(i.DEPTH_TEST):xt(i.DEPTH_TEST)},setMask:function(ft){lt!==ft&&!G&&(i.depthMask(ft),lt=ft)},setFunc:function(ft){if(yt&&(ft=Ou[ft]),Mt!==ft){switch(ft){case Ao:i.depthFunc(i.NEVER);break;case Co:i.depthFunc(i.ALWAYS);break;case Ro:i.depthFunc(i.LESS);break;case _s:i.depthFunc(i.LEQUAL);break;case Po:i.depthFunc(i.EQUAL);break;case Io:i.depthFunc(i.GEQUAL);break;case Lo:i.depthFunc(i.GREATER);break;case Do:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=ft}},setLocked:function(ft){G=ft},setClear:function(ft){Ct!==ft&&(Ct=ft,yt&&(ft=1-ft),i.clearDepth(ft))},reset:function(){G=!1,lt=null,Mt=null,Ct=null,yt=!1}}}function s(){let G=!1,yt=null,lt=null,Mt=null,Ct=null,ft=null,kt=null,Ft=null,Ee=null;return{setTest:function(me){G||(me?ct(i.STENCIL_TEST):xt(i.STENCIL_TEST))},setMask:function(me){yt!==me&&!G&&(i.stencilMask(me),yt=me)},setFunc:function(me,Mn,Un){(lt!==me||Mt!==Mn||Ct!==Un)&&(i.stencilFunc(me,Mn,Un),lt=me,Mt=Mn,Ct=Un)},setOp:function(me,Mn,Un){(ft!==me||kt!==Mn||Ft!==Un)&&(i.stencilOp(me,Mn,Un),ft=me,kt=Mn,Ft=Un)},setLocked:function(me){G=me},setClear:function(me){Ee!==me&&(i.clearStencil(me),Ee=me)},reset:function(){G=!1,yt=null,lt=null,Mt=null,Ct=null,ft=null,kt=null,Ft=null,Ee=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,m=[],y=null,g=!1,p=null,E=null,C=null,_=null,T=null,v=null,b=null,x=new Wt(0,0,0),P=0,D=!1,U=null,V=null,W=null,F=null,k=null,Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,rt=0,et=i.getParameter(i.VERSION);et.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(et)[1]),Y=rt>=1):et.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),Y=rt>=2);let st=null,it={},bt=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),Ut=new Pe().fromArray(bt),zt=new Pe().fromArray(vt);function te(G,yt,lt,Mt){let Ct=new Uint8Array(4),ft=i.createTexture();i.bindTexture(G,ft),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let kt=0;kt<lt;kt++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,Mt,0,i.RGBA,i.UNSIGNED_BYTE,Ct):i.texImage2D(yt+kt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ct);return ft}let nt={};nt[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),nt[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),nt[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ct(i.DEPTH_TEST),o.setFunc(_s),Z(!1),j(Qc),ct(i.CULL_FACE),N(Vn);function ct(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function xt(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Ot(G,yt){return d[G]!==yt?(i.bindFramebuffer(G,yt),d[G]=yt,G===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=yt),G===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function Tt(G,yt){let lt=m,Mt=!1;if(G){lt=f.get(yt),lt===void 0&&(lt=[],f.set(yt,lt));let Ct=G.textures;if(lt.length!==Ct.length||lt[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,kt=Ct.length;ft<kt;ft++)lt[ft]=i.COLOR_ATTACHMENT0+ft;lt.length=Ct.length,Mt=!0}}else lt[0]!==i.BACK&&(lt[0]=i.BACK,Mt=!0);Mt&&i.drawBuffers(lt)}function Ht(G){return y!==G?(i.useProgram(G),y=G,!0):!1}let ee={[Zi]:i.FUNC_ADD,[ou]:i.FUNC_SUBTRACT,[au]:i.FUNC_REVERSE_SUBTRACT};ee[cu]=i.MIN,ee[lu]=i.MAX;let ot={[hu]:i.ZERO,[uu]:i.ONE,[du]:i.SRC_COLOR,[il]:i.SRC_ALPHA,[xu]:i.SRC_ALPHA_SATURATE,[gu]:i.DST_COLOR,[pu]:i.DST_ALPHA,[fu]:i.ONE_MINUS_SRC_COLOR,[sl]:i.ONE_MINUS_SRC_ALPHA,[_u]:i.ONE_MINUS_DST_COLOR,[mu]:i.ONE_MINUS_DST_ALPHA,[yu]:i.CONSTANT_COLOR,[vu]:i.ONE_MINUS_CONSTANT_COLOR,[Mu]:i.CONSTANT_ALPHA,[Su]:i.ONE_MINUS_CONSTANT_ALPHA};function N(G,yt,lt,Mt,Ct,ft,kt,Ft,Ee,me){if(G===Vn){g===!0&&(xt(i.BLEND),g=!1);return}if(g===!1&&(ct(i.BLEND),g=!0),G!==ru){if(G!==p||me!==D){if((E!==Zi||T!==Zi)&&(i.blendEquation(i.FUNC_ADD),E=Zi,T=Zi),me)switch(G){case Fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tl:i.blendFunc(i.ONE,i.ONE);break;case el:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",G);break}else switch(G){case Fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case el:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nl:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",G);break}C=null,_=null,v=null,b=null,x.set(0,0,0),P=0,p=G,D=me}return}Ct=Ct||yt,ft=ft||lt,kt=kt||Mt,(yt!==E||Ct!==T)&&(i.blendEquationSeparate(ee[yt],ee[Ct]),E=yt,T=Ct),(lt!==C||Mt!==_||ft!==v||kt!==b)&&(i.blendFuncSeparate(ot[lt],ot[Mt],ot[ft],ot[kt]),C=lt,_=Mt,v=ft,b=kt),(Ft.equals(x)===!1||Ee!==P)&&(i.blendColor(Ft.r,Ft.g,Ft.b,Ee),x.copy(Ft),P=Ee),p=G,D=!1}function X(G,yt){G.side===Ce?xt(i.CULL_FACE):ct(i.CULL_FACE);let lt=G.side===tn;yt&&(lt=!lt),Z(lt),G.blending===Fs&&G.transparent===!1?N(Vn):N(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);let Mt=G.stencilWrite;a.setTest(Mt),Mt&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),dt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ct(i.SAMPLE_ALPHA_TO_COVERAGE):xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Z(G){U!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),U=G)}function j(G){G!==iu?(ct(i.CULL_FACE),G!==V&&(G===Qc?i.cullFace(i.BACK):G===su?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xt(i.CULL_FACE),V=G}function ht(G){G!==W&&(Y&&i.lineWidth(G),W=G)}function dt(G,yt,lt){G?(ct(i.POLYGON_OFFSET_FILL),(F!==yt||k!==lt)&&(F=yt,k=lt,o.getReversed()&&(yt=-yt),i.polygonOffset(yt,lt))):xt(i.POLYGON_OFFSET_FILL)}function pt(G){G?ct(i.SCISSOR_TEST):xt(i.SCISSOR_TEST)}function St(G){G===void 0&&(G=i.TEXTURE0+Q-1),st!==G&&(i.activeTexture(G),st=G)}function B(G,yt,lt){lt===void 0&&(st===null?lt=i.TEXTURE0+Q-1:lt=st);let Mt=it[lt];Mt===void 0&&(Mt={type:void 0,texture:void 0},it[lt]=Mt),(Mt.type!==G||Mt.texture!==yt)&&(st!==lt&&(i.activeTexture(lt),st=lt),i.bindTexture(G,yt||nt[G]),Mt.type=G,Mt.texture=yt)}function Xt(){let G=it[st];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Yt(){try{i.compressedTexImage2D(...arguments)}catch(G){qt("WebGLState:",G)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(G){qt("WebGLState:",G)}}function M(){try{i.texSubImage2D(...arguments)}catch(G){qt("WebGLState:",G)}}function S(){try{i.texSubImage3D(...arguments)}catch(G){qt("WebGLState:",G)}}function A(){try{i.compressedTexSubImage2D(...arguments)}catch(G){qt("WebGLState:",G)}}function L(){try{i.compressedTexSubImage3D(...arguments)}catch(G){qt("WebGLState:",G)}}function O(){try{i.texStorage2D(...arguments)}catch(G){qt("WebGLState:",G)}}function $(){try{i.texStorage3D(...arguments)}catch(G){qt("WebGLState:",G)}}function z(){try{i.texImage2D(...arguments)}catch(G){qt("WebGLState:",G)}}function q(){try{i.texImage3D(...arguments)}catch(G){qt("WebGLState:",G)}}function at(G){return u[G]!==void 0?u[G]:i.getParameter(G)}function _t(G,yt){u[G]!==yt&&(i.pixelStorei(G,yt),u[G]=yt)}function mt(G){Ut.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),Ut.copy(G))}function gt(G){zt.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),zt.copy(G))}function Lt(G,yt){let lt=l.get(yt);lt===void 0&&(lt=new WeakMap,l.set(yt,lt));let Mt=lt.get(G);Mt===void 0&&(Mt=i.getUniformBlockIndex(yt,G.name),lt.set(G,Mt))}function Vt(G,yt){let Mt=l.get(yt).get(G);c.get(yt)!==Mt&&(i.uniformBlockBinding(yt,Mt,G.__bindingPointIndex),c.set(yt,Mt))}function $t(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},st=null,it={},d={},f=new WeakMap,m=[],y=null,g=!1,p=null,E=null,C=null,_=null,T=null,v=null,b=null,x=new Wt(0,0,0),P=0,D=!1,U=null,V=null,W=null,F=null,k=null,Ut.set(0,0,i.canvas.width,i.canvas.height),zt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ct,disable:xt,bindFramebuffer:Ot,drawBuffers:Tt,useProgram:Ht,setBlending:N,setMaterial:X,setFlipSided:Z,setCullFace:j,setLineWidth:ht,setPolygonOffset:dt,setScissorTest:pt,activeTexture:St,bindTexture:B,unbindTexture:Xt,compressedTexImage2D:Yt,compressedTexImage3D:I,texImage2D:z,texImage3D:q,pixelStorei:_t,getParameter:at,updateUBOMapping:Lt,uniformBlockBinding:Vt,texStorage2D:O,texStorage3D:$,texSubImage2D:M,texSubImage3D:S,compressedTexSubImage2D:A,compressedTexSubImage3D:L,scissor:mt,viewport:gt,reset:$t}}function xx(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ut,h=new WeakMap,u=new Set,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(I,M){return m?new OffscreenCanvas(I,M):or("canvas")}function g(I,M,S){let A=1,L=Yt(I);if((L.width>S||L.height>S)&&(A=S/Math.max(L.width,L.height)),A<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let O=Math.floor(A*L.width),$=Math.floor(A*L.height);d===void 0&&(d=y(O,$));let z=M?y(O,$):d;return z.width=O,z.height=$,z.getContext("2d").drawImage(I,0,0,O,$),Gt("WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+O+"x"+$+")."),z}else return"data"in I&&Gt("WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),I;return I}function p(I){return I.generateMipmaps}function E(I){i.generateMipmap(I)}function C(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(I,M,S,A,L,O=!1){if(I!==null){if(i[I]!==void 0)return i[I];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let $;A&&($=t.get("EXT_texture_norm16"),$||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let z=M;if(M===i.RED&&(S===i.FLOAT&&(z=i.R32F),S===i.HALF_FLOAT&&(z=i.R16F),S===i.UNSIGNED_BYTE&&(z=i.R8),S===i.UNSIGNED_SHORT&&$&&(z=$.R16_EXT),S===i.SHORT&&$&&(z=$.R16_SNORM_EXT)),M===i.RED_INTEGER&&(S===i.UNSIGNED_BYTE&&(z=i.R8UI),S===i.UNSIGNED_SHORT&&(z=i.R16UI),S===i.UNSIGNED_INT&&(z=i.R32UI),S===i.BYTE&&(z=i.R8I),S===i.SHORT&&(z=i.R16I),S===i.INT&&(z=i.R32I)),M===i.RG&&(S===i.FLOAT&&(z=i.RG32F),S===i.HALF_FLOAT&&(z=i.RG16F),S===i.UNSIGNED_BYTE&&(z=i.RG8),S===i.UNSIGNED_SHORT&&$&&(z=$.RG16_EXT),S===i.SHORT&&$&&(z=$.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(S===i.UNSIGNED_BYTE&&(z=i.RG8UI),S===i.UNSIGNED_SHORT&&(z=i.RG16UI),S===i.UNSIGNED_INT&&(z=i.RG32UI),S===i.BYTE&&(z=i.RG8I),S===i.SHORT&&(z=i.RG16I),S===i.INT&&(z=i.RG32I)),M===i.RGB_INTEGER&&(S===i.UNSIGNED_BYTE&&(z=i.RGB8UI),S===i.UNSIGNED_SHORT&&(z=i.RGB16UI),S===i.UNSIGNED_INT&&(z=i.RGB32UI),S===i.BYTE&&(z=i.RGB8I),S===i.SHORT&&(z=i.RGB16I),S===i.INT&&(z=i.RGB32I)),M===i.RGBA_INTEGER&&(S===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),S===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),S===i.UNSIGNED_INT&&(z=i.RGBA32UI),S===i.BYTE&&(z=i.RGBA8I),S===i.SHORT&&(z=i.RGBA16I),S===i.INT&&(z=i.RGBA32I)),M===i.RGB&&(S===i.UNSIGNED_SHORT&&$&&(z=$.RGB16_EXT),S===i.SHORT&&$&&(z=$.RGB16_SNORM_EXT),S===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),S===i.UNSIGNED_INT_10F_11F_11F_REV&&(z=i.R11F_G11F_B10F)),M===i.RGBA){let q=O?rr:oe.getTransfer(L);S===i.FLOAT&&(z=i.RGBA32F),S===i.HALF_FLOAT&&(z=i.RGBA16F),S===i.UNSIGNED_BYTE&&(z=q===xe?i.SRGB8_ALPHA8:i.RGBA8),S===i.UNSIGNED_SHORT&&$&&(z=$.RGBA16_EXT),S===i.SHORT&&$&&(z=$.RGBA16_SNORM_EXT),S===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),S===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function T(I,M){let S;return I?M===null||M===Pn||M===zs?S=i.DEPTH24_STENCIL8:M===In?S=i.DEPTH32F_STENCIL8:M===Os&&(S=i.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Pn||M===zs?S=i.DEPTH_COMPONENT24:M===In?S=i.DEPTH_COMPONENT32F:M===Os&&(S=i.DEPTH_COMPONENT16),S}function v(I,M){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ue&&I.minFilter!==Fe?Math.log2(Math.max(M.width,M.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?M.mipmaps.length:1}function b(I){let M=I.target;M.removeEventListener("dispose",b),P(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&u.delete(M)}function x(I){let M=I.target;M.removeEventListener("dispose",x),U(M)}function P(I){let M=n.get(I);if(M.__webglInit===void 0)return;let S=I.source,A=f.get(S);if(A){let L=A[M.__cacheKey];L.usedTimes--,L.usedTimes===0&&D(I),Object.keys(A).length===0&&f.delete(S)}n.remove(I)}function D(I){let M=n.get(I);i.deleteTexture(M.__webglTexture);let S=I.source,A=f.get(S);delete A[M.__cacheKey],o.memory.textures--}function U(I){let M=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(M.__webglFramebuffer[A]))for(let L=0;L<M.__webglFramebuffer[A].length;L++)i.deleteFramebuffer(M.__webglFramebuffer[A][L]);else i.deleteFramebuffer(M.__webglFramebuffer[A]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[A])}else{if(Array.isArray(M.__webglFramebuffer))for(let A=0;A<M.__webglFramebuffer.length;A++)i.deleteFramebuffer(M.__webglFramebuffer[A]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let A=0;A<M.__webglColorRenderbuffer.length;A++)M.__webglColorRenderbuffer[A]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[A]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let S=I.textures;for(let A=0,L=S.length;A<L;A++){let O=n.get(S[A]);O.__webglTexture&&(i.deleteTexture(O.__webglTexture),o.memory.textures--),n.remove(S[A])}n.remove(I)}let V=0;function W(){V=0}function F(){return V}function k(I){V=I}function Q(){let I=V;return I>=s.maxTextures&&Gt("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,I}function Y(I){let M=[];return M.push(I.wrapS),M.push(I.wrapT),M.push(I.wrapR||0),M.push(I.magFilter),M.push(I.minFilter),M.push(I.anisotropy),M.push(I.internalFormat),M.push(I.format),M.push(I.type),M.push(I.generateMipmaps),M.push(I.premultiplyAlpha),M.push(I.flipY),M.push(I.unpackAlignment),M.push(I.colorSpace),M.join()}function rt(I,M){let S=n.get(I);if(I.isVideoTexture&&B(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&S.__version!==I.version){let A=I.image;if(A===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(A.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(S,I,M);return}}else I.isExternalTexture&&(S.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,S.__webglTexture,i.TEXTURE0+M)}function et(I,M){let S=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&S.__version!==I.version){xt(S,I,M);return}else I.isExternalTexture&&(S.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,S.__webglTexture,i.TEXTURE0+M)}function st(I,M){let S=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&S.__version!==I.version){xt(S,I,M);return}e.bindTexture(i.TEXTURE_3D,S.__webglTexture,i.TEXTURE0+M)}function it(I,M){let S=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&S.__version!==I.version){Ot(S,I,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+M)}let bt={[xs]:i.REPEAT,[xn]:i.CLAMP_TO_EDGE,[ys]:i.MIRRORED_REPEAT},vt={[Ue]:i.NEAREST,[ua]:i.NEAREST_MIPMAP_NEAREST,[Ki]:i.NEAREST_MIPMAP_LINEAR,[Fe]:i.LINEAR,[Bs]:i.LINEAR_MIPMAP_NEAREST,[kn]:i.LINEAR_MIPMAP_LINEAR},Ut={[Cu]:i.NEVER,[Du]:i.ALWAYS,[Ru]:i.LESS,[Ja]:i.LEQUAL,[Pu]:i.EQUAL,[Ka]:i.GEQUAL,[Iu]:i.GREATER,[Lu]:i.NOTEQUAL};function zt(I,M){if(M.type===In&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Fe||M.magFilter===Bs||M.magFilter===Ki||M.magFilter===kn||M.minFilter===Fe||M.minFilter===Bs||M.minFilter===Ki||M.minFilter===kn)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,bt[M.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,bt[M.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,bt[M.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,vt[M.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,vt[M.minFilter]),M.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Ut[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ue||M.minFilter!==Ki&&M.minFilter!==kn||M.type===In&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let S=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,S.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function te(I,M){let S=!1;I.__webglInit===void 0&&(I.__webglInit=!0,M.addEventListener("dispose",b));let A=M.source,L=f.get(A);L===void 0&&(L={},f.set(A,L));let O=Y(M);if(O!==I.__cacheKey){L[O]===void 0&&(L[O]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,S=!0),L[O].usedTimes++;let $=L[I.__cacheKey];$!==void 0&&(L[I.__cacheKey].usedTimes--,$.usedTimes===0&&D(M)),I.__cacheKey=O,I.__webglTexture=L[O].texture}return S}function nt(I,M,S){return Math.floor(Math.floor(I/S)/M)}function ct(I,M,S,A){let O=I.updateRanges;if(O.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,S,A,M.data);else{O.sort((_t,mt)=>_t.start-mt.start);let $=0;for(let _t=1;_t<O.length;_t++){let mt=O[$],gt=O[_t],Lt=mt.start+mt.count,Vt=nt(gt.start,M.width,4),$t=nt(mt.start,M.width,4);gt.start<=Lt+1&&Vt===$t&&nt(gt.start+gt.count-1,M.width,4)===Vt?mt.count=Math.max(mt.count,gt.start+gt.count-mt.start):(++$,O[$]=gt)}O.length=$+1;let z=e.getParameter(i.UNPACK_ROW_LENGTH),q=e.getParameter(i.UNPACK_SKIP_PIXELS),at=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let _t=0,mt=O.length;_t<mt;_t++){let gt=O[_t],Lt=Math.floor(gt.start/4),Vt=Math.ceil(gt.count/4),$t=Lt%M.width,G=Math.floor(Lt/M.width),yt=Vt,lt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,$t),e.pixelStorei(i.UNPACK_SKIP_ROWS,G),e.texSubImage2D(i.TEXTURE_2D,0,$t,G,yt,lt,S,A,M.data)}I.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,q),e.pixelStorei(i.UNPACK_SKIP_ROWS,at)}}function xt(I,M,S){let A=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(A=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(A=i.TEXTURE_3D);let L=te(I,M),O=M.source;e.bindTexture(A,I.__webglTexture,i.TEXTURE0+S);let $=n.get(O);if(O.version!==$.__version||L===!0){if(e.activeTexture(i.TEXTURE0+S),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let lt=oe.getPrimaries(oe.workingColorSpace),Mt=M.colorSpace===Dn?null:oe.getPrimaries(M.colorSpace),Ct=M.colorSpace===Dn||lt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct)}e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let q=g(M.image,!1,s.maxTextureSize);q=Xt(M,q);let at=r.convert(M.format,M.colorSpace),_t=r.convert(M.type),mt=_(M.internalFormat,at,_t,M.normalized,M.colorSpace,M.isVideoTexture);zt(A,M);let gt,Lt=M.mipmaps,Vt=M.isVideoTexture!==!0,$t=$.__version===void 0||L===!0,G=O.dataReady,yt=v(M,q);if(M.isDepthTexture)mt=T(M.format===Li,M.type),$t&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,mt,q.width,q.height):e.texImage2D(i.TEXTURE_2D,0,mt,q.width,q.height,0,at,_t,null));else if(M.isDataTexture)if(Lt.length>0){Vt&&$t&&e.texStorage2D(i.TEXTURE_2D,yt,mt,Lt[0].width,Lt[0].height);for(let lt=0,Mt=Lt.length;lt<Mt;lt++)gt=Lt[lt],Vt?G&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,gt.width,gt.height,at,_t,gt.data):e.texImage2D(i.TEXTURE_2D,lt,mt,gt.width,gt.height,0,at,_t,gt.data);M.generateMipmaps=!1}else Vt?($t&&e.texStorage2D(i.TEXTURE_2D,yt,mt,q.width,q.height),G&&ct(M,q,at,_t)):e.texImage2D(i.TEXTURE_2D,0,mt,q.width,q.height,0,at,_t,q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Vt&&$t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,mt,Lt[0].width,Lt[0].height,q.depth);for(let lt=0,Mt=Lt.length;lt<Mt;lt++)if(gt=Lt[lt],M.format!==on)if(at!==null)if(Vt){if(G)if(M.layerUpdates.size>0){let Ct=Al(gt.width,gt.height,M.format,M.type);for(let ft of M.layerUpdates){let kt=gt.data.subarray(ft*Ct/gt.data.BYTES_PER_ELEMENT,(ft+1)*Ct/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,ft,gt.width,gt.height,1,at,kt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,gt.width,gt.height,q.depth,at,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,lt,mt,gt.width,gt.height,q.depth,0,gt.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,gt.width,gt.height,q.depth,at,_t,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,lt,mt,gt.width,gt.height,q.depth,0,at,_t,gt.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Vt&&$t&&e.texStorage2D(i.TEXTURE_2D,yt,mt,Lt[0].width,Lt[0].height);for(let lt=0,Mt=Lt.length;lt<Mt;lt++)gt=Lt[lt],M.format!==on?at!==null?Vt?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,lt,0,0,gt.width,gt.height,at,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,lt,mt,gt.width,gt.height,0,gt.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?G&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,gt.width,gt.height,at,_t,gt.data):e.texImage2D(i.TEXTURE_2D,lt,mt,gt.width,gt.height,0,at,_t,gt.data)}else if(M.isDataArrayTexture)if(Vt){if($t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,mt,q.width,q.height,q.depth),G)if(M.layerUpdates.size>0){let lt=Al(q.width,q.height,M.format,M.type);for(let Mt of M.layerUpdates){let Ct=q.data.subarray(Mt*lt/q.data.BYTES_PER_ELEMENT,(Mt+1)*lt/q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Mt,q.width,q.height,1,at,_t,Ct)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,at,_t,q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,mt,q.width,q.height,q.depth,0,at,_t,q.data);else if(M.isData3DTexture)Vt?($t&&e.texStorage3D(i.TEXTURE_3D,yt,mt,q.width,q.height,q.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,at,_t,q.data)):e.texImage3D(i.TEXTURE_3D,0,mt,q.width,q.height,q.depth,0,at,_t,q.data);else if(M.isFramebufferTexture){if($t)if(Vt)e.texStorage2D(i.TEXTURE_2D,yt,mt,q.width,q.height);else{let lt=q.width,Mt=q.height;for(let Ct=0;Ct<yt;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,mt,lt,Mt,0,at,_t,null),lt>>=1,Mt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){let lt=i.canvas;if(lt.hasAttribute("layoutsubtree")||lt.setAttribute("layoutsubtree","true"),q.parentNode!==lt){lt.appendChild(q),u.add(M),lt.onpaint=Mt=>{let Ct=Mt.changedElements;for(let ft of u)Ct.includes(ft.image)&&(ft.needsUpdate=!0)},lt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,q);else{let Ct=i.RGBA,ft=i.RGBA,kt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ct,ft,kt,q)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Lt.length>0){if(Vt&&$t){let lt=Yt(Lt[0]);e.texStorage2D(i.TEXTURE_2D,yt,mt,lt.width,lt.height)}for(let lt=0,Mt=Lt.length;lt<Mt;lt++)gt=Lt[lt],Vt?G&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,at,_t,gt):e.texImage2D(i.TEXTURE_2D,lt,mt,at,_t,gt);M.generateMipmaps=!1}else if(Vt){if($t){let lt=Yt(q);e.texStorage2D(i.TEXTURE_2D,yt,mt,lt.width,lt.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at,_t,q)}else e.texImage2D(i.TEXTURE_2D,0,mt,at,_t,q);p(M)&&E(A),$.__version=O.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Ot(I,M,S){if(M.image.length!==6)return;let A=te(I,M),L=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+S);let O=n.get(L);if(L.version!==O.__version||A===!0){e.activeTexture(i.TEXTURE0+S);let $=oe.getPrimaries(oe.workingColorSpace),z=M.colorSpace===Dn?null:oe.getPrimaries(M.colorSpace),q=M.colorSpace===Dn||$===z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);let at=M.isCompressedTexture||M.image[0].isCompressedTexture,_t=M.image[0]&&M.image[0].isDataTexture,mt=[];for(let ft=0;ft<6;ft++)!at&&!_t?mt[ft]=g(M.image[ft],!0,s.maxCubemapSize):mt[ft]=_t?M.image[ft].image:M.image[ft],mt[ft]=Xt(M,mt[ft]);let gt=mt[0],Lt=r.convert(M.format,M.colorSpace),Vt=r.convert(M.type),$t=_(M.internalFormat,Lt,Vt,M.normalized,M.colorSpace),G=M.isVideoTexture!==!0,yt=O.__version===void 0||A===!0,lt=L.dataReady,Mt=v(M,gt);zt(i.TEXTURE_CUBE_MAP,M);let Ct;if(at){G&&yt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,$t,gt.width,gt.height);for(let ft=0;ft<6;ft++){Ct=mt[ft].mipmaps;for(let kt=0;kt<Ct.length;kt++){let Ft=Ct[kt];M.format!==on?Lt!==null?G?lt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt,0,0,Ft.width,Ft.height,Lt,Ft.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt,$t,Ft.width,Ft.height,0,Ft.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt,0,0,Ft.width,Ft.height,Lt,Vt,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt,$t,Ft.width,Ft.height,0,Lt,Vt,Ft.data)}}}else{if(Ct=M.mipmaps,G&&yt){Ct.length>0&&Mt++;let ft=Yt(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Mt,$t,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(_t){G?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,mt[ft].width,mt[ft].height,Lt,Vt,mt[ft].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,$t,mt[ft].width,mt[ft].height,0,Lt,Vt,mt[ft].data);for(let kt=0;kt<Ct.length;kt++){let Ee=Ct[kt].image[ft].image;G?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt+1,0,0,Ee.width,Ee.height,Lt,Vt,Ee.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt+1,$t,Ee.width,Ee.height,0,Lt,Vt,Ee.data)}}else{G?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Lt,Vt,mt[ft]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,$t,Lt,Vt,mt[ft]);for(let kt=0;kt<Ct.length;kt++){let Ft=Ct[kt];G?lt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt+1,0,0,Lt,Vt,Ft.image[ft]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,kt+1,$t,Lt,Vt,Ft.image[ft])}}}p(M)&&E(i.TEXTURE_CUBE_MAP),O.__version=L.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Tt(I,M,S,A,L,O){let $=r.convert(S.format,S.colorSpace),z=r.convert(S.type),q=_(S.internalFormat,$,z,S.normalized,S.colorSpace),at=n.get(M),_t=n.get(S);if(_t.__renderTarget=M,!at.__hasExternalTextures){let mt=Math.max(1,M.width>>O),gt=Math.max(1,M.height>>O);L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?e.texImage3D(L,O,q,mt,gt,M.depth,0,$,z,null):e.texImage2D(L,O,q,mt,gt,0,$,z,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),St(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,A,L,_t.__webglTexture,0,pt(M)):(L===i.TEXTURE_2D||L>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&L<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,A,L,_t.__webglTexture,O),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(I,M,S){if(i.bindRenderbuffer(i.RENDERBUFFER,I),M.depthBuffer){let A=M.depthTexture,L=A&&A.isDepthTexture?A.type:null,O=T(M.stencilBuffer,L),$=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;St(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(M),O,M.width,M.height):S?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(M),O,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,O,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,I)}else{let A=M.textures;for(let L=0;L<A.length;L++){let O=A[L],$=r.convert(O.format,O.colorSpace),z=r.convert(O.type),q=_(O.internalFormat,$,z,O.normalized,O.colorSpace);St(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(M),q,M.width,M.height):S?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(M),q,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,q,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ee(I,M,S){let A=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let L=n.get(M.depthTexture);if(L.__renderTarget=M,(!L.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),A){if(L.__webglInit===void 0&&(L.__webglInit=!0,M.depthTexture.addEventListener("dispose",b)),L.__webglTexture===void 0){L.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture),zt(i.TEXTURE_CUBE_MAP,M.depthTexture);let at=r.convert(M.depthTexture.format),_t=r.convert(M.depthTexture.type),mt;M.depthTexture.format===On?mt=i.DEPTH_COMPONENT24:M.depthTexture.format===Li&&(mt=i.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,mt,M.width,M.height,0,at,_t,null)}}else rt(M.depthTexture,0);let O=L.__webglTexture,$=pt(M),z=A?i.TEXTURE_CUBE_MAP_POSITIVE_X+S:i.TEXTURE_2D,q=M.depthTexture.format===Li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===On)St(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,z,O,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,q,z,O,0);else if(M.depthTexture.format===Li)St(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,z,O,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,q,z,O,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ot(I){let M=n.get(I),S=I.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==I.depthTexture){let A=I.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),A){let L=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,A.removeEventListener("dispose",L)};A.addEventListener("dispose",L),M.__depthDisposeCallback=L}M.__boundDepthTexture=A}if(I.depthTexture&&!M.__autoAllocateDepthBuffer)if(S)for(let A=0;A<6;A++)ee(M.__webglFramebuffer[A],I,A);else{let A=I.texture.mipmaps;A&&A.length>0?ee(M.__webglFramebuffer[0],I,0):ee(M.__webglFramebuffer,I,0)}else if(S){M.__webglDepthbuffer=[];for(let A=0;A<6;A++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[A]),M.__webglDepthbuffer[A]===void 0)M.__webglDepthbuffer[A]=i.createRenderbuffer(),Ht(M.__webglDepthbuffer[A],I,!1);else{let L=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=M.__webglDepthbuffer[A];i.bindRenderbuffer(i.RENDERBUFFER,O),i.framebufferRenderbuffer(i.FRAMEBUFFER,L,i.RENDERBUFFER,O)}}else{let A=I.texture.mipmaps;if(A&&A.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Ht(M.__webglDepthbuffer,I,!1);else{let L=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,O=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,O),i.framebufferRenderbuffer(i.FRAMEBUFFER,L,i.RENDERBUFFER,O)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function N(I,M,S){let A=n.get(I);M!==void 0&&Tt(A.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),S!==void 0&&ot(I)}function X(I){let M=I.texture,S=n.get(I),A=n.get(M);I.addEventListener("dispose",x);let L=I.textures,O=I.isWebGLCubeRenderTarget===!0,$=L.length>1;if($||(A.__webglTexture===void 0&&(A.__webglTexture=i.createTexture()),A.__version=M.version,o.memory.textures++),O){S.__webglFramebuffer=[];for(let z=0;z<6;z++)if(M.mipmaps&&M.mipmaps.length>0){S.__webglFramebuffer[z]=[];for(let q=0;q<M.mipmaps.length;q++)S.__webglFramebuffer[z][q]=i.createFramebuffer()}else S.__webglFramebuffer[z]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){S.__webglFramebuffer=[];for(let z=0;z<M.mipmaps.length;z++)S.__webglFramebuffer[z]=i.createFramebuffer()}else S.__webglFramebuffer=i.createFramebuffer();if($)for(let z=0,q=L.length;z<q;z++){let at=n.get(L[z]);at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&St(I)===!1){S.__webglMultisampledFramebuffer=i.createFramebuffer(),S.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,S.__webglMultisampledFramebuffer);for(let z=0;z<L.length;z++){let q=L[z];S.__webglColorRenderbuffer[z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,S.__webglColorRenderbuffer[z]);let at=r.convert(q.format,q.colorSpace),_t=r.convert(q.type),mt=_(q.internalFormat,at,_t,q.normalized,q.colorSpace,I.isXRRenderTarget===!0),gt=pt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,mt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+z,i.RENDERBUFFER,S.__webglColorRenderbuffer[z])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(S.__webglDepthRenderbuffer=i.createRenderbuffer(),Ht(S.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(O){e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture),zt(i.TEXTURE_CUBE_MAP,M);for(let z=0;z<6;z++)if(M.mipmaps&&M.mipmaps.length>0)for(let q=0;q<M.mipmaps.length;q++)Tt(S.__webglFramebuffer[z][q],I,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,q);else Tt(S.__webglFramebuffer[z],I,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+z,0);p(M)&&E(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if($){for(let z=0,q=L.length;z<q;z++){let at=L[z],_t=n.get(at),mt=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(mt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,_t.__webglTexture),zt(mt,at),Tt(S.__webglFramebuffer,I,at,i.COLOR_ATTACHMENT0+z,mt,0),p(at)&&E(mt)}e.unbindTexture()}else{let z=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(z=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(z,A.__webglTexture),zt(z,M),M.mipmaps&&M.mipmaps.length>0)for(let q=0;q<M.mipmaps.length;q++)Tt(S.__webglFramebuffer[q],I,M,i.COLOR_ATTACHMENT0,z,q);else Tt(S.__webglFramebuffer,I,M,i.COLOR_ATTACHMENT0,z,0);p(M)&&E(z),e.unbindTexture()}I.depthBuffer&&ot(I)}function Z(I){let M=I.textures;for(let S=0,A=M.length;S<A;S++){let L=M[S];if(p(L)){let O=C(I),$=n.get(L).__webglTexture;e.bindTexture(O,$),E(O),e.unbindTexture()}}}let j=[],ht=[];function dt(I){if(I.samples>0){if(St(I)===!1){let M=I.textures,S=I.width,A=I.height,L=i.COLOR_BUFFER_BIT,O=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=n.get(I),z=M.length>1;if(z)for(let at=0;at<M.length;at++)e.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,$.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,$.__webglMultisampledFramebuffer);let q=I.texture.mipmaps;q&&q.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,$.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,$.__webglFramebuffer);for(let at=0;at<M.length;at++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(L|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(L|=i.STENCIL_BUFFER_BIT)),z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,$.__webglColorRenderbuffer[at]);let _t=n.get(M[at]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_t,0)}i.blitFramebuffer(0,0,S,A,0,0,S,A,L,i.NEAREST),c===!0&&(j.length=0,ht.length=0,j.push(i.COLOR_ATTACHMENT0+at),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(j.push(O),ht.push(O),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ht)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),z)for(let at=0;at<M.length;at++){e.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,$.__webglColorRenderbuffer[at]);let _t=n.get(M[at]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,$.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,_t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,$.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){let M=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function pt(I){return Math.min(s.maxSamples,I.samples)}function St(I){let M=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function B(I){let M=o.render.frame;h.get(I)!==M&&(h.set(I,M),I.update())}function Xt(I,M){let S=I.colorSpace,A=I.format,L=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||S!==sr&&S!==Dn&&(oe.getTransfer(S)===xe?(A!==on||L!==rn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",S)),M}function Yt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=Q,this.resetTextureUnits=W,this.getTextureUnits=F,this.setTextureUnits=k,this.setTexture2D=rt,this.setTexture2DArray=et,this.setTexture3D=st,this.setTextureCube=it,this.rebindTextures=N,this.setupRenderTarget=X,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function yx(i,t){function e(n,s=Dn){let r,o=oe.getTransfer(s);if(n===rn)return i.UNSIGNED_BYTE;if(n===fa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ml)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===fl)return i.BYTE;if(n===pl)return i.SHORT;if(n===Os)return i.UNSIGNED_SHORT;if(n===da)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===Ln)return i.HALF_FLOAT;if(n===_l)return i.ALPHA;if(n===xl)return i.RGB;if(n===on)return i.RGBA;if(n===On)return i.DEPTH_COMPONENT;if(n===Li)return i.DEPTH_STENCIL;if(n===yl)return i.RED;if(n===ma)return i.RED_INTEGER;if(n===Di)return i.RG;if(n===ga)return i.RG_INTEGER;if(n===_a)return i.RGBA_INTEGER;if(n===Or||n===zr||n===Vr||n===kr)if(o===xe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xa||n===ya||n===va||n===Ma)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ya)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===va)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sa||n===ba||n===Ea||n===Ta||n===wa||n===Hr||n===Aa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Sa||n===ba)return o===xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ea)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ta)return r.COMPRESSED_R11_EAC;if(n===wa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Hr)return r.COMPRESSED_RG11_EAC;if(n===Aa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ca||n===Ra||n===Pa||n===Ia||n===La||n===Da||n===Na||n===Ua||n===Fa||n===Ba||n===Oa||n===za||n===Va||n===ka)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ca)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ra)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Pa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ia)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===La)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Da)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Na)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ua)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ba)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===za)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Va)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ka)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ha||n===Ga||n===Wa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ha)return o===xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ga)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xa||n===qa||n===Gr||n===Ya)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Xa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ya)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mx=`
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

}`,kl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new dr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new fn({vertexShader:vx,fragmentShader:Mx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new Yi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hl=class extends An{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null,y=typeof XRWebGLBinding<"u",g=new kl,p={},E=e.getContextAttributes(),C=null,_=null,T=[],v=[],b=new ut,x=null,P=null,D=new nn;D.viewport=new Pe;let U=new nn;U.viewport=new Pe;let V=[D,U],W=new oa,F=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let ct=T[nt];return ct===void 0&&(ct=new ws,T[nt]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(nt){let ct=T[nt];return ct===void 0&&(ct=new ws,T[nt]=ct),ct.getGripSpace()},this.getHand=function(nt){let ct=T[nt];return ct===void 0&&(ct=new ws,T[nt]=ct),ct.getHandSpace()};function Q(nt){let ct=v.indexOf(nt.inputSource);if(ct===-1)return;let xt=T[ct];xt!==void 0&&(xt.update(nt.inputSource,nt.frame,l||o),xt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function Y(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",rt);for(let nt=0;nt<T.length;nt++){let ct=v[nt];ct!==null&&(v[nt]=null,T[nt].disconnect(ct))}F=null,k=null,g.reset();for(let nt in p)delete p[nt];if(t.setRenderTarget(C),f=null,d=null,u=null,s=null,_=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(b.width,b.height,!1),P!==null){let nt=P.camera;nt.fov=P.fov,nt.zoom=P.zoom,nt.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){r=nt,n.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(nt){l=nt},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&y&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(nt){if(s=nt,s!==null){if(C=t.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",rt),E.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(b),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Ot=null,Tt=null;E.depth&&(Tt=E.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=E.stencil?Li:On,Ot=E.stencil?zs:Pn);let Ht={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Ht),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new sn(d.textureWidth,d.textureHeight,{format:on,type:rn,depthTexture:new Ei(d.textureWidth,d.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:E.stencil,colorSpace:t.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let xt={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new sn(f.framebufferWidth,f.framebufferHeight,{format:on,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),te.setContext(s),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function rt(nt){for(let ct=0;ct<nt.removed.length;ct++){let xt=nt.removed[ct],Ot=v.indexOf(xt);Ot>=0&&(v[Ot]=null,T[Ot].disconnect(xt))}for(let ct=0;ct<nt.added.length;ct++){let xt=nt.added[ct],Ot=v.indexOf(xt);if(Ot===-1){for(let Ht=0;Ht<T.length;Ht++)if(Ht>=v.length){v.push(xt),Ot=Ht;break}else if(v[Ht]===null){v[Ht]=xt,Ot=Ht;break}if(Ot===-1)break}let Tt=T[Ot];Tt&&Tt.connect(xt)}}let et=new R,st=new R;function it(nt,ct,xt){et.setFromMatrixPosition(ct.matrixWorld),st.setFromMatrixPosition(xt.matrixWorld);let Ot=et.distanceTo(st),Tt=ct.projectionMatrix.elements,Ht=xt.projectionMatrix.elements,ee=Tt[14]/(Tt[10]-1),ot=Tt[14]/(Tt[10]+1),N=(Tt[9]+1)/Tt[5],X=(Tt[9]-1)/Tt[5],Z=(Tt[8]-1)/Tt[0],j=(Ht[8]+1)/Ht[0],ht=ee*Z,dt=ee*j,pt=Ot/(-Z+j),St=pt*-Z;if(ct.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(St),nt.translateZ(pt),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Tt[10]===-1)nt.projectionMatrix.copy(ct.projectionMatrix),nt.projectionMatrixInverse.copy(ct.projectionMatrixInverse);else{let B=ee+pt,Xt=ot+pt,Yt=ht-St,I=dt+(Ot-St),M=N*ot/Xt*B,S=X*ot/Xt*B;nt.projectionMatrix.makePerspective(Yt,I,M,S,B,Xt),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function bt(nt,ct){ct===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(ct.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(s===null)return;let ct=nt.near,xt=nt.far;g.texture!==null&&(g.depthNear>0&&(ct=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),W.near=U.near=D.near=ct,W.far=U.far=D.far=xt,(F!==W.near||k!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),F=W.near,k=W.far),W.layers.mask=nt.layers.mask|6,D.layers.mask=W.layers.mask&-5,U.layers.mask=W.layers.mask&-3;let Ot=nt.parent,Tt=W.cameras;bt(W,Ot);for(let Ht=0;Ht<Tt.length;Ht++)bt(Tt[Ht],Ot);Tt.length===2?it(W,D,U):W.projectionMatrix.copy(D.projectionMatrix),P===null&&nt.isPerspectiveCamera&&(P={camera:nt,fov:nt.fov,zoom:nt.zoom}),vt(nt,W,Ot)};function vt(nt,ct,xt){xt===null?nt.matrix.copy(ct.matrixWorld):(nt.matrix.copy(xt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(ct.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(ct.projectionMatrix),nt.projectionMatrixInverse.copy(ct.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=bs*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(nt){c=nt,d!==null&&(d.fixedFoveation=nt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=nt)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(nt){return p[nt]};let Ut=null;function zt(nt,ct){if(h=ct.getViewerPose(l||o),m=ct,h!==null){let xt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Ot=!1;xt.length!==W.cameras.length&&(W.cameras.length=0,Ot=!0);for(let ot=0;ot<xt.length;ot++){let N=xt[ot],X=null;if(f!==null)X=f.getViewport(N);else{let j=u.getViewSubImage(d,N);X=j.viewport,ot===0&&(t.setRenderTargetTextures(_,j.colorTexture,j.depthStencilTexture),t.setRenderTarget(_))}let Z=V[ot];Z===void 0&&(Z=new nn,Z.layers.enable(ot),Z.viewport=new Pe,V[ot]=Z),Z.matrix.fromArray(N.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(N.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(X.x,X.y,X.width,X.height),ot===0&&(W.matrix.copy(Z.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Ot===!0&&W.cameras.push(Z)}let Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){u=n.getBinding();let ot=u.getDepthInformation(xt[0]);ot&&ot.isValid&&ot.texture&&g.init(ot,s.renderState)}if(Tt&&Tt.includes("camera-access")&&y){t.state.unbindTexture(),u=n.getBinding();for(let ot=0;ot<xt.length;ot++){let N=xt[ot].camera;if(N){let X=p[N];X||(X=new dr,p[N]=X);let Z=u.getCameraImage(N);X.sourceTexture=Z}}}}for(let xt=0;xt<T.length;xt++){let Ot=v[xt],Tt=T[xt];Ot!==null&&Tt!==void 0&&Tt.update(Ot,ct,l||o)}Ut&&Ut(nt,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),m=null}let te=new pd;te.setAnimationLoop(zt),this.setAnimationLoop=function(nt){Ut=nt},this.dispose=function(){}}},Sx=new ue,vd=new Kt;vd.set(-1,0,0,0,1,0,0,0,1);function bx(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,El(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,C,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),y(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,E,C):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===tn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===tn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let E=t.get(p),C=E.envMap,_=E.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(Sx.makeRotationFromEuler(_)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(vd),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,E,C){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=C*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function y(g,p){let E=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ex(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,T){let v=T.program;n.uniformBlockBinding(_,v)}function l(_,T){let v=s[_.id];v===void 0&&(g(_),v=h(_),s[_.id]=v,_.addEventListener("dispose",E));let b=T.program;n.updateUBOMapping(_,b);let x=t.render.frame;r[_.id]!==x&&(d(_),r[_.id]=x)}function h(_){let T=u();_.__bindingPointIndex=T;let v=i.createBuffer(),b=_.__size,x=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,b,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,v),v}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let T=s[_.id],v=_.uniforms,b=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let x=0,P=v.length;x<P;x++){let D=v[x];if(Array.isArray(D))for(let U=0,V=D.length;U<V;U++)f(D[U],x,U,b);else f(D,x,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,T,v,b){if(y(_,T,v,b)===!0){let x=_.__offset,P=_.value;if(Array.isArray(P)){let D=0;for(let U=0;U<P.length;U++){let V=P[U],W=p(V);m(V,_.__data,D),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(D+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(P,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,_.__data)}}function m(_,T,v){typeof _=="number"||typeof _=="boolean"?T[0]=_:_.isMatrix3?(T[0]=_.elements[0],T[1]=_.elements[1],T[2]=_.elements[2],T[3]=0,T[4]=_.elements[3],T[5]=_.elements[4],T[6]=_.elements[5],T[7]=0,T[8]=_.elements[6],T[9]=_.elements[7],T[10]=_.elements[8],T[11]=0):ArrayBuffer.isView(_)?T.set(new _.constructor(_.buffer,_.byteOffset,T.length)):_.toArray(T,v)}function y(_,T,v,b){let x=_.value,P=T+"_"+v;if(b[P]===void 0)return typeof x=="number"||typeof x=="boolean"?b[P]=x:ArrayBuffer.isView(x)?b[P]=x.slice():b[P]=x.clone(),!0;{let D=b[P];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return b[P]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function g(_){let T=_.uniforms,v=0,b=16;for(let P=0,D=T.length;P<D;P++){let U=Array.isArray(T[P])?T[P]:[T[P]];for(let V=0,W=U.length;V<W;V++){let F=U[V],k=Array.isArray(F.value)?F.value:[F.value];for(let Q=0,Y=k.length;Q<Y;Q++){let rt=k[Q],et=p(rt),st=v%b,it=st%et.boundary,bt=st+it;v+=it,bt!==0&&b-bt<et.storage&&(v+=b-bt),F.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=et.storage}}}let x=v%b;return x>0&&(v+=b-x),_.__size=v,_.__cache={},this}function p(_){let T={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(T.boundary=4,T.storage=4):_.isVector2?(T.boundary=8,T.storage=8):_.isVector3||_.isColor?(T.boundary=16,T.storage=12):_.isVector4?(T.boundary=16,T.storage=16):_.isMatrix3?(T.boundary=48,T.storage=48):_.isMatrix4?(T.boundary=64,T.storage=64):_.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(T.boundary=16,T.storage=_.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",_),T}function E(_){let T=_.target;T.removeEventListener("dispose",E);let v=o.indexOf(T.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function C(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:C}}var Tx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Hn=null;function wx(){return Hn===null&&(Hn=new Fo(Tx,16,16,Di,Ln),Hn.name="DFG_LUT",Hn.minFilter=Fe,Hn.magFilter=Fe,Hn.wrapS=xn,Hn.wrapT=xn,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}var ec=class{constructor(t={}){let{canvas:e=Uu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=rn}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let y=f,g=new Set([_a,ga,ma]),p=new Set([rn,Pn,Os,zs,fa,pa]),E=new Uint32Array(4),C=new Int32Array(4),_=new R,T=null,v=null,b=[],x=[],P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Rn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,U=!1,V=null,W=null,F=null,k=null;this._outputColorSpace=ke;let Q=0,Y=0,rt=null,et=-1,st=null,it=new Pe,bt=new Pe,vt=null,Ut=new Wt(0),zt=0,te=e.width,nt=e.height,ct=1,xt=null,Ot=null,Tt=new Pe(0,0,te,nt),Ht=new Pe(0,0,te,nt),ee=!1,ot=new As,N=!1,X=!1,Z=new ue,j=new R,ht=new Pe,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pt=!1;function St(){return rt===null?ct:1}let B=n;function Xt(w,H){return e.getContext(w,H)}let Yt,I,M,S,A,L,O,$,z,q,at,_t,mt,gt,Lt,Vt,$t,G,yt,lt,Mt,Ct,ft;try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",Ee,!1),e.addEventListener("webglcontextrestored",me,!1),e.addEventListener("webglcontextcreationerror",Mn,!1),B===null){let H="webgl2";if(B=Xt(H,w),B===null)throw Xt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}kt()}catch(w){throw e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",me,!1),e.removeEventListener("webglcontextcreationerror",Mn,!1),qt("WebGLRenderer: "+w.message),w}function kt(){Yt=new Dg(B),Yt.init(),Mt=new yx(B,Yt),I=new bg(B,Yt,t,Mt),M=new _x(B,Yt),I.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),W=B.createFramebuffer(),F=B.createFramebuffer(),k=B.createFramebuffer(),S=new Fg(B),A=new ix,L=new xx(B,Yt,M,A,I,Mt,S),O=new Lg(D),$=new Op(B),Ct=new Mg(B,$),z=new Ng(B,$,S,Ct),q=new Og(B,z,$,Ct,S),G=new Bg(B,I,L),Lt=new Eg(A),at=new nx(D,O,Yt,I,Ct,Lt),_t=new bx(D,A),mt=new rx,gt=new ux(Yt),$t=new vg(D,O,M,q,m,c),Vt=new gx(D,q,I),ft=new Ex(B,S,I,M),yt=new Sg(B,Yt,S),lt=new Ug(B,Yt,S),S.programs=at.programs,D.capabilities=I,D.extensions=Yt,D.properties=A,D.renderLists=mt,D.shadowMap=Vt,D.state=M,D.info=S}y!==rn&&(P=new Vg(y,e.width,e.height,a,s,r));let Ft=new Hl(D,B);this.xr=Ft,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let w=Yt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Yt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ct},this.setPixelRatio=function(w){w!==void 0&&(ct=w,this.setSize(te,nt,!1))},this.getSize=function(w){return w.set(te,nt)},this.setSize=function(w,H,tt=!0){if(Ft.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}te=w,nt=H,e.width=Math.floor(w*ct),e.height=Math.floor(H*ct),tt===!0&&(e.style.width=w+"px",e.style.height=H+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,w,H)},this.getDrawingBufferSize=function(w){return w.set(te*ct,nt*ct).floor()},this.setDrawingBufferSize=function(w,H,tt){te=w,nt=H,ct=tt,e.width=Math.floor(w*tt),e.height=Math.floor(H*tt),this.setViewport(0,0,w,H)},this.setEffects=function(w){if(y===rn){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let H=0;H<w.length;H++)if(w[H].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(it)},this.getViewport=function(w){return w.copy(Tt)},this.setViewport=function(w,H,tt,J){w.isVector4?Tt.set(w.x,w.y,w.z,w.w):Tt.set(w,H,tt,J),M.viewport(it.copy(Tt).multiplyScalar(ct).round())},this.getScissor=function(w){return w.copy(Ht)},this.setScissor=function(w,H,tt,J){w.isVector4?Ht.set(w.x,w.y,w.z,w.w):Ht.set(w,H,tt,J),M.scissor(bt.copy(Ht).multiplyScalar(ct).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(w){M.setScissorTest(ee=w)},this.setOpaqueSort=function(w){xt=w},this.setTransparentSort=function(w){Ot=w},this.getClearColor=function(w){return w.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor(...arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha(...arguments)},this.clear=function(w=!0,H=!0,tt=!0){let J=0;if(w){let K=!1;if(rt!==null){let At=rt.texture.format;K=g.has(At)}if(K){let At=rt.texture.type,It=p.has(At),wt=$t.getClearColor(),Dt=$t.getClearAlpha(),Bt=wt.r,ne=wt.g,se=wt.b;It?(E[0]=Bt,E[1]=ne,E[2]=se,E[3]=Dt,B.clearBufferuiv(B.COLOR,0,E)):(C[0]=Bt,C[1]=ne,C[2]=se,C[3]=Dt,B.clearBufferiv(B.COLOR,0,C))}else J|=B.COLOR_BUFFER_BIT}H&&(J|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),tt&&(J|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&B.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),V=w},this.dispose=function(){e.removeEventListener("webglcontextlost",Ee,!1),e.removeEventListener("webglcontextrestored",me,!1),e.removeEventListener("webglcontextcreationerror",Mn,!1),$t.dispose(),mt.dispose(),gt.dispose(),A.dispose(),O.dispose(),q.dispose(),Ct.dispose(),ft.dispose(),at.dispose(),Ft.dispose(),Ft.removeEventListener("sessionstart",mh),Ft.removeEventListener("sessionend",gh),Bi.stop()};function Ee(w){w.preventDefault(),Ml("WebGLRenderer: Context Lost."),U=!0}function me(){Ml("WebGLRenderer: Context Restored."),U=!1;let w=S.autoReset,H=Vt.enabled,tt=Vt.autoUpdate,J=Vt.needsUpdate,K=Vt.type;kt(),S.autoReset=w,Vt.enabled=H,Vt.autoUpdate=tt,Vt.needsUpdate=J,Vt.type=K}function Mn(w){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Un(w){let H=w.target;H.removeEventListener("dispose",Un),ef(H)}function ef(w){nf(w),A.remove(w)}function nf(w){let H=A.get(w).programs;H!==void 0&&(H.forEach(function(tt){at.releaseProgram(tt)}),w.isShaderMaterial&&at.releaseShaderCache(w))}this.renderBufferDirect=function(w,H,tt,J,K,At){H===null&&(H=dt);let It=K.isMesh&&K.matrixWorld.determinantAffine()<0,wt=of(w,H,tt,J,K);M.setMaterial(J,It);let Dt=tt.index,Bt=1;if(J.wireframe===!0){if(Dt=z.getWireframeAttribute(tt),Dt===void 0)return;Bt=2}let ne=tt.drawRange,se=tt.attributes.position,Nt=ne.start*Bt,ge=(ne.start+ne.count)*Bt;At!==null&&(Nt=Math.max(Nt,At.start*Bt),ge=Math.min(ge,(At.start+At.count)*Bt)),Dt!==null?(Nt=Math.max(Nt,0),ge=Math.min(ge,Dt.count)):se!=null&&(Nt=Math.max(Nt,0),ge=Math.min(ge,se.count));let De=ge-Nt;if(De<0||De===1/0)return;Ct.setup(K,J,wt,tt,Dt);let Ae,be=yt;if(Dt!==null&&(Ae=$.get(Dt),be=lt,be.setIndex(Ae)),K.isMesh)J.wireframe===!0?(M.setLineWidth(J.wireframeLinewidth*St()),be.setMode(B.LINES)):be.setMode(B.TRIANGLES);else if(K.isLine){let We=J.linewidth;We===void 0&&(We=1),M.setLineWidth(We*St()),K.isLineSegments?be.setMode(B.LINES):K.isLineLoop?be.setMode(B.LINE_LOOP):be.setMode(B.LINE_STRIP)}else K.isPoints?be.setMode(B.POINTS):K.isSprite&&be.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(Yt.get("WEBGL_multi_draw"))be.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let We=K._multiDrawStarts,Pt=K._multiDrawCounts,Ke=K._multiDrawCount,le=Dt?$.get(Dt).bytesPerElement:1,gn=A.get(J).currentProgram.getUniforms();for(let Fn=0;Fn<Ke;Fn++)gn.setValue(B,"_gl_DrawID",Fn),be.render(We[Fn]/le,Pt[Fn])}else if(K.isInstancedMesh)be.renderInstances(Nt,De,K.count);else if(tt.isInstancedBufferGeometry){let We=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,Pt=Math.min(tt.instanceCount,We);be.renderInstances(Nt,De,Pt)}else be.render(Nt,De)};function ph(w,H,tt,J){V!==null&&w.isNodeMaterial&&V.setObject(J,w),N===!0&&Lt.setState(w,tt,!1),w.transparent===!0&&w.side===Ce&&w.forceSinglePass===!1?(w.side=tn,w.needsUpdate=!0,to(w,H,J),w.side=Pi,w.needsUpdate=!0,to(w,H,J),w.side=Ce):to(w,H,J)}this.compile=function(w,H,tt=null){tt===null&&(tt=w),V!==null&&V.renderStart(w,H,tt),v=gt.get(tt),v.init(H),x.push(v),tt.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(v.pushLight(K),K.castShadow&&v.pushShadow(K))}),w!==tt&&w.traverseVisible(function(K){K.isLight&&K.layers.test(H.layers)&&(v.pushLight(K),K.castShadow&&v.pushShadow(K))}),v.setupLights(),V!==null&&V.updateLights(v.state.lightsArray),X=this.localClippingEnabled,N=Lt.init(this.clippingPlanes,X),N===!0&&Lt.setGlobalState(this.clippingPlanes,H),V!==null&&Vt.render(v.state.shadowsArray,tt,H);let J=new Set;return w.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let At=K.material;if(At)if(Array.isArray(At))for(let It=0;It<At.length;It++){let wt=At[It];ph(wt,tt,H,K),J.add(wt)}else ph(At,tt,H,K),J.add(At)}),v=x.pop(),V!==null&&V.renderEnd(),J},this.compileAsync=function(w,H,tt=null){let J=this.compile(w,H,tt);return new Promise(K=>{function At(){if(J.forEach(function(It){let Dt=A.get(It).currentProgram;(Dt===void 0||Dt.isReady())&&J.delete(It)}),J.size===0){K(w);return}setTimeout(At,10)}Yt.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let mc=null;function sf(w){mc&&mc(w)}function mh(){Bi.stop()}function gh(){Bi.start()}let Bi=new pd;Bi.setAnimationLoop(sf),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(w){mc=w,Ft.setAnimationLoop(w),w===null?Bi.stop():Bi.start()},Ft.addEventListener("sessionstart",mh),Ft.addEventListener("sessionend",gh),this.render=function(w,H){if(H!==void 0&&H.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;V!==null&&V.renderStart(w,H);let tt=Ft.enabled===!0&&Ft.isPresenting===!0,J=P!==null&&(rt===null||tt)&&P.begin(D,rt);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Ft.enabled===!0&&Ft.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Ft.cameraAutoUpdate===!0&&Ft.updateCamera(H),H=Ft.getCamera()),w.isScene===!0&&w.onBeforeRender(D,w,H,rt),v=gt.get(w,x.length),v.init(H),v.state.textureUnits=L.getTextureUnits(),x.push(v),Z.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ot.setFromProjectionMatrix(Z,Tn,H.reversedDepth),X=this.localClippingEnabled,N=Lt.init(this.clippingPlanes,X),T=mt.get(w,b.length),T.init(),b.push(T),Ft.enabled===!0&&Ft.isPresenting===!0){let It=D.xr.getDepthSensingMesh();It!==null&&gc(It,H,-1/0,D.sortObjects)}gc(w,H,0,D.sortObjects),T.finish(),V!==null&&V.updateLights(v.state.lightsArray),D.sortObjects===!0&&T.sort(xt,Ot),pt=Ft.enabled===!1||Ft.isPresenting===!1||Ft.hasDepthSensing()===!1,pt&&$t.addToRenderList(T,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),N===!0&&Lt.beginShadows();let K=v.state.shadowsArray;if(Vt.render(K,w,H),N===!0&&Lt.endShadows(),(J&&P.hasRenderPass())===!1){let It=T.opaque,wt=T.transmissive;if(v.setupLights(),H.isArrayCamera){let Dt=H.cameras;if(wt.length>0)for(let Bt=0,ne=Dt.length;Bt<ne;Bt++){let se=Dt[Bt];xh(It,wt,w,se)}pt&&$t.render(w);for(let Bt=0,ne=Dt.length;Bt<ne;Bt++){let se=Dt[Bt];_h(T,w,se,se.viewport)}}else wt.length>0&&xh(It,wt,w,H),pt&&$t.render(w),_h(T,w,H)}rt!==null&&Y===0&&(L.updateMultisampleRenderTarget(rt),L.updateRenderTargetMipmap(rt)),J&&P.end(D),w.isScene===!0&&w.onAfterRender(D,w,H),Ct.resetDefaultState(),et=-1,st=null,x.pop(),x.length>0?(v=x[x.length-1],L.setTextureUnits(v.state.textureUnits),N===!0&&Lt.setGlobalState(D.clippingPlanes,v.state.camera)):v=null,b.pop(),b.length>0?T=b[b.length-1]:T=null,V!==null&&V.renderEnd()};function gc(w,H,tt,J){if(w.visible===!1)return;if(w.layers.test(H.layers)){if(w.isGroup)tt=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(H);else if(w.isLightProbeGrid)v.pushLightProbeGrid(w);else if(w.isLight)v.pushLight(w),w.castShadow&&v.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ot)){J&&ht.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Z);let It=q.update(w),wt=w.material;wt.visible&&T.push(w,It,wt,tt,ht.z,null,H)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ot))){let It=q.update(w),wt=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ht.copy(w.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),ht.copy(It.boundingSphere.center)),ht.applyMatrix4(w.matrixWorld).applyMatrix4(Z)),Array.isArray(wt)){let Dt=It.groups;for(let Bt=0,ne=Dt.length;Bt<ne;Bt++){let se=Dt[Bt],Nt=wt[se.materialIndex];Nt&&Nt.visible&&T.push(w,It,Nt,tt,ht.z,se,H)}}else wt.visible&&T.push(w,It,wt,tt,ht.z,null,H)}}let At=w.children;for(let It=0,wt=At.length;It<wt;It++)gc(At[It],H,tt,J)}function _h(w,H,tt,J){let{opaque:K,transmissive:At,transparent:It}=w;v.setupLightsView(tt),N===!0&&Lt.setGlobalState(D.clippingPlanes,tt),J&&M.viewport(it.copy(J)),K.length>0&&Qr(K,H,tt),At.length>0&&Qr(At,H,tt),It.length>0&&Qr(It,H,tt),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function xh(w,H,tt,J){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[J.id]===void 0){let Nt=Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[J.id]=new sn(1,1,{generateMipmaps:!0,type:Nt?Ln:rn,minFilter:kn,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let At=v.state.transmissionRenderTarget[J.id],It=J.viewport||it;At.setSize(It.z*D.transmissionResolutionScale,It.w*D.transmissionResolutionScale);let wt=D.getRenderTarget(),Dt=D.getActiveCubeFace(),Bt=D.getActiveMipmapLevel();D.setRenderTarget(At),D.getClearColor(Ut),zt=D.getClearAlpha(),zt<1&&D.setClearColor(16777215,.5),D.clear(),pt&&$t.render(tt);let ne=D.toneMapping;D.toneMapping=Rn;let se=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),v.setupLightsView(J),N===!0&&Lt.setGlobalState(D.clippingPlanes,J),Qr(w,tt,J),L.updateMultisampleRenderTarget(At),L.updateRenderTargetMipmap(At),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let ge=0,De=H.length;ge<De;ge++){let Ae=H[ge],{object:be,geometry:We,material:Pt,group:Ke}=Ae;if(Pt.side===Ce&&be.layers.test(J.layers)){let le=Pt.side;Pt.side=tn,Pt.needsUpdate=!0,yh(be,tt,J,We,Pt,Ke),Pt.side=le,Pt.needsUpdate=!0,Nt=!0}}Nt===!0&&(L.updateMultisampleRenderTarget(At),L.updateRenderTargetMipmap(At))}D.setRenderTarget(wt,Dt,Bt),D.setClearColor(Ut,zt),se!==void 0&&(J.viewport=se),D.toneMapping=ne}function Qr(w,H,tt){let J=H.isScene===!0?H.overrideMaterial:null;for(let K=0,At=w.length;K<At;K++){let It=w[K],{object:wt,geometry:Dt,group:Bt}=It,ne=It.material;ne.allowOverride===!0&&J!==null&&(ne=J),wt.layers.test(tt.layers)&&yh(wt,H,tt,Dt,ne,Bt)}}function yh(w,H,tt,J,K,At){V!==null&&K.isNodeMaterial&&V.setObject(w,K),w.onBeforeRender(D,H,tt,J,K,At),w.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),K.onBeforeRender(D,H,tt,J,w,At),K.transparent===!0&&K.side===Ce&&K.forceSinglePass===!1?(K.side=tn,K.needsUpdate=!0,D.renderBufferDirect(tt,H,J,K,w,At),K.side=Pi,K.needsUpdate=!0,D.renderBufferDirect(tt,H,J,K,w,At),K.side=Ce):D.renderBufferDirect(tt,H,J,K,w,At),w.onAfterRender(D,H,tt,J,K,At)}function to(w,H,tt){H.isScene!==!0&&(H=dt);let J=A.get(w),K=v.state.lights,At=v.state.shadowsArray,It=K.state.version,wt=at.getParameters(w,K.state,At,H,tt,v.state.lightProbeGridArray),Dt=at.getProgramCacheKey(wt),Bt=J.programs;J.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?H.environment:null,J.fog=H.fog;let ne=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;J.envMap=O.get(w.envMap||J.environment,ne),J.envMapRotation=J.environment!==null&&w.envMap===null?H.environmentRotation:w.envMapRotation,Bt===void 0&&(w.addEventListener("dispose",Un),Bt=new Map,J.programs=Bt);let se=Bt.get(Dt);if(se!==void 0){if(J.currentProgram===se&&J.lightsStateVersion===It)return Mh(w,wt),se}else wt.uniforms=at.getUniforms(w),V!==null&&w.isNodeMaterial&&V.build(w,tt,wt),w.onBeforeCompile(wt,D),se=at.acquireProgram(wt,Dt),Bt.set(Dt,se),J.uniforms=wt.uniforms;let Nt=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Nt.clippingPlanes=Lt.uniform),Mh(w,wt),J.needsLights=cf(w),J.lightsStateVersion=It,J.needsLights&&(Nt.ambientLightColor.value=K.state.ambient,Nt.lightProbe.value=K.state.probe,Nt.sunLights.value=K.state.sun,Nt.sunLightShadows.value=K.state.sunShadow,Nt.directionalLights.value=K.state.directional,Nt.directionalLightShadows.value=K.state.directionalShadow,Nt.spotLights.value=K.state.spot,Nt.spotLightShadows.value=K.state.spotShadow,Nt.rectAreaLights.value=K.state.rectArea,Nt.ltc_1.value=K.state.rectAreaLTC1,Nt.ltc_2.value=K.state.rectAreaLTC2,Nt.pointLights.value=K.state.point,Nt.pointLightShadows.value=K.state.pointShadow,Nt.hemisphereLights.value=K.state.hemi,Nt.sunShadowMatrix.value=K.state.sunShadowMatrix,Nt.sunShadowCascade.value=K.state.sunShadowCascade,Nt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Nt.spotLightMatrix.value=K.state.spotLightMatrix,Nt.spotLightMap.value=K.state.spotLightMap,Nt.pointShadowMatrix.value=K.state.pointShadowMatrix),J.lightProbeGrid=v.state.lightProbeGridArray.length>0,J.currentProgram=se,J.uniformsList=null,se}function vh(w){if(w.uniformsList===null){let H=w.currentProgram.getUniforms();w.uniformsList=Hs.seqWithValue(H.seq,w.uniforms)}return w.uniformsList}function Mh(w,H){let tt=A.get(w);tt.outputColorSpace=H.outputColorSpace,tt.batching=H.batching,tt.batchingColor=H.batchingColor,tt.instancing=H.instancing,tt.instancingColor=H.instancingColor,tt.instancingMorph=H.instancingMorph,tt.skinning=H.skinning,tt.morphTargets=H.morphTargets,tt.morphNormals=H.morphNormals,tt.morphColors=H.morphColors,tt.morphTargetsCount=H.morphTargetsCount,tt.numClippingPlanes=H.numClippingPlanes,tt.numIntersection=H.numClipIntersection,tt.vertexAlphas=H.vertexAlphas,tt.vertexTangents=H.vertexTangents,tt.toneMapping=H.toneMapping}function rf(w,H){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;_.setFromMatrixPosition(H.matrixWorld);for(let tt=0,J=w.length;tt<J;tt++){let K=w[tt];if(K.texture!==null&&K.boundingBox.containsPoint(_))return K}return null}function of(w,H,tt,J,K){H.isScene!==!0&&(H=dt),L.resetTextureUnits();let At=H.fog,It=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?H.environment:null,wt=rt===null?D.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:oe.workingColorSpace,Dt=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Bt=O.get(J.envMap||It,Dt),ne=J.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,se=!!tt.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Nt=!!tt.morphAttributes.position,ge=!!tt.morphAttributes.normal,De=!!tt.morphAttributes.color,Ae=Rn;J.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Ae=D.toneMapping);let be=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,We=be!==void 0?be.length:0,Pt=A.get(J),Ke=v.state.lights;if(N===!0&&(X===!0||w!==st)){let Te=w===st&&J.id===et;Lt.setState(J,w,Te)}let le=!1;J.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==Ke.state.version||Pt.outputColorSpace!==wt||K.isBatchedMesh&&Pt.batching===!1||!K.isBatchedMesh&&Pt.batching===!0||K.isBatchedMesh&&Pt.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Pt.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Pt.instancing===!1||!K.isInstancedMesh&&Pt.instancing===!0||K.isSkinnedMesh&&Pt.skinning===!1||!K.isSkinnedMesh&&Pt.skinning===!0||K.isInstancedMesh&&Pt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Pt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Pt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Pt.instancingMorph===!1&&K.morphTexture!==null||Pt.envMap!==Bt||J.fog===!0&&Pt.fog!==At||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==Lt.numPlanes||Pt.numIntersection!==Lt.numIntersection)||Pt.vertexAlphas!==ne||Pt.vertexTangents!==se||Pt.morphTargets!==Nt||Pt.morphNormals!==ge||Pt.morphColors!==De||Pt.toneMapping!==Ae||Pt.morphTargetsCount!==We||!!Pt.lightProbeGrid!=v.state.lightProbeGridArray.length>0)&&(le=!0):(le=!0,Pt.__version=J.version);let gn=Pt.currentProgram;le===!0&&(gn=to(J,H,K),V&&J.isNodeMaterial&&V.onUpdateProgram(J,gn,Pt));let Fn=!1,di=!1,ts=!1,Me=gn.getUniforms(),Le=Pt.uniforms;if(M.useProgram(gn.program)&&(Fn=!0,di=!0,ts=!0),J.id!==et&&(et=J.id,di=!0),Pt.needsLights){let Te=rf(v.state.lightProbeGridArray,K);Pt.lightProbeGrid!==Te&&(Pt.lightProbeGrid=Te,di=!0)}if(Fn||st!==w){M.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Me.setValue(B,"projectionMatrix",w.projectionMatrix),Me.setValue(B,"viewMatrix",w.matrixWorldInverse);let pi=Me.map.cameraPosition;pi!==void 0&&pi.setValue(B,j.setFromMatrixPosition(w.matrixWorld)),I.logarithmicDepthBuffer&&Me.setValue(B,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Me.setValue(B,"isOrthographic",w.isOrthographicCamera===!0),st!==w&&(st=w,di=!0,ts=!0)}if(Pt.needsLights&&(Ke.state.sunShadowMap.length>0&&Me.setValue(B,"sunShadowMap",Ke.state.sunShadowMap,L),Ke.state.directionalShadowMap.length>0&&Me.setValue(B,"directionalShadowMap",Ke.state.directionalShadowMap,L),Ke.state.spotShadowMap.length>0&&Me.setValue(B,"spotShadowMap",Ke.state.spotShadowMap,L),Ke.state.pointShadowMap.length>0&&Me.setValue(B,"pointShadowMap",Ke.state.pointShadowMap,L)),K.isSkinnedMesh){Me.setOptional(B,K,"bindMatrix"),Me.setOptional(B,K,"bindMatrixInverse");let Te=K.skeleton;Te&&(Te.boneTexture===null&&Te.computeBoneTexture(),Me.setValue(B,"boneTexture",Te.boneTexture,L))}K.isBatchedMesh&&(Me.setOptional(B,K,"batchingTexture"),Me.setValue(B,"batchingTexture",K._matricesTexture,L),Me.setOptional(B,K,"batchingIdTexture"),Me.setValue(B,"batchingIdTexture",K._indirectTexture,L),Me.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&Me.setValue(B,"batchingColorTexture",K._colorsTexture,L));let fi=tt.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&G.update(K,tt,gn),(di||Pt.receiveShadow!==K.receiveShadow)&&(Pt.receiveShadow=K.receiveShadow,Me.setValue(B,"receiveShadow",K.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&H.environment!==null&&(Le.envMapIntensity.value=H.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=wx()),di){if(Me.setValue(B,"toneMappingExposure",D.toneMappingExposure),Pt.needsLights&&af(Le,ts),At&&J.fog===!0&&_t.refreshFogUniforms(Le,At),_t.refreshMaterialUniforms(Le,J,ct,nt,v.state.transmissionRenderTarget[w.id]),Pt.needsLights&&Pt.lightProbeGrid){let Te=Pt.lightProbeGrid;Le.probesSH.value=Te.texture,Le.probesMin.value.copy(Te.boundingBox.min),Le.probesMax.value.copy(Te.boundingBox.max),Le.probesResolution.value.copy(Te.resolution)}Hs.upload(B,vh(Pt),Le,L)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Hs.upload(B,vh(Pt),Le,L),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Me.setValue(B,"center",K.center),Me.setValue(B,"modelViewMatrix",K.modelViewMatrix),Me.setValue(B,"normalMatrix",K.normalMatrix),Me.setValue(B,"modelMatrix",K.matrixWorld),J.uniformsGroups!==void 0){let Te=J.uniformsGroups;for(let pi=0,es=Te.length;pi<es;pi++){let bh=Te[pi];ft.update(bh,gn),ft.bind(bh,gn)}}return gn}function af(w,H){w.ambientLightColor.needsUpdate=H,w.lightProbe.needsUpdate=H,w.sunLights.needsUpdate=H,w.sunLightShadows.needsUpdate=H,w.directionalLights.needsUpdate=H,w.directionalLightShadows.needsUpdate=H,w.pointLights.needsUpdate=H,w.pointLightShadows.needsUpdate=H,w.spotLights.needsUpdate=H,w.spotLightShadows.needsUpdate=H,w.rectAreaLights.needsUpdate=H,w.hemisphereLights.needsUpdate=H}function cf(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return rt},this.setRenderTargetTextures=function(w,H,tt){let J=A.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),A.get(w.texture).__webglTexture=H,A.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:tt,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,H){let tt=A.get(w);tt.__webglFramebuffer=H,tt.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(w,H=0,tt=0){rt=w,Q=H,Y=tt;let J=null,K=!1,At=!1;if(w){let wt=A.get(w);if(wt.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(B.FRAMEBUFFER,wt.__webglFramebuffer),it.copy(w.viewport),bt.copy(w.scissor),vt=w.scissorTest,M.viewport(it),M.scissor(bt),M.setScissorTest(vt),et=-1;return}else if(wt.__webglFramebuffer===void 0)L.setupRenderTarget(w);else if(wt.__hasExternalTextures)L.rebindTextures(w,A.get(w.texture).__webglTexture,A.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let ne=w.depthTexture;if(wt.__boundDepthTexture!==ne){if(ne!==null&&A.has(ne)&&(w.width!==ne.image.width||w.height!==ne.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(w)}}let Dt=w.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(At=!0);let Bt=A.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Bt[H])?J=Bt[H][tt]:J=Bt[H],K=!0):w.samples>0&&L.useMultisampledRTT(w)===!1?J=A.get(w).__webglMultisampledFramebuffer:Array.isArray(Bt)?J=Bt[tt]:J=Bt,it.copy(w.viewport),bt.copy(w.scissor),vt=w.scissorTest}else it.copy(Tt).multiplyScalar(ct).floor(),bt.copy(Ht).multiplyScalar(ct).floor(),vt=ee;if(tt!==0&&(J=W),M.bindFramebuffer(B.FRAMEBUFFER,J)&&M.drawBuffers(w,J),M.viewport(it),M.scissor(bt),M.setScissorTest(vt),K){let wt=A.get(w.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+H,wt.__webglTexture,tt)}else if(At){let wt=H;for(let Dt=0;Dt<w.textures.length;Dt++){let Bt=A.get(w.textures[Dt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Dt,Bt.__webglTexture,tt,wt)}}else if(w!==null&&tt!==0){let wt=A.get(w.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,wt.__webglTexture,tt)}et=-1};function Sh(w){let H=A.get(w);return(H.__readFormat!==w.format||H.__readType!==w.type)&&(H.__readFormat=w.format,H.__readType=w.type,H.__formatReadable=I.textureFormatReadable(w.format),H.__typeReadable=I.textureTypeReadable(w.type)),H}this.readRenderTargetPixels=function(w,H,tt,J,K,At,It,wt=0){if(!(w&&w.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=A.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt){M.bindFramebuffer(B.FRAMEBUFFER,Dt);try{let Bt=w.textures[wt],ne=Bt.format,se=Bt.type;w.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+wt);let Nt=Sh(Bt);if(Nt.__formatReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Nt.__typeReadable===!1){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=w.width-J&&tt>=0&&tt<=w.height-K&&B.readPixels(H,tt,J,K,Mt.convert(ne),Mt.convert(se),At)}finally{let Bt=rt!==null?A.get(rt).__webglFramebuffer:null;M.bindFramebuffer(B.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(w,H,tt,J,K,At,It,wt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=A.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt)if(H>=0&&H<=w.width-J&&tt>=0&&tt<=w.height-K){M.bindFramebuffer(B.FRAMEBUFFER,Dt);let Bt=w.textures[wt],ne=Bt.format,se=Bt.type;w.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+wt);let Nt=Sh(Bt);if(Nt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Nt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ge=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ge),B.bufferData(B.PIXEL_PACK_BUFFER,At.byteLength,B.STREAM_READ),B.readPixels(H,tt,J,K,Mt.convert(ne),Mt.convert(se),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let De=rt!==null?A.get(rt).__webglFramebuffer:null;M.bindFramebuffer(B.FRAMEBUFFER,De);let Ae=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Bu(B,Ae,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ge),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,At),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(ge),B.deleteSync(Ae),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,H=null,tt=0){let J=Math.pow(2,-tt),K=Math.floor(w.image.width*J),At=Math.floor(w.image.height*J),It=H!==null?H.x:0,wt=H!==null?H.y:0;L.setTexture2D(w,0),B.copyTexSubImage2D(B.TEXTURE_2D,tt,0,0,It,wt,K,At),M.unbindTexture()},this.copyTextureToTexture=function(w,H,tt=null,J=null,K=0,At=0){let It,wt,Dt,Bt,ne,se,Nt,ge,De,Ae=w.isCompressedTexture?w.mipmaps[At]:w.image;if(tt!==null)It=tt.max.x-tt.min.x,wt=tt.max.y-tt.min.y,Dt=tt.isBox3?tt.max.z-tt.min.z:1,Bt=tt.min.x,ne=tt.min.y,se=tt.isBox3?tt.min.z:0;else{let Le=Math.pow(2,-K);It=Math.floor(Ae.width*Le),wt=Math.floor(Ae.height*Le),w.isDataArrayTexture?Dt=Ae.depth:w.isData3DTexture?Dt=Math.floor(Ae.depth*Le):Dt=1,Bt=0,ne=0,se=0}J!==null?(Nt=J.x,ge=J.y,De=J.z):(Nt=0,ge=0,De=0);let be=Mt.convert(H.format),We=Mt.convert(H.type),Pt;H.isData3DTexture?(L.setTexture3D(H,0),Pt=B.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(L.setTexture2DArray(H,0),Pt=B.TEXTURE_2D_ARRAY):(L.setTexture2D(H,0),Pt=B.TEXTURE_2D),M.activeTexture(B.TEXTURE0),M.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,H.flipY),M.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),M.pixelStorei(B.UNPACK_ALIGNMENT,H.unpackAlignment);let Ke=M.getParameter(B.UNPACK_ROW_LENGTH),le=M.getParameter(B.UNPACK_IMAGE_HEIGHT),gn=M.getParameter(B.UNPACK_SKIP_PIXELS),Fn=M.getParameter(B.UNPACK_SKIP_ROWS),di=M.getParameter(B.UNPACK_SKIP_IMAGES);M.pixelStorei(B.UNPACK_ROW_LENGTH,Ae.width),M.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ae.height),M.pixelStorei(B.UNPACK_SKIP_PIXELS,Bt),M.pixelStorei(B.UNPACK_SKIP_ROWS,ne),M.pixelStorei(B.UNPACK_SKIP_IMAGES,se);let ts=w.isDataArrayTexture||w.isData3DTexture,Me=H.isDataArrayTexture||H.isData3DTexture;if(w.isDepthTexture){let Le=A.get(w),fi=A.get(H),Te=A.get(Le.__renderTarget),pi=A.get(fi.__renderTarget);M.bindFramebuffer(B.READ_FRAMEBUFFER,Te.__webglFramebuffer),M.bindFramebuffer(B.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let es=0;es<Dt;es++)ts&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,A.get(w).__webglTexture,K,se+es),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,A.get(H).__webglTexture,At,De+es)),B.blitFramebuffer(Bt,ne,It,wt,Nt,ge,It,wt,B.DEPTH_BUFFER_BIT,B.NEAREST);M.bindFramebuffer(B.READ_FRAMEBUFFER,null),M.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(K!==0||w.isRenderTargetTexture||A.has(w)){let Le=A.get(w),fi=A.get(H);M.bindFramebuffer(B.READ_FRAMEBUFFER,F),M.bindFramebuffer(B.DRAW_FRAMEBUFFER,k);for(let Te=0;Te<Dt;Te++)ts?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Le.__webglTexture,K,se+Te):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Le.__webglTexture,K),Me?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,fi.__webglTexture,At,De+Te):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,fi.__webglTexture,At),K!==0?B.blitFramebuffer(Bt,ne,It,wt,Nt,ge,It,wt,B.COLOR_BUFFER_BIT,B.NEAREST):Me?B.copyTexSubImage3D(Pt,At,Nt,ge,De+Te,Bt,ne,It,wt):B.copyTexSubImage2D(Pt,At,Nt,ge,Bt,ne,It,wt);M.bindFramebuffer(B.READ_FRAMEBUFFER,null),M.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Me?w.isDataTexture||w.isData3DTexture?B.texSubImage3D(Pt,At,Nt,ge,De,It,wt,Dt,be,We,Ae.data):H.isCompressedArrayTexture?B.compressedTexSubImage3D(Pt,At,Nt,ge,De,It,wt,Dt,be,Ae.data):B.texSubImage3D(Pt,At,Nt,ge,De,It,wt,Dt,be,We,Ae):w.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,At,Nt,ge,It,wt,be,We,Ae.data):w.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,At,Nt,ge,Ae.width,Ae.height,be,Ae.data):B.texSubImage2D(B.TEXTURE_2D,At,Nt,ge,It,wt,be,We,Ae);M.pixelStorei(B.UNPACK_ROW_LENGTH,Ke),M.pixelStorei(B.UNPACK_IMAGE_HEIGHT,le),M.pixelStorei(B.UNPACK_SKIP_PIXELS,gn),M.pixelStorei(B.UNPACK_SKIP_ROWS,Fn),M.pixelStorei(B.UNPACK_SKIP_IMAGES,di),At===0&&H.generateMipmaps&&B.generateMipmap(Pt),M.unbindTexture()},this.initRenderTarget=function(w){A.get(w).__webglFramebuffer===void 0&&L.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?L.setTextureCube(w,0):w.isData3DTexture?L.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?L.setTexture2DArray(w,0):L.setTexture2D(w,0),M.unbindTexture()},this.resetState=function(){Q=0,Y=0,rt=null,M.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),e.unpackColorSpace=oe._getUnpackColorSpace()}};var Md={type:"change"},Xl={type:"start"},bd={type:"end"},sc=new Si,Sd=new un,Ax=Math.cos(70*ii.DEG2RAD),ze=new R,an=2*Math.PI,ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wl=1e-6,rc=class extends Nr{constructor(t,e=null){super(t,e),this.state=ye.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:yn.ROTATE,MIDDLE:yn.DOLLY,RIGHT:yn.PAN},this.touches={ONE:Ri.ROTATE,TWO:Ri.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new je,this._lastTargetPosition=new R,this._quat=new je().setFromUnitVectors(t.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ns,this._sphericalDelta=new Ns,this._scale=1,this._panOffset=new R,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new R,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Rx.bind(this),this._onPointerDown=Cx.bind(this),this._onPointerUp=Px.bind(this),this._onContextMenu=Bx.bind(this),this._onMouseWheel=Dx.bind(this),this._onKeyDown=Nx.bind(this),this._onTouchStart=Ux.bind(this),this._onTouchMove=Fx.bind(this),this._onMouseDown=Ix.bind(this),this._onMouseMove=Lx.bind(this),this._interceptControlDown=Ox.bind(this),this._interceptControlUp=zx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ye.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),t.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Md),this.update(),this.state=ye.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;ze.copy(e).sub(this.target),ze.applyQuaternion(this._quat),this._spherical.setFromVector3(ze),this.autoRotate&&this.state===ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=an:n>Math.PI&&(n-=an),s<-Math.PI?s+=an:s>Math.PI&&(s-=an),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ze.setFromSpherical(this._spherical),ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=ze.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new R(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(sc.origin.copy(this.object.position),sc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(sc.direction))<Ax?this.object.lookAt(this.target):(Sd.setFromNormalAndCoplanarPoint(this.object.up,this.target),sc.intersectPlane(Sd,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Wl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wl||this._lastTargetPosition.distanceToSquared(this.target)>Wl?(this.dispatchEvent(Md),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?an/60*this.autoRotateSpeed*t:an/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ze.setFromMatrixColumn(e,0),ze.multiplyScalar(-t),this._panOffset.add(ze)}_panUp(t,e){this.screenSpacePanning===!0?ze.setFromMatrixColumn(e,1):(ze.setFromMatrixColumn(e,0),ze.crossVectors(this.object.up,ze)),ze.multiplyScalar(t),this._panOffset.add(ze)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ze.copy(s).sub(this.target);let r=ze.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-an*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ut,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Cx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Rx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Px(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(bd),this.state=ye.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ix(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case yn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ye.DOLLY;break;case yn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}break;case yn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(Xl)}function Lx(i){switch(this.state){case ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Dx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ye.NONE||(i.preventDefault(),this.dispatchEvent(Xl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(bd))}function Nx(i){this.enabled!==!1&&this._handleKeyDown(i)}function Ux(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ri.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ye.TOUCH_ROTATE;break;case Ri.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ye.TOUCH_PAN;break;default:this.state=ye.NONE}break;case 2:switch(this.touches.TWO){case Ri.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ye.TOUCH_DOLLY_PAN;break;case Ri.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ye.TOUCH_DOLLY_ROTATE;break;default:this.state=ye.NONE}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(Xl)}function Fx(i){switch(this._trackPointer(i),this.state){case ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ye.NONE}}function Bx(i){this.enabled!==!1&&i.preventDefault()}function Ox(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ed={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},Ni=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(t){return new Kl(t)}),this.register(function(t){return new $l(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new jl(t)}),this.register(function(t){return new Ql(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new lh(t)})}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}setTextureUtils(t){return this.textureUtils=t,this}parse(t,e,n,s){let r=new Jl,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(t,e,s).catch(n)}parseAsync(t,e){let n=this;return new Promise(function(s,r){n.parse(t,s,r,e)})}},re={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},ql="KHR_mesh_quantization",mn={};mn[Ue]=re.NEAREST;mn[ua]=re.NEAREST_MIPMAP_NEAREST;mn[Ki]=re.NEAREST_MIPMAP_LINEAR;mn[Fe]=re.LINEAR;mn[Bs]=re.LINEAR_MIPMAP_NEAREST;mn[kn]=re.LINEAR_MIPMAP_LINEAR;mn[xn]=re.CLAMP_TO_EDGE;mn[xs]=re.REPEAT;mn[ys]=re.MIRRORED_REPEAT;var Td={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},Vx=new Wt,wd=12,kx=1179937895,Hx=2,Ad=8,Gx=1313821514,Wx=5130562;function ri(i,t){return i.length===t.length&&i.every(function(e,n){return e===t[n]})}function Xx(i){return new TextEncoder().encode(i).buffer}function qx(i){return ri(i.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function Yx(i,t,e){let n={min:new Array(i.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(i.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=t;s<t+e;s++)for(let r=0;r<i.itemSize;r++){let o;i.itemSize>4?o=i.array[s*i.itemSize+r]:(r===0?o=i.getX(s):r===1?o=i.getY(s):r===2?o=i.getZ(s):r===3&&(o=i.getW(s)),i.normalized===!0&&(o=ii.normalize(o,i.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function Cd(i){return Math.ceil(i/4)*4}function Yl(i,t=0){let e=Cd(i.byteLength);if(e!==i.byteLength){let n=new Uint8Array(e);if(n.set(new Uint8Array(i)),t!==0)for(let s=i.byteLength;s<e;s++)n[s]=t;return n.buffer}return i}function Zl(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function Zx(i,t){if(typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas){let e;return t==="image/jpeg"?e=.92:t==="image/webp"&&(e=.8),i.convertToBlob({type:t,quality:e})}else return new Promise(e=>i.toBlob(e,t))}var Jl=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r186"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map,normalMaps:new Map},this.textureUtils=null}setPlugins(t){this.plugins=t}setTextureUtils(t){this.textureUtils=t}async writeAsync(t,e,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1,copyright:null},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(t),await Promise.all(this.pending);let s=this,r=s.buffers,o=s.json;n=s.options;let a=s.extensionsUsed,c=s.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(c);if(h.length>0&&(o.extensionsUsed=h),u.length>0&&(o.extensionsRequired=u),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.copyright&&(o.asset.copyright=n.copyright),n.binary===!0){let d=new FileReader;d.readAsArrayBuffer(l),d.onloadend=function(){let f=Yl(d.result),m=new DataView(new ArrayBuffer(Ad));m.setUint32(0,f.byteLength,!0),m.setUint32(4,Wx,!0);let y=Yl(Xx(JSON.stringify(o)),32),g=new DataView(new ArrayBuffer(Ad));g.setUint32(0,y.byteLength,!0),g.setUint32(4,Gx,!0);let p=new ArrayBuffer(wd),E=new DataView(p);E.setUint32(0,kx,!0),E.setUint32(4,Hx,!0);let C=wd+g.byteLength+y.byteLength+m.byteLength+f.byteLength;E.setUint32(8,C,!0);let _=new Blob([p,g,y,m,f],{type:"application/octet-stream"}),T=new FileReader;T.readAsArrayBuffer(_),T.onloadend=function(){e(T.result)}}}else if(o.buffers&&o.buffers.length>0){let d=new FileReader;d.readAsDataURL(l),d.onloadend=function(){let f=d.result;o.buffers[0].uri=f,e(o)}}else e(o)}serializeUserData(t,e){if(Object.keys(t.userData).length===0)return;let n=this.options,s=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(t.userData));if(n.includeCustomExtensions&&r.gltfExtensions){e.extensions===void 0&&(e.extensions={});for(let o in r.gltfExtensions)e.extensions[o]=r.gltfExtensions[o],s[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(e.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+t.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(t,e=!1){if(this.uids.has(t)===!1){let s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(t,s)}return this.uids.get(t).get(e)}isNormalizedNormalAttribute(t){if(this.cache.attributesNormalized.has(t))return!1;let n=new R;for(let s=0,r=t.count;s<r;s++)if(Math.abs(n.fromBufferAttribute(t,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(t){let e=this.cache;if(e.attributesNormalized.has(t))return e.attributesNormalized.get(t);let n=t.clone(),s=new R;for(let r=0,o=n.count;r<o;r++)s.fromBufferAttribute(n,r),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(r,s.x,s.y,s.z);return e.attributesNormalized.set(t,n),n}applyTextureTransform(t,e){let n=!1,s={};(e.offset.x!==0||e.offset.y!==0)&&(s.offset=e.offset.toArray(),n=!0),e.rotation!==0&&(s.rotation=e.rotation,n=!0),(e.repeat.x!==1||e.repeat.y!==1)&&(s.scale=e.repeat.toArray(),n=!0),n&&(t.extensions=t.extensions||{},t.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(t,e){if(t===e)return t;function n(f){return f.colorSpace===ke?function(y){return y<.04045?y*.0773993808:Math.pow(y*.9478672986+.0521327014,2.4)}:function(y){return y}}t instanceof bi&&(t=await this.decompressTextureAsync(t)),e instanceof bi&&(e=await this.decompressTextureAsync(e));let s=t?t.image:null,r=e?e.image:null,o=Math.max(s?s.width:0,r?r.width:0),a=Math.max(s?s.height:0,r?r.height:0),c=Zl();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let h=l.getImageData(0,0,o,a);if(s){l.drawImage(s,0,0,o,a);let f=n(t),m=l.getImageData(0,0,o,a).data;for(let y=2;y<m.length;y+=4)h.data[y]=f(m[y]/256)*256}if(r){l.drawImage(r,0,0,o,a);let f=n(e),m=l.getImageData(0,0,o,a).data;for(let y=1;y<m.length;y+=4)h.data[y]=f(m[y]/256)*256}l.putImageData(h,0,0);let d=(t||e).clone();return d.source=new jn(c),d.colorSpace=Dn,d.channel=(t||e).channel,t&&e&&t.channel!==e.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async buildNormalMapTextureAsync(t,e,n){t instanceof bi&&(t=await this.decompressTextureAsync(t));let s=t.image,r=Zl();r.width=s.width,r.height=s.height;let o=r.getContext("2d",{willReadFrequently:!0});o.drawImage(s,0,0,r.width,r.height);let a=o.getImageData(0,0,r.width,r.height),c=a.data;for(let h=0;h<c.length;h+=4)e&&(c[h+0]=255-c[h+0]),n&&(c[h+1]=255-c[h+1]);o.putImageData(a,0,0);let l=t.clone();return l.source=new jn(r),l}async decompressTextureAsync(t,e=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(t,e)}processBuffer(t){let e=this.json,n=this.buffers;return e.buffers||(e.buffers=[{byteLength:0}]),n.push(t),0}processBufferView(t,e,n,s,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(e){case re.BYTE:case re.UNSIGNED_BYTE:a=1;break;case re.SHORT:case re.UNSIGNED_SHORT:a=2;break;default:a=4}let c=t.itemSize*a;r===re.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=Cd(s*c),h=new DataView(new ArrayBuffer(l)),u=0;for(let m=n;m<n+s;m++){for(let y=0;y<t.itemSize;y++){let g;t.itemSize>4?g=t.array[m*t.itemSize+y]:(y===0?g=t.getX(m):y===1?g=t.getY(m):y===2?g=t.getZ(m):y===3&&(g=t.getW(m)),t.normalized===!0&&(g=ii.normalize(g,t.array))),e===re.FLOAT?h.setFloat32(u,g,!0):e===re.INT?h.setInt32(u,g,!0):e===re.UNSIGNED_INT?h.setUint32(u,g,!0):e===re.SHORT?h.setInt16(u,g,!0):e===re.UNSIGNED_SHORT?h.setUint16(u,g,!0):e===re.BYTE?h.setInt8(u,g):e===re.UNSIGNED_BYTE&&h.setUint8(u,g),u+=a}u%c!==0&&(u+=c-u%c)}let d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(d.target=r),r===re.ARRAY_BUFFER&&(d.byteStride=c),this.byteOffset+=l,o.bufferViews.push(d),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(t){let e=this,n=e.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){let r=new FileReader;r.readAsArrayBuffer(t),r.onloadend=function(){let o=Yl(r.result),a={buffer:e.processBuffer(o),byteOffset:e.byteOffset,byteLength:o.byteLength};e.byteOffset+=o.byteLength,s(n.bufferViews.push(a)-1)}})}processAccessor(t,e,n,s){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(t.array.constructor===Float32Array)a=re.FLOAT;else if(t.array.constructor===Int32Array)a=re.INT;else if(t.array.constructor===Uint32Array)a=re.UNSIGNED_INT;else if(t.array.constructor===Int16Array)a=re.SHORT;else if(t.array.constructor===Uint16Array)a=re.UNSIGNED_SHORT;else if(t.array.constructor===Int8Array)a=re.BYTE;else if(t.array.constructor===Uint8Array)a=re.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+t.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=t.count),s===0)return null;let c=Yx(t,n,s),l;e!==void 0&&(l=t===e.index?re.ELEMENT_ARRAY_BUFFER:re.ARRAY_BUFFER);let h=this.processBufferView(t,a,n,s,l),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:s,max:c.max,min:c.min,type:o[t.itemSize]};return t.normalized===!0&&(u.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(u)-1}processImage(t,e,n,s="image/png"){if(t!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(t)||o.images.set(t,{});let h=o.images.get(t),u=s+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);let d={mimeType:s},f=Zl();f.width=Math.min(t.width,c.maxTextureSize),f.height=Math.min(t.height,c.maxTextureSize);let m=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,f.height),m.scale(1,-1)),t.data!==void 0){e!==on&&console.error("GLTFExporter: Only RGBAFormat is supported.",e),(t.width>c.maxTextureSize||t.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",t);let g=new Uint8ClampedArray(t.height*t.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=t.data[p+0],g[p+1]=t.data[p+1],g[p+2]=t.data[p+2],g[p+3]=t.data[p+3];m.putImageData(new ImageData(g,t.width,t.height),0,0)}else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas)m.drawImage(t,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(Zx(f,s).then(g=>r.processBufferViewImage(g)).then(g=>{d.bufferView=g})):d.uri=Es.getDataURL(f,s);let y=a.images.push(d)-1;return h[u]=y,y}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(t){let e=this.json;e.samplers||(e.samplers=[]);let n={magFilter:mn[t.magFilter],minFilter:mn[t.minFilter],wrapS:mn[t.wrapS],wrapT:mn[t.wrapT]};return e.samplers.push(n)-1}async processTextureAsync(t){let n=this.options,s=this.cache,r=this.json;if(s.textures.has(t))return s.textures.get(t);r.textures||(r.textures=[]),t instanceof bi&&(t=await this.decompressTextureAsync(t,n.maxTextureSize));let o=t.userData.mimeType,a=this.processImage(t.image,t.format,t.flipY,o),c={sampler:this.processSampler(t)};o==="image/webp"?(c.extensions=c.extensions||{},c.extensions.EXT_texture_webp={source:a},this.extensionsUsed.EXT_texture_webp=!0,this.extensionsRequired.EXT_texture_webp=!0):c.source=a,t.name&&(c.name=t.name),await this._invokeAllAsync(async function(h){h.writeTexture&&await h.writeTexture(t,c)});let l=r.textures.push(c)-1;return s.textures.set(t,l),l}async processMaterialAsync(t,e){let n=this.cache,s=this.json,r=e!==void 0&&e.hasAttribute("tangent"),o=t.normalMap?t.uuid+":"+r:t.uuid;if(n.materials.has(o))return n.materials.get(o);if(t.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;s.materials||(s.materials=[]);let a={pbrMetallicRoughness:{}};t.isMeshStandardMaterial!==!0&&t.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let c=t.color.toArray().concat([t.opacity]);if(ri(c,[1,1,1,1])||(a.pbrMetallicRoughness.baseColorFactor=c),t.isMeshStandardMaterial?(a.pbrMetallicRoughness.metallicFactor=t.metalness,a.pbrMetallicRoughness.roughnessFactor=t.roughness):(a.pbrMetallicRoughness.metallicFactor=0,a.pbrMetallicRoughness.roughnessFactor=1),t.metalnessMap||t.roughnessMap){let h=await this.buildMetalRoughTextureAsync(t.metalnessMap,t.roughnessMap),u={index:await this.processTextureAsync(h),texCoord:h.channel};this.applyTextureTransform(u,h),a.pbrMetallicRoughness.metallicRoughnessTexture=u}if(t.map){let h={index:await this.processTextureAsync(t.map),texCoord:t.map.channel};this.applyTextureTransform(h,t.map),a.pbrMetallicRoughness.baseColorTexture=h}if(t.emissive){let h=t.emissive;if(Math.max(h.r,h.g,h.b)>0&&(a.emissiveFactor=t.emissive.toArray()),t.emissiveMap){let d={index:await this.processTextureAsync(t.emissiveMap),texCoord:t.emissiveMap.channel};this.applyTextureTransform(d,t.emissiveMap),a.emissiveTexture=d}}if(t.normalMap){let h=t.normalScale,u=h.x<0,d=r?h.y<0:h.y>0,f=t.normalMap;if(u||d){n.normalMaps.has(t.normalMap)===!1&&n.normalMaps.set(t.normalMap,{});let y=n.normalMaps.get(t.normalMap),g=`${u}:${d}`;y[g]===void 0&&(y[g]=await this.buildNormalMapTextureAsync(t.normalMap,u,d)),f=y[g]}let m={index:await this.processTextureAsync(f),texCoord:t.normalMap.channel};Math.abs(h.x)!==1&&(m.scale=Math.abs(h.x)),this.applyTextureTransform(m,t.normalMap),a.normalTexture=m}if(t.aoMap){let h={index:await this.processTextureAsync(t.aoMap),texCoord:t.aoMap.channel};t.aoMapIntensity!==1&&(h.strength=t.aoMapIntensity),this.applyTextureTransform(h,t.aoMap),a.occlusionTexture=h}t.transparent?a.alphaMode="BLEND":t.alphaTest>0&&(a.alphaMode="MASK",a.alphaCutoff=t.alphaTest),t.side===Ce&&(a.doubleSided=!0),t.name!==""&&(a.name=t.name),this.serializeUserData(t,a),await this._invokeAllAsync(async function(h){h.writeMaterialAsync&&await h.writeMaterialAsync(t,a)});let l=s.materials.push(a)-1;return n.materials.set(o,l),l}async processMeshAsync(t){let e=this.cache,n=this.json,s=[t.geometry.uuid];if(Array.isArray(t.material))for(let _=0,T=t.material.length;_<T;_++)s.push(t.material[_].uuid);else s.push(t.material.uuid);let r=s.join(":");if(e.meshes.has(r))return e.meshes.get(r);let o=t.geometry,a;t.isLineSegments?a=re.LINES:t.isLineLoop?a=re.LINE_LOOP:t.isLine?a=re.LINE_STRIP:t.isPoints?a=re.POINTS:a=t.material.wireframe?re.LINES:re.TRIANGLES;let c={},l={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let m=null;for(let _ in o.attributes){if(_.slice(0,5)==="morph")continue;let T=o.attributes[_];if(_=d[_]||_.toUpperCase(),!/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)&&!_.startsWith("_")&&(_="_"+_),e.attributes.has(this.getUID(T))){l[_]=e.attributes.get(this.getUID(T));continue}m=null;let b=T.array;_==="JOINTS_0"&&!(b instanceof Uint16Array)&&!(b instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=Ni.Utils.toTypedBufferAttribute(T,Uint16Array)):(b instanceof Uint32Array||b instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),m=Ni.Utils.toTypedBufferAttribute(T,Float32Array));let x=this.processAccessor(m||T,o);x!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,T),l[_]=x,e.attributes.set(this.getUID(T),x))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(l).length===0)return null;if(t.morphTargetInfluences!==void 0&&t.morphTargetInfluences.length>0){let _=[],T=[],v={};if(t.morphTargetDictionary!==void 0)for(let b in t.morphTargetDictionary)v[t.morphTargetDictionary[b]]=b;for(let b=0;b<t.morphTargetInfluences.length;++b){let x={},P=!1;for(let D in o.morphAttributes){if(D!=="position"&&D!=="normal"){P||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),P=!0);continue}let U=o.morphAttributes[D][b],V=D.toUpperCase(),W=o.attributes[D];if(e.attributes.has(this.getUID(U,!0))){x[V]=e.attributes.get(this.getUID(U,!0));continue}let F=U.clone();if(!o.morphTargetsRelative)for(let k=0,Q=U.count;k<Q;k++)for(let Y=0;Y<U.itemSize;Y++)Y===0&&F.setX(k,U.getX(k)-W.getX(k)),Y===1&&F.setY(k,U.getY(k)-W.getY(k)),Y===2&&F.setZ(k,U.getZ(k)-W.getZ(k)),Y===3&&F.setW(k,U.getW(k)-W.getW(k));x[V]=this.processAccessor(F,o),e.attributes.set(this.getUID(W,!0),x[V])}u.push(x),_.push(t.morphTargetInfluences[b]),t.morphTargetDictionary!==void 0&&T.push(v[b])}c.weights=_,T.length>0&&(c.extras={},c.extras.targetNames=T)}let y=Array.isArray(t.material);if(y&&o.groups.length===0)return null;let g=!1;if(y&&o.index===null){let _=[];for(let T=0,v=o.attributes.position.count;T<v;T++)_[T]=T;o.setIndex(_),g=!0}let p=y?t.material:[t.material],E=y?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,T=E.length;_<T;_++){let v={mode:a,attributes:l};if(this.serializeUserData(o,v),u.length>0&&(v.targets=u),o.index!==null){let x=this.getUID(o.index);(E[_].start!==void 0||E[_].count!==void 0)&&(x+=":"+E[_].start+":"+E[_].count),e.attributes.has(x)?v.indices=e.attributes.get(x):(v.indices=this.processAccessor(o.index,o,E[_].start,E[_].count),e.attributes.set(x,v.indices)),v.indices===null&&delete v.indices}let b=await this.processMaterialAsync(p[E[_].materialIndex],o);b!==null&&(v.material=b),h.push(v)}g===!0&&o.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(t,c)});let C=n.meshes.push(c)-1;return e.meshes.set(r,C),C}detectMeshQuantization(t,e){if(this.extensionsUsed[ql])return;let n;switch(e.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}e.normalized&&(n+=" normalized");let s=t.split("_",1)[0];Ed[s]&&Ed[s].includes(n)&&(this.extensionsUsed[ql]=!0,this.extensionsRequired[ql]=!0)}processCamera(t){let e=this.json;e.cameras||(e.cameras=[]);let n=t.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:t.right*2,ymag:t.top*2,zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near}:s.perspective={aspectRatio:t.aspect,yfov:ii.degToRad(t.fov),zfar:t.far<=0?.001:t.far,znear:t.near<0?0:t.near},t.name!==""&&(s.name=t.type),e.cameras.push(s)-1}processAnimation(t,e){let n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),t=Ni.Utils.mergeMorphTargetTracks(t.clone(),e);let r=t.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let h=r[l],u=_e.parseTrackName(h.name),d=_e.findNode(e,u.nodeName),f=Td[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,y=h.values.length/h.times.length;f===Td.morphTargetInfluences&&(y/=d.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",y/=3):h.getInterpolation()===Gi?g="STEP":g="LINEAR",a.push({input:this.processAccessor(new Re(h.times,m)),output:this.processAccessor(new Re(h.values,y)),interpolation:g}),o.push({sampler:a.length-1,target:{node:s.get(d),path:f}})}let c={name:t.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(t,c),n.animations.push(c),n.animations.length-1}processSkin(t){let e=this.json,n=this.nodeMap,s=e.nodes[n.get(t)],r=t.skeleton;if(r===void 0)return null;let o=t.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new ue;for(let u=0;u<r.bones.length;++u)a.push(n.get(r.bones[u])),l.copy(r.boneInverses[u]),l.multiply(t.bindMatrix).toArray(c,u*16);return e.skins===void 0&&(e.skins=[]),e.skins.push({inverseBindMatrices:this.processAccessor(new Re(c,16)),joints:a,skeleton:n.get(o)}),s.skin=e.skins.length-1}async processNodeAsync(t){let e=this.json,n=this.options,s=this.nodeMap;if(e.nodes||(e.nodes=[]),t.pivot!==null)return await this._processNodeWithPivotAsync(t);let r={};if(n.trs){let a=t.quaternion.toArray(),c=t.position.toArray(),l=t.scale.toArray();ri(a,[0,0,0,1])||(r.rotation=a),ri(c,[0,0,0])||(r.translation=c),ri(l,[1,1,1])||(r.scale=l)}else t.matrixAutoUpdate&&t.updateMatrix(),qx(t.matrix)===!1&&(r.matrix=t.matrix.elements);if(t.name!==""&&(r.name=String(t.name)),this.serializeUserData(t,r),t.isMesh||t.isLine||t.isPoints){let a=await this.processMeshAsync(t);a!==null&&(r.mesh=a)}else t.isCamera&&(r.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);let o=e.nodes.push(r)-1;if(s.set(t,o),t.children.length>0){let a=[];for(let c=0,l=t.children.length;c<l;c++){let h=t.children[c];if(h.visible||n.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(t,r)}),o}async _processNodeWithPivotAsync(t){let e=this.json,n=this.options,s=this.nodeMap,r=t.pivot,o={},a=t.quaternion.toArray(),c=[t.position.x+r.x,t.position.y+r.y,t.position.z+r.z],l=t.scale.toArray();ri(a,[0,0,0,1])||(o.rotation=a),ri(c,[0,0,0])||(o.translation=c),ri(l,[1,1,1])||(o.scale=l),o.extras={pivot:r.toArray()},t.name!==""&&(o.name=String(t.name)),this.serializeUserData(t,o);let h=e.nodes.push(o)-1;s.set(t,h);let u={},d=[-r.x,-r.y,-r.z];if(ri(d,[0,0,0])||(u.translation=d),t.isMesh||t.isLine||t.isPoints){let y=await this.processMeshAsync(t);y!==null&&(u.mesh=y)}else t.isCamera&&(u.camera=this.processCamera(t));t.isSkinnedMesh&&this.skins.push(t);let m=[e.nodes.push(u)-1];if(t.children.length>0){let y=[];for(let g=0,p=t.children.length;g<p;g++){let E=t.children[g];if(E.visible||n.onlyVisible===!1){let C=await this.processNodeAsync(E);C!==null&&y.push(C)}}y.length>0&&(u.children=y)}return o.children=m,await this._invokeAllAsync(function(y){y.writeNode&&y.writeNode(t,o)}),h}async processSceneAsync(t){let e=this.json,n=this.options;e.scenes||(e.scenes=[],e.scene=0);let s={};t.name!==""&&(s.name=t.name),e.scenes.push(s);let r=[];for(let o=0,a=t.children.length;o<a;o++){let c=t.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(s.nodes=r),this.serializeUserData(t,s)}async processObjectsAsync(t){let e=new Mi;e.name="AuxScene";for(let n=0;n<t.length;n++)e.children.push(t[n]);await this.processSceneAsync(e)}async processInputAsync(t){let e=this.options;t=t instanceof Array?t:[t],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(t)});let n=[];for(let s=0;s<t.length;s++)t[s]instanceof Mi?await this.processSceneAsync(t[s]):n.push(t[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);if(t.length===1)for(let s=0;s<e.animations.length;++s)this.processAnimation(e.animations[s],t[0]);else for(let s=0;s<t.length;s++){let r=e.animations[s]||[];for(let o=0;o<r.length;++o)this.processAnimation(r[o],t[s])}await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(t)})}async _invokeAllAsync(t){for(let e=0,n=this.plugins.length;e<n;e++)await t(this.plugins[e])}},Kl=class{constructor(t){this.writer=t,this.name="KHR_lights_punctual"}writeNode(t,e){if(!t.isLight)return;if(!t.isDirectionalLight&&!t.isPointLight&&!t.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",t);return}let n=this.writer,s=n.json,r=n.extensionsUsed,o={};t.name&&(o.name=t.name),o.color=t.color.toArray(),o.intensity=t.intensity,t.isDirectionalLight?o.type="directional":t.isPointLight?(o.type="point",t.distance>0&&(o.range=t.distance)):t.isSpotLight&&(o.type="spot",t.distance>0&&(o.range=t.distance),o.spot={},o.spot.innerConeAngle=(1-t.penumbra)*t.angle,o.spot.outerConeAngle=t.angle),t.decay!==void 0&&t.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),t.target&&(t.target.parent!==t||t.target.position.x!==0||t.target.position.y!==0||t.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},r[this.name]=!0);let a=s.extensions[this.name].lights;a.push(o),e.extensions=e.extensions||{},e.extensions[this.name]={light:a.length-1}}},$l=class{constructor(t){this.writer=t,this.name="KHR_materials_unlit"}async writeMaterialAsync(t,e){if(!t.isMeshBasicMaterial)return;let s=this.writer.extensionsUsed;e.extensions=e.extensions||{},e.extensions[this.name]={},s[this.name]=!0,e.pbrMetallicRoughness.metallicFactor=0,e.pbrMetallicRoughness.roughnessFactor=.9}},jl=class{constructor(t){this.writer=t,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.clearcoat===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.clearcoatFactor=t.clearcoat,t.clearcoatMap){let o={index:await n.processTextureAsync(t.clearcoatMap),texCoord:t.clearcoatMap.channel};n.applyTextureTransform(o,t.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=t.clearcoatRoughness,t.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(t.clearcoatRoughnessMap),texCoord:t.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,t.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(t.clearcoatNormalMap){let o={index:await n.processTextureAsync(t.clearcoatNormalMap),texCoord:t.clearcoatNormalMap.channel};t.clearcoatNormalScale.x!==1&&(o.scale=t.clearcoatNormalScale.x),n.applyTextureTransform(o,t.clearcoatNormalMap),r.clearcoatNormalTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},Ql=class{constructor(t){this.writer=t,this.name="KHR_materials_dispersion"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.dispersion===0)return;let s=this.writer.extensionsUsed,r={};r.dispersion=t.dispersion,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},th=class{constructor(t){this.writer=t,this.name="KHR_materials_iridescence"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.iridescence===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.iridescenceFactor=t.iridescence,t.iridescenceMap){let o={index:await n.processTextureAsync(t.iridescenceMap),texCoord:t.iridescenceMap.channel};n.applyTextureTransform(o,t.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=t.iridescenceIOR,r.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1],t.iridescenceThicknessMap){let o={index:await n.processTextureAsync(t.iridescenceThicknessMap),texCoord:t.iridescenceThicknessMap.channel};n.applyTextureTransform(o,t.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},eh=class{constructor(t){this.writer=t,this.name="KHR_materials_transmission"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.transmissionFactor=t.transmission,t.transmissionMap){let o={index:await n.processTextureAsync(t.transmissionMap),texCoord:t.transmissionMap.channel};n.applyTextureTransform(o,t.transmissionMap),r.transmissionTexture=o}e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},nh=class{constructor(t){this.writer=t,this.name="KHR_materials_volume"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.transmission===0)return;let n=this.writer,s=n.extensionsUsed,r={};if(r.thicknessFactor=t.thickness,t.thicknessMap){let o={index:await n.processTextureAsync(t.thicknessMap),texCoord:t.thicknessMap.channel};n.applyTextureTransform(o,t.thicknessMap),r.thicknessTexture=o}t.attenuationDistance!==1/0&&(r.attenuationDistance=t.attenuationDistance),r.attenuationColor=t.attenuationColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},ih=class{constructor(t){this.writer=t,this.name="KHR_materials_ior"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.ior===1.5)return;let s=this.writer.extensionsUsed,r={};r.ior=t.ior,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},sh=class{constructor(t){this.writer=t,this.name="KHR_materials_specular"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.specularIntensity===1&&t.specularColor.equals(Vx)&&!t.specularIntensityMap&&!t.specularColorMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.specularIntensityMap){let o={index:await n.processTextureAsync(t.specularIntensityMap),texCoord:t.specularIntensityMap.channel};n.applyTextureTransform(o,t.specularIntensityMap),r.specularTexture=o}if(t.specularColorMap){let o={index:await n.processTextureAsync(t.specularColorMap),texCoord:t.specularColorMap.channel};n.applyTextureTransform(o,t.specularColorMap),r.specularColorTexture=o}r.specularFactor=t.specularIntensity,r.specularColorFactor=t.specularColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},rh=class{constructor(t){this.writer=t,this.name="KHR_materials_sheen"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.sheen==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.sheenRoughnessMap){let o={index:await n.processTextureAsync(t.sheenRoughnessMap),texCoord:t.sheenRoughnessMap.channel};n.applyTextureTransform(o,t.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(t.sheenColorMap){let o={index:await n.processTextureAsync(t.sheenColorMap),texCoord:t.sheenColorMap.channel};n.applyTextureTransform(o,t.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=t.sheenRoughness,r.sheenColorFactor=t.sheenColor.toArray(),e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},oh=class{constructor(t){this.writer=t,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(t,e){if(!t.isMeshPhysicalMaterial||t.anisotropy==0)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.anisotropyMap){let o={index:await n.processTextureAsync(t.anisotropyMap)};n.applyTextureTransform(o,t.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=t.anisotropy,r.anisotropyRotation=t.anisotropyRotation,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},ah=class{constructor(t){this.writer=t,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.emissiveIntensity===1)return;let s=this.writer.extensionsUsed,r={};r.emissiveStrength=t.emissiveIntensity,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},ch=class{constructor(t){this.writer=t,this.name="EXT_materials_bump"}async writeMaterialAsync(t,e){if(!t.isMeshStandardMaterial||t.bumpScale===1&&!t.bumpMap)return;let n=this.writer,s=n.extensionsUsed,r={};if(t.bumpMap){let o={index:await n.processTextureAsync(t.bumpMap),texCoord:t.bumpMap.channel};n.applyTextureTransform(o,t.bumpMap),r.bumpTexture=o}r.bumpFactor=t.bumpScale,e.extensions=e.extensions||{},e.extensions[this.name]=r,s[this.name]=!0}},lh=class{constructor(t){this.writer=t,this.name="EXT_mesh_gpu_instancing"}writeNode(t,e){if(!t.isInstancedMesh)return;let n=this.writer,s=t,r=new Float32Array(s.count*3),o=new Float32Array(s.count*4),a=new Float32Array(s.count*3),c=new ue,l=new R,h=new je,u=new R;for(let f=0;f<s.count;f++)s.getMatrixAt(f,c),c.decompose(l,h,u),l.toArray(r,f*3),h.toArray(o,f*4),u.toArray(a,f*3);let d={TRANSLATION:n.processAccessor(new Re(r,3)),ROTATION:n.processAccessor(new Re(o,4)),SCALE:n.processAccessor(new Re(a,3))};s.instanceColor&&(d._COLOR_0=n.processAccessor(s.instanceColor)),e.extensions=e.extensions||{},e.extensions[this.name]={attributes:d},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};Ni.Utils={insertKeyframe:function(i,t){let n=i.getValueSize(),s=new i.TimeBufferType(i.times.length+1),r=new i.ValueBufferType(i.values.length+n),o=i.createInterpolant(new i.ValueBufferType(n)),a;if(i.times.length===0){s[0]=t;for(let c=0;c<n;c++)r[c]=0;a=0}else if(t<i.times[0]){if(Math.abs(i.times[0]-t)<.001)return 0;s[0]=t,s.set(i.times,1),r.set(o.evaluate(t),0),r.set(i.values,n),a=0}else if(t>i.times[i.times.length-1]){if(Math.abs(i.times[i.times.length-1]-t)<.001)return i.times.length-1;s[s.length-1]=t,s.set(i.times,0),r.set(i.values,0),r.set(o.evaluate(t),i.values.length),a=s.length-1}else for(let c=0;c<i.times.length;c++){if(Math.abs(i.times[c]-t)<.001)return c;if(i.times[c]<t&&i.times[c+1]>t){s.set(i.times.slice(0,c+1),0),s[c+1]=t,s.set(i.times.slice(c+1),c+2),r.set(i.values.slice(0,(c+1)*n),0),r.set(o.evaluate(t),(c+1)*n),r.set(i.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return i.times=s,i.values=r,a},mergeMorphTargetTracks:function(i,t){let e=[],n={},s=i.tracks;for(let r=0;r<s.length;++r){let o=s[r],a=_e.parseTrackName(o.name),c=_e.findNode(t,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){e.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(vs)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(n[c.uuid]===void 0){u=o.clone();let f=new u.ValueBufferType(l*u.times.length);for(let m=0;m<u.times.length;m++)f[m*l+h]=u.values[m];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=f,n[c.uuid]=u,e.push(u);continue}let d=o.createInterpolant(new o.ValueBufferType(1));u=n[c.uuid];for(let f=0;f<u.times.length;f++)u.values[f*l+h]=d.evaluate(u.times[f]);for(let f=0;f<o.times.length;f++){let m=this.insertKeyframe(u,o.times[f]);u.values[m*l+h]=o.values[f]}}return i.tracks=e,i},toTypedBufferAttribute:function(i,t){let e=new Re(new t(i.count*i.itemSize),i.itemSize,!1);if(!i.normalized&&!i.isInterleavedBufferAttribute)return e.array.set(i.array),e;for(let n=0,s=i.count;n<s;n++)for(let r=0;r<i.itemSize;r++)e.setComponent(n,r,i.getComponent(n,r));return e}};function Rd(i){let t=new Zt;t.name="Giardino villa piscina e panorama",t.userData={photographicReconstruction:!0,surveyVerified:!1};let e=new Map,n=S=>(e.has(S)||e.set(S,new ce({color:S,roughness:.86})),e.get(S)),s="#ede9dc",r="#b66f4d",o="#888c7e",a="#496039",c="#343a35";function l(S,A,L,O=[0,0,0],$=t){let z=new ae(S,typeof A=="string"?n(A):A);return z.name=L,z.position.set(...O),z.castShadow=!0,z.receiveShadow=!0,$.add(z),z}function h(S,A,L,O,$,z,q,at=s,_t=t){return l(new Ye($,z,q),at,S,[A,L,O],_t)}function u(S,A,L,O,$=c,z=t){A=new R(...A),L=new R(...L);let q=L.clone().sub(A),at=l(new we(O,O,q.length(),6),$,S,A.clone().add(L).multiplyScalar(.5).toArray(),z);return at.quaternion.setFromUnitVectors(new R(0,1,0),q.normalize()),at}function d(S,A,L,O,$=t){let z=new Cn;A.forEach(([at,_t],mt)=>mt?z.lineTo(at,-_t):z.moveTo(at,-_t)),z.closePath();let q=new Er(z);return q.rotateX(-Math.PI/2),l(q,O,S,[0,L,0],$)}let f=493;function m(){return f=f*1664525+1013904223>>>0,f/4294967296}function y(S,A,L=1,O=0,$=!1,z=t){for(let q=0;q<7;q++){let at=q*2.399,_t=l(new Sr(L*(.46+m()*.18),1),$&&q%3===0?"#a64d88":["#365230","#476737","#617b43"][q%3],"Arbusto giardino",[S+Math.cos(at)*L*.42,O+L*.55+m()*.25,A+Math.sin(at)*L*.42],z);_t.scale.y=.8}}function g(S,A,L=5,O=2,$=0,z=t){u("Tronco giardino",[S,$,A],[S,$+L*.7,A],.13,"#786855",z);for(let q=0;q<7;q++){let at=q*2.399,_t=S+Math.cos(at)*O*.55,mt=A+Math.sin(at)*O*.55;u("Ramo giardino",[S,$+L*.45,A],[_t,$+L*.8,mt],.045,"#786855",z),y(_t,mt,O*.7,$+L*.65,!1,z)}}function p(S,A,L=.8,O=t){let $=Math.hypot(A[0]-S[0],A[1]-S[1]),z=Math.ceil($/.85);for(let q=0;q<=z;q++)y(S[0]+(A[0]-S[0])*q/z,S[1]+(A[1]-S[1])*q/z,.65,L,!1,O)}function E(S,A,L=4,O=0,$=t){u("Tronco palma",[S,O,A],[S+.15,O+L,A],.13,"#816c4e",$);for(let z=0;z<13;z++){let q=z*2.399,at=[S+.15,O+L,A];for(let _t=1;_t<7;_t++){let mt=_t/6,gt=[S+.15+Math.cos(q)*2.6*mt,O+L+Math.sin(mt*Math.PI)*.75-.65*mt,A+Math.sin(q)*2.6*mt];u("Nervatura palma",at,gt,.014,a,$);for(let Lt of[-1,1]){let Vt=.55*Math.sin(mt*Math.PI),$t=[...at,...gt,gt[0]+Math.cos(q+Math.PI/2)*Vt*Lt,gt[1]-.25,gt[2]+Math.sin(q+Math.PI/2)*Vt*Lt],G=new he;G.setAttribute("position",new Jt($t,3)),G.computeVertexNormals();let yt=l(G,new ce({color:z%2?"#52723a":"#698a45",side:Ce}),"Palma fronda",[0,0,0],$)}at=gt}}}function C(S,A,L=0,O=!0,$=t){l(new we(.27,.18,.43,10),r,"Vaso terracotta",[S,L+.215,A],$),y(S,A,.4,L+.35,O,$)}function _(S,A,L,O=t){let $=Math.hypot(A[0]-S[0],A[1]-S[1]),z=Math.ceil($/.4);for(let q=0;q<=z;q++){let at=S[0]+(A[0]-S[0])*q/z,_t=S[1]+(A[1]-S[1])*q/z;u("Ringhiera giardino",[at,L,_t],[at,L+.88,_t],.018,c,O)}u("Corrimano giardino",[S[0],L+.88,S[1]],[A[0],L+.88,A[1]],.024,c,O)}d("Prato esteso casa",[[-35,18],[-12,19],[22,24],[25,67],[-35,70]],.799,"#50634d"),h("Muro contenimento villa",-5,.3,68,58,1.1,.3),p([-34,21],[-34,67]),p([-34,67],[23,67]);for(let[S,A,L,O]of[[-30,30,5,2.4],[-26,42,5.8,2.8],[-32,57,6,2.5],[20,60,4.5,2],[21,31,5,2.1]])g(S,A,L,O,.8);let T=[[1045,655],[1100,927],[1495,1062]];for(let S=1;S<T.length;S++){let A=i(...T[S-1],.82),L=i(...T[S],.82),O=L.clone().sub(A),$=Math.ceil(O.length()/.43),z=new R(-O.z,0,O.x).normalize();for(let q=0;q<=$;q++)for(let at of[-1,1]){let _t=A.clone().lerp(L,q/$).addScaledVector(z,at*.25),mt=l(new we(.2,.22,.055,8),o,"Passi in pietra da planimetria",_t.toArray());mt.rotation.y=q*.6}}p([-18,26],[-18,38]),p([-18,42],[-18,63]);let v=new Zt;v.name="Casa e piscina",v.position.copy(i(1450,610,0)),t.add(v);let b=1.7;h("Solarium lato casa",0,b-.13,5,21,.26,3.2,r,v),h("Solarium lato mare",0,b-.13,-5,21,.26,3.2,r,v),h("Solarium sinistro",-8.8,b-.13,0,3.4,.26,6.8,r,v),h("Solarium destro",8.8,b-.13,0,3.4,.26,6.8,r,v),h("Piscina fondo azzurro",0,b-1.25,0,14,.1,6,"#59bdce",v);for(let S of[-3.08,3.08])h("Piscina parete",0,b-.65,S,14.4,1.3,.16,"#a8dadb",v),h("Bordo piscina cotto",0,b+.025,S,14.5,.12,.32,r,v);for(let S of[-7.1,7.1])h("Piscina parete",S,b-.65,0,.2,1.3,6.1,"#a8dadb",v),h("Bordo piscina cotto",S,b+.025,0,.32,.12,6.45,r,v);let x=new Ar({color:"#28b8d3",roughness:.16,metalness:.12,transparent:!0,opacity:.78,clearcoat:1}),P=new Yi(14,6,45,20);P.rotateX(-Math.PI/2);let D=P.attributes.position;for(let S=0;S<D.count;S++)D.setY(S,.012*Math.sin(D.getX(S)*8+D.getZ(S)*11));P.computeVertexNormals(),l(P,x,"Piscina acqua",[0,b-.12,0],v);for(let S=0;S<65;S++){let A=-6.7+m()*13.4,L=-2.8+m()*5.6,O=h("Riflesso acqua piscina",A,b-.105,L,.1+m()*.35,.004,.008,"#72dae0",v);O.rotation.y=m(),O.castShadow=!1}h("Trampolino bianco",7,b+.4,0,2.6,.12,.55,s,v),h("Base trampolino",8,b+.18,0,.5,.36,.48,s,v);for(let S of[-.45,.45])u("Scaletta piscina",[-6.8,b-1,S],[-6.8,b+.65,S],.035,"#b9ccca",v),u("Scaletta piscina maniglia",[-6.8,b+.65,S],[-7.6,b+.65,S],.035,"#b9ccca",v);for(let S=0;S<4;S++)u("Scaletta piscina gradino",[-6.8,b-.95+S*.26,-.45],[-6.8,b-.95+S*.26,.45],.036,"#b9ccca",v);for(let S=-10;S<=10;S+=.65)for(let A of[-5,5])h("Fuga cotto",S,b+.005,A,.012,.006,2.95,"#c18a69",v);function U(S,A,L){let O=new Zt;O.position.set(S,b,A),O.rotation.y=L,v.add(O),h("Lettino tela bianca",0,.34,0,.7,.09,1.9,s,O);let $=h("Lettino schienale",0,.58,-.62,.7,.08,.65,s,O);$.rotation.x=.5;for(let z of[-.32,.32])u("Lettino telaio",[z,.05,-.8],[z,.34,.8],.025,c,O),u("Lettino telaio",[z,.34,-.8],[z,.05,.8],.025,c,O)}for(let[S,A,L]of[[-4,-4.7,.25],[0,-4.7,0],[4,-4.7,-.2],[8.9,-1,Math.PI/2],[8.9,1.7,Math.PI/2],[-8.9,2,-Math.PI/2]])U(S,A,L);for(let[S,A]of[[-9.5,-5.5],[9.6,-5.5],[-9.5,5.5]])E(S,A,3.1,b,v);for(let[S,A]of[[-6,-5.4],[2,-5.5],[6,5.7],[-6,5.7],[-9,3.8],[9,3.8]])C(S,A,b,!0,v);_([-10.4,-6.5],[10.4,-6.5],b,v),p([-10.7,-6.8],[10.7,-6.8],b-.2,v),h("Casa volume bianco",0,b+2,11.8,19,4,8.6,s,v),h("Veranda pavimento",0,b+.37,7.1,18,.24,3.1,r,v),h("Veranda soffitto",0,b+3.4,7.1,19,.2,3.4,s,v);for(let S of[-8.7,-3.1,3.1,8.7])h("Veranda pilastro",S,b+1.95,5.8,.25,2.9,.25,s,v);for(let S=0;S<3;S++)h("Scala veranda",0,b+.06+S*.12,5.1+S*.25,4,.12+S*.12,.3,r,v);function V(S,A,L=1.8){h("Infisso legno",S,b+1.8,A,L+.14,1.9,.12,"#6b4f35",v),h("Vetro finestra",S,b+1.8,A-.075,L,1.75,.035,"#283e3c",v);for(let O=-L/2;O<=L/2;O+=.2)u("Grata finestra",[S+O,b+.9,A-.12],[S+O,b+2.7,A-.12],.017,c,v);for(let O of[1.1,2.4])u("Grata traversa",[S-L/2,b+O,A-.12],[S+L/2,b+O,A-.12],.019,c,v)}for(let S of[-6.1,-1.2,4.2,7.2])V(S,7.46,S===-1.2?2.4:1.8);for(let S of[10,13.2]){h("Finestra laterale",9.56,b+2,S,.08,1.8,1.5,"#293e39",v);for(let A=0;A<8;A++)u("Inferriata laterale",[9.62,b+1.1,S-.7+A*.2],[9.62,b+2.9,S-.7+A*.2],.017,c,v)}h("Terrazzo tetto calpestio",0,b+4.07,11.7,13,.14,7.6,r,v);for(let S of[8,15.4])h("Parapetto terrazzo",0,b+4.48,S,13,.8,.2,s,v),h("Cimasa cotto",0,b+4.9,S,13.2,.055,.28,r,v);for(let S of[-6.5,6.5])h("Parapetto terrazzo",S,b+4.48,11.7,.2,.8,7.6,s,v);function W(S,A,L,O,$=0){let z=new Zt;z.position.set(S,b+4.02,A),z.rotation.z=$,v.add(z),h("Tetto falda cotto",0,0,0,L,.15,O,r,z);for(let q=-L/2;q<=L/2;q+=.2)u("Coppo terracotta",[q,.1,-O/2],[q,.1,O/2],.055,q%1>.4?"#a66447":"#c18a61",z)}W(-8.15,11.65,3.8,9.5,.16),W(8.15,11.65,3.8,9.5,-.16),W(0,6.5,19,1.1),h("Camino",-4.6,b+5.25,14.2,.5,2.2,.55,s,v);for(let S=0;S<3;S++)h("Camino cappello",-4.6,b+6.3+S*.1,14.2,.64,.06,.68,r,v);for(let[S,A]of[[-5.6,8.8],[5.5,14.6]])C(S,A,b+4.15,!1,v);for(let S of[-6,5]){h("Tavolo veranda legno",S,b+1.1,6.8,1.3,.12,.8,"#79583d",v);for(let A of[-.55,.55])for(let L of[-.3,.3])h("Gamba tavolo veranda",S+A,b+.78,6.8+L,.06,.55,.06,"#79583d",v);for(let A of[6,7.7])h("Panca veranda",S,b+.84,A,1.9,.12,.55,"#79583d",v),h("Panca veranda schienale",S,b+1.2,A+.2,1.9,.7,.08,"#79583d",v)}let F=[[-11.3993,10.4106],[-6.7644,-0],[-2.3883,-.7876],[6.7644,0],[12.3837,6.4903],[4.5321,13.2008],[3.0302,13.4709],[2.834,12.3917],[.7625,12.7661],[.9582,13.8453],[-1.7866,14.3399]],k=["Casa volume bianco","Terrazzo tetto calpestio","Parapetto terrazzo","Cimasa cotto","Veranda pavimento","Veranda soffitto","Veranda pilastro","Infisso legno","Vetro finestra","Grata finestra","Grata traversa","Finestra laterale","Inferriata laterale","Panca veranda","Panca veranda schienale"];for(let S of[...v.children])(k.includes(S.name)||S.children.some(A=>A.name==="Tetto falda cotto"))&&S.removeFromParent();let Q=new ue().makeScale(13.528706216292582/19,1,.8).multiply(new ue().makeTranslation(0,0,-5.65));for(let S of v.children)S.applyMatrix4(Q);v.position.copy(i(1510.73,619.47)),v.rotation.y=-1.4849557511646156,v.userData={footprintSource:"planimetria.pdf, A3 1:200, vector outline",frontWidthMetres:13.528706216292582,frontWidthEstimatedAcrossLegend:!0,hiddenOutline:"Northern connection under PDF legend reconstructed",poolDimensionsEstimated:!0};let Y=F.map(([S,A])=>[S,Math.max(2.35,A)]),rt=new Cn;Y.forEach(([S,A],L)=>L?rt.lineTo(S,-A):rt.moveTo(S,-A)),rt.closePath();let et=new ni(rt,{depth:3.5,bevelEnabled:!1});et.rotateX(-Math.PI/2),l(et,s,"Casa sagoma da planimetria",[0,b,0],v),d("Tetto terrazza sagoma originale",F,b+3.55,r,v),h("Portico pavimento cotto",0,b+.33,1.2,13.3,.2,2.7,r,v),h("Portico soffitto intonaco",0,b+3.25,1.2,13.8,.2,3.05,s,v);for(let S of[-6.5,-2.3,2.3,6.5])h("Portico pilastro quadrato",S,b+1.75,0,.24,2.9,.24,s,v);for(let S of[-4.05,4.05])h("Portico muretto basso",S,b+.65,-.04,4.65,.66,.22,s,v),h("Portico copertina cotto",S,b+1,-.04,4.76,.065,.31,r,v);for(let S of[-4.6,0,4.8]){h("Portico porta legno",S,b+1.52,2.3,1.7,2.35,.09,"#624631",v),h("Portico vetrata",S,b+1.6,2.23,1.43,1.92,.035,"#263e3b",v);for(let A=0;A<7;A++)u("Portico grata",[S-.69+A*.23,b+.54,2.18],[S-.69+A*.23,b+2.7,2.18],.014,c,v)}let st=new Zt;st.name="Scala a chiocciola portico",st.position.set(-5.75,b+.43,1.25),v.add(st),u("Scala chiocciola asse",[0,0,0],[0,3.55,0],.04,c,st);for(let S=0;S<18;S++){let A=S*Math.PI/7,L=S*.19,O=new Zt;if(O.position.y=L,O.rotation.y=A,st.add(O),h("Scala chiocciola pedata",.35,0,0,.7,.035,.25,c,O),u("Scala chiocciola montante",[.68,0,0],[.68,.84,0],.012,c,O),S){let $=(S-1)*Math.PI/7;u("Scala chiocciola corrimano",[Math.cos($)*.68,L+.65,-Math.sin($)*.68],[Math.cos(A)*.68,L+.84,-Math.sin(A)*.68],.015,c,st)}}for(let S of[-5.4,0,5.4]){u("Catena lanterna",[S,b+3.12,.15],[S,b+2.7,.15],.009,c,v);for(let A=0;A<8;A++){let L=A*Math.PI/4,O=(A+1)*Math.PI/4;u("Lanterna portico gabbia",[S+Math.cos(L)*.24,b+2.25,.15+Math.sin(L)*.24],[S,b+2.7,.15],.009,c,v),u("Lanterna portico bordo",[S+Math.cos(L)*.24,b+2.25,.15+Math.sin(L)*.24],[S+Math.cos(O)*.24,b+2.25,.15+Math.sin(O)*.24],.009,c,v)}l(new we(.045,.045,.13,8),"#efe0b6","Candela portico",[S,b+2.29,.15],v)}for(let S=0;S<24;S++){let A=-6.4+S*.55;u("Ramo rampicante portico",[A,b+3.1,-.05],[A+.24,b+2.85-S%4*.09,-.05],.012,a,v);for(let L=0;L<4;L++)l(new Ls(.075,5,3),L%2?"#415c30":"#5b773b","Foglia rampicante portico",[A+L*.06,b+3.03-L*.11,-.1],v).scale.set(1.2,1,.22)}for(let S of[-4.7,-3.2,3.2,4.7])for(let A of[.65,1.8]){let L=new Zt;L.position.set(S,b+.43,A),A>1&&(L.rotation.y=Math.PI),v.add(L),h("Poltrona portico cuscino",0,.42,0,.55,.09,.52,s,L);for(let O of[-.26,.26])u("Poltrona portico gamba",[O,0,-.22],[O,.85,-.22],.027,"#735039",L),u("Poltrona portico gamba",[O,0,.22],[O,.58,.22],.027,"#735039",L),h("Poltrona portico bracciolo",O,.61,0,.055,.06,.6,"#735039",L);for(let O=0;O<4;O++)h("Poltrona portico schienale",-.21+O*.14,.71,-.23,.065,.4,.045,"#735039",L)}for(let S=1;S<F.length;S++){let A=F[S],L=F[(S+1)%F.length],O=L[0]-A[0],$=L[1]-A[1],z=Math.hypot(O,$);if(z<2||A[1]<2.36&&L[1]<2.36)continue;let q=[$/z,-O/z];for(let at=1;at<=Math.floor(z/2.4);at++){let _t=at/(Math.floor(z/2.4)+1),mt=new Zt;mt.position.set(A[0]+O*_t+q[0]*.03,b+1.9,A[1]+$*_t+q[1]*.03),mt.rotation.y=-Math.atan2($,O),v.add(mt),h("Finestra villa telaio",0,0,0,1.14,1.65,.06,"#6b4f35",mt),h("Finestra villa vetro",0,0,-.045,1.03,1.52,.02,"#30423d",mt);for(let gt=0;gt<6;gt++)u("Grata villa",[-.48+gt*.192,-.8,-.085],[-.48+gt*.192,.8,-.085],.015,c,mt);for(let gt of[-.55,.55])u("Traversa grata villa",[-.54,gt,-.085],[.54,gt,-.085],.017,c,mt)}}let it=[F[0],F[1],F[2],F[3],F[4],F[5],F[10]];function bt(S){let A=it.length,L=new ut(...it[(S+A-1)%A]),O=new ut(...it[S]),$=new ut(...it[(S+1)%A]),z=O.clone().sub(L).normalize(),q=$.clone().sub(O).normalize(),at=O.clone().add(new ut(-z.y,z.x).multiplyScalar(2.7)),_t=O.clone().add(new ut(-q.y,q.x).multiplyScalar(2.7)),mt=(Lt,Vt)=>Lt.x*Vt.y-Lt.y*Vt.x,gt=mt(z,q);return Math.abs(gt)<.001?at:at.addScaledVector(z,mt(_t.clone().sub(at),q)/gt)}let vt=it.map((S,A)=>bt(A));for(let S=0;S<it.length;S++){let A=new ut(...it[S]),L=new ut(...it[(S+1)%it.length]),O=vt[S],$=vt[(S+1)%it.length],z=[[A.x,b+3.57,A.y],[L.x,b+3.57,L.y],[$.x,b+4.12,$.y],[O.x,b+4.12,O.y]],q=new he;q.setAttribute("position",new Jt([...z[0],...z[1],...z[2],...z[0],...z[2],...z[3]],3)),q.computeVertexNormals(),l(q,new ce({color:r,side:Ce,roughness:.9}),"Falda villa superficie continua",[0,0,0],v);let at=Math.ceil(A.distanceTo(L)/.16);for(let _t=0;_t<at;_t++){let mt=A.clone().lerp(L,(_t+.5)/at),gt=O.clone().lerp($,(_t+.5)/at);u("Coppi falda villa",[mt.x,b+3.65,mt.y],[gt.x,b+4.2,gt.y],.068,_t%3?"#b87954":"#a16245",v)}u("Parapetto terrazza interno",[O.x,b+4.24,O.y],[$.x,b+4.24,$.y],.15,s,v),u("Cimasa terrazza interno",[O.x,b+4.4,O.y],[$.x,b+4.4,$.y],.045,r,v),u("Gronda villa",[A.x,b+3.56,A.y],[L.x,b+3.56,L.y],.07,r,v)}let Ut=new Zt;Ut.name="Piazzale piscina bar e scala ad angolo",v.add(Ut);let zt=(S,A)=>[(754-S)*.011824,(550-A)*.01308-4.52],te=[[1195,130],[1260,0],[1760,0],[1860,145],[1917,185],[1917,335],[1780,347],[1540,350],[1360,328],[1200,270]],nt=[[1375,405],[1540,442],[1780,439],[1917,410],[1917,940],[1780,1020],[1420,985]];d("Piazzale cotto superiore collegato piscina",te.map(S=>zt(...S)),1.7,r,Ut),d("Piazzale cotto inferiore zona bar",nt.map(S=>zt(...S)),.825,r,Ut),d("Raccordo cotto piscina piazzale",[[-5,-2],[-7.35,-2],[-7.35,1.5],[-5,1.5]],1.7,r,Ut);function ct(S,A){for(let L=1;L<S.length;L++){let O=zt(...S[L-1]),$=zt(...S[L]);u("Cordolo bianco confine prato",[O[0],A-.12,O[1]],[$[0],A-.12,$[1]],.12,s,Ut),u("Copertina cotto confine prato",[O[0],A+.02,O[1]],[$[0],A+.02,$[1]],.055,r,Ut)}}ct([[1260,0],[1760,0],[1860,145],[1917,185],[1917,335]],1.7),ct([[1917,410],[1917,940],[1780,1020],[1420,985]],.825);for(let S=0;S<7;S++){let A=340+S*13,L=1.7-(S+1)*.125,O=[[1360-S*3,A-20],[1540,A],[1780,A-5]],$=[[1780,A+8],[1540,A+13],[1357-S*3,A-7]];d("Scala angolo pedata cotto",[...O,...$].map(z=>zt(...z)),L,r,Ut);for(let z=1;z<O.length;z++){let q=zt(...O[z-1]),at=zt(...O[z]),_t=new he;_t.setAttribute("position",new Jt([q[0],L,q[1],at[0],L,at[1],at[0],L+.125,at[1],q[0],L,q[1],at[0],L+.125,at[1],q[0],L+.125,q[1]],3)),_t.computeVertexNormals(),l(_t,new ce({color:s,side:Ce}),"Scala angolo alzata bianca",[0,0,0],Ut),u("Scala angolo naso cotto",[q[0],L+.015,q[1]],[at[0],L+.015,at[1]],.027,r,Ut)}for(let z of[1360-S*3,1780]){let q=zt(z,A);C(q[0],q[1],L,!0,Ut)}}for(let S of[1330,1815]){let A=zt(S,320),L=zt(S,445);u("Scala angolo corrimano nero",[A[0],2.55,A[1]],[L[0],1.7,L[1]],.025,c,Ut);for(let[O,$]of[[A,1.7],[L,.825]])u("Scala angolo montante nero",[O[0],$,O[1]],[O[0],$+.85,O[1]],.025,c,Ut)}let xt=zt(1435,465),Ot=zt(1435,960);p(xt,Ot,1.2,Ut),u("Muretto aiuola piscina bar",[xt[0],1.24,xt[1]],[Ot[0],1.24,Ot[1]],.18,s,Ut);let Tt=[[1570,475],[1745,475],[1745,905],[1570,905]].map(S=>zt(...S));d("Tappeto pietra piazzale bar",Tt,.84,o,Ut);for(let S of[1585,1730]){let A=zt(S,490),L=zt(S,890);u("Tappeto cornice cotto",[A[0],.85,A[1]],[L[0],.85,L[1]],.045,r,Ut)}let Ht=zt(1645,830),ee=new Zt;ee.name="Bar patio scoperto da foto",ee.position.set(Ht[0],.825,Ht[1]),Ut.add(ee),h("Bar patio pannello bianco",0,.52,0,1.85,1.04,.62,s,ee),h("Bar patio top legno",0,1.08,0,1.98,.07,.76,"#956444",ee),h("Bar patio piano interno",0,.77,-.36,1.65,.055,.4,s,ee);for(let S=0;S<12;S++)h("Bar patio fuga doghe",-.84+S*.15,.51,.315,.008,.96,.012,"#c1c4b9",ee);for(let S of[510,675,830]){let A=zt(1860,S);h("Tavolino patio bianco",A[0],1.35,A[1],.52,.04,.52,s,Ut);for(let L of[-.22,.22])for(let O of[-.22,.22])h("Tavolino patio gamba",A[0]+L,1.08,A[1]+O,.025,.51,.025,s,Ut);for(let L of[-.65,.65]){let O=A[1]+L;h("Sedia patio telo",A[0],1.25,O,.49,.045,.45,s,Ut),h("Sedia patio schienale",A[0],1.55,O+(L>0?.2:-.2),.49,.5,.04,s,Ut);for(let $ of[-.23,.23])u("Sedia patio telaio",[A[0]+$,.825,O-.2],[A[0]+$,1.25,O+.2],.02,s,Ut),u("Sedia patio telaio",[A[0]+$,.825,O+.2],[A[0]+$,1.25,O-.2],.02,s,Ut)}}d("Raccordo prato costa",[[11,18],[15,-29],[22,-35],[35,-35],[40,74],[20,74]],-.09,a);for(let S=0;S<30;S++){let A=23+S*1.35;y(18+Math.sin(S*.5),A,.8,.78,S%5===0)}for(let S=0;S<22;S++){let A=26+S*1.65;y(-31+Math.sin(S)*1.7,A,.8,.78,S%4===0)}for(let[S,A]of[[1080,650],[1130,740],[1210,845],[1390,1e3],[1570,890]]){let L=i(S,A,.8);u("Lampione giardino",L.toArray(),[L.x,L.y+1.35,L.z],.025,c),l(new Ls(.14,10,6),new ce({color:"#fff1c5",emissive:"#ffbd67",emissiveIntensity:.65}),"Globo giardino",[L.x,L.y+1.4,L.z])}let ot=new he;ot.setAttribute("position",new Jt([17,-.2,-27,25,-.2,24,58,-8,45,17,-.2,-27,58,-8,45,62,-8,-48],3)),ot.computeVertexNormals(),l(ot,"#70794a","Pendio macchia mediterranea");for(let S=0;S<85;S++){let A=25+m()*25,L=-29+m()*64;y(A,L,.4+m()*.65,-.3-(A-25)*.16)}let N=new Zt;N.name="Mare Isola di Dino e costa",t.add(N);let X=h("Mare",560,-10.2,0,1050,.1,1550,new ce({color:"#377b99",roughness:.34,metalness:.28}),N);X.castShadow=!1;for(let S=0;S<110;S++){let A=65+m()*740,L=-600+m()*1200,O=h("Increspatura mare",A,-10.13,L,.1,.01,2+m()*13,"#6495aa",N);O.castShadow=!1}let Z=new Zt;Z.name="Isola di Dino",Z.position.set(245,-10,-155),Z.rotation.y=-.2,N.add(Z);let j=[[-16,-47],[-24,-35],[-26,-14],[-24,12],[-16,43],[-6,52],[7,49],[17,35],[22,8],[18,-23],[8,-43]],ht=[],dt=[],pt=new Wt("#aaa68c"),St=new Wt("#657856");function B(S,A,L,O){ht.push(...S,...A,...L);for(let $=0;$<3;$++)dt.push(O.r,O.g,O.b)}for(let S=0;S<j.length;S++){let A=j[S],L=j[(S+1)%j.length],O=7.5+Math.sin(S*1.7)*1.3,$=7.5+Math.sin((S+1)*1.7)*1.3,z=[A[0]*.83,O,A[1]*.9],q=[L[0]*.83,$,L[1]*.9];B([A[0],0,A[1]],[L[0],0,L[1]],z,pt),B([L[0],0,L[1]],q,z,pt),B(z,q,[0,10.5,0],St)}let Xt=new he;Xt.setAttribute("position",new Jt(ht,3)),Xt.setAttribute("color",new Jt(dt,3)),Xt.computeVertexNormals(),l(Xt,new ce({vertexColors:!0,roughness:1,side:Ce}),"Falesia e sommit\xE0 isola",[0,0,0],Z);for(let S=0;S<18;S++){let A=-37+S*4.5;u("Striatura falesia",[-23,-.1,A],[-19,6.8,A+.8],.24,"#959880",Z)}let Yt=[[370,-450],[330,-335],[348,-210],[400,-80],[470,70],[600,240],[880,480]],I=[];for(let S=1;S<Yt.length;S++){let A=Yt[S-1],L=Yt[S];I.push(A[0],-10,A[1],L[0],-10,L[1],L[0]+220,40+28*Math.sin(S),L[1],A[0],-10,A[1],L[0]+220,40+28*Math.sin(S),L[1],A[0]+220,40+28*Math.sin(S-1),A[1])}let M=new he;M.setAttribute("position",new Jt(I,3)),M.computeVertexNormals(),l(M,new ce({color:"#7f9188",roughness:1,side:Ce}),"Costa e rilievi sullo sfondo",[0,0,0],N);for(let S=0;S<38;S++){let A=-340+S*18,L=360+(A+340)*.35;h("Edifici lontani sulla costa",L,-4,A,2+m()*3,2+m()*3,3,"#cac7b4",N)}return{root:t,villa:v,panorama:N,gardenTarget:i(1490,570,2),panoramaTarget:new R(130,-3,-70)}}function Pd(){let i=new Zt;i.name="Console DJ parallela arco",i.userData={frontClearance:.6,depth:.84};let t={},e=a=>t[a]??=new ce({color:a,roughness:.55}),n=(a,c,l,h,u,d,f,m,y)=>{let g=new ae(new Ye(d,f,m),e(y));return g.name=c,g.position.set(l,h,u),a.add(g),g},s=(a,c,l,h,u,d,f,m)=>{let y=new ae(new we(d,d,f,32),e(m));return y.name=c,y.position.set(l,h,u),a.add(y),y};n(i,"Banco DJ",0,.525,0,2.7,1.05,.8,"#edece5"),n(i,"Piano DJ",0,1.075,0,2.75,.05,.84,"#202326");let r=1.1;for(let[a,c]of[-.79,-.41,.41,.79].entries()){let l=new Zt;l.name="CDJ-3000X "+(a+1),l.position.set(c,r,0),l.userData={model:"CDJ-3000X",dimensions:[.3446,.4904,.1301]},i.add(l),n(l,"CDJ chassis",0,.035,0,.3446,.07,.4904,"#16191c"),n(l,"CDJ display cornice",-.016,.095,.145,.245,.065,.17,"#252a30"),n(l,"CDJ touchscreen",-.016,.1301,.145,.223,.001,.145,"#132c38");for(let h=0;h<25;h++)n(l,"CDJ waveform",-.12+h*.0087,.131,.16,.005,.001,.012+.033*Math.abs(Math.sin(h*2.1)),h%3?"#53c9da":"#e2b260");s(l,"Jog wheel bordo",-.025,.081,-.065,.098,.018,"#676b70"),s(l,"Jog wheel",-.025,.092,-.065,.09,.012,"#24272b"),s(l,"Jog display",-.025,.099,-.065,.036,.002,"#337088");for(let h=0;h<8;h++)n(l,"Hot cue",-.139+h*.027,.079,.025,.021,.013,.016,h%2?"#619cb4":"#96b78d");n(l,"Pitch guida",.133,.074,-.09,.007,.007,.16,"#565b61"),n(l,"Pitch cursore",.133,.083,-.07,.032,.013,.013,"#c3c5c8"),s(l,"Play",-.136,.079,-.207,.014,.008,"#66b27e"),s(l,"Cue",-.136,.079,-.167,.014,.008,"#bc924e"),s(l,"Browse",.138,.081,.12,.013,.017,"#686d73")}let o=new Zt;o.name="DJM-A9",o.position.set(0,r,-(.4904-.4583)/2),i.add(o),o.userData={model:"DJM-A9",dimensions:[.4074,.4583,.1079]},n(o,"A9 chassis",0,.043,0,.4074,.086,.4583,"#15181b");for(let a=0;a<4;a++){let c=-.105+a*.06;for(let l=0;l<5;l++)s(o,"A9 manopola canale",c,.096,.17-l*.048,.01,.023,"#6f747a");n(o,"A9 guida fader",c,.087,-.126,.005,.002,.1,"#868b90"),n(o,"A9 fader",c,.1,-.12,.025,.015,.014,"#c4c9ce");for(let l=0;l<8;l++)n(o,"A9 meter",c+.016,.088,.12-l*.018,.004,.002,.01,l>5?"#dbaa49":"#5ba069")}n(o,"A9 crossfader guida",-.01,.088,-.197,.17,.004,.005,"#8a8d91"),n(o,"A9 crossfader",-.01,.1,-.197,.013,.014,.027,"#bfc4c8"),n(o,"A9 display FX",.155,.09,.14,.065,.005,.085,"#2e6c85");for(let a=0;a<4;a++)s(o,"A9 FX knob",.155,.096,.05-a*.06,.015,.022,"#737a80");for(let a of[-1.17,1.17])n(i,"Monitor DJ",a,.99,-.05,.28,.36,.28,"#1b2023");return i.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.receiveShadow=!0)}),i}var hh={bounds:[270.9079,414.4896,805.5987,665.1777],paths:[[["M",400.284912109375,418.62957763671875],["C",406.03790283203125,420.4925842285156,411.430908203125,423.3315734863281,416.8839111328125,425.9385681152344],["C",417.0099182128906,425.9985656738281,417.1219177246094,426.0715637207031,417.2419128417969,426.1415710449219],["C",418.0399169921875,426.6005859375,420.08990478515625,427.45758056640625,418.9149169921875,429.06658935546875],["C",405.3258972167969,420.9095764160156,390.71490478515625,416.66656494140625,374.75592041015625,416.7995910644531],["C",363.40692138671875,416.89459228515625,352.80889892578125,417.2955627441406,341.3908996582031,421.17657470703125],["C",341.07891845703125,421.2815856933594,340.76690673828125,421.402587890625,340.4659118652344,421.5345764160156],["C",320.6859130859375,430.1435852050781,307.41693115234375,445.01458740234375,299.10992431640625,464.506591796875],["C",293.8109130859375,476.9385681152344,291.66790771484375,490.09759521484375,291.1639099121094,503.674560546875],["C",290.1799011230469,530.1445922851562,296.28289794921875,554.2296142578125,313.7958984375,574.6195678710938],["C",332.4059143066406,596.28759765625,356.6708984375,602.2595825195312,384.0049133300781,598.8485717773438],["C",393.25091552734375,597.695556640625,402.2119140625,595.3585815429688,410.9399108886719,591.93359375],["C",415.2029113769531,590.2605590820312,416.58990478515625,587.904541015625,416.54791259765625,583.3945922851562],["C",416.326904296875,560.0135498046875,416.51690673828125,534.7815551757812,416.5749206542969,511.3985595703125],["C",416.5799255371094,509.37359619140625,416.263916015625,507.95758056640625,418.00091552734375,507.4925842285156],["C",421.4369201660156,506.5735778808594,425.294921875,506.5845947265625,428.8149108886719,507.6675720214844],["C",429.9609069824219,508.02056884765625,429.73492431640625,509.9195861816406,429.7519226074219,511.1365966796875],["C",430.076904296875,534.3345947265625,429.7069091796875,557.53857421875,429.8099060058594,580.7385864257812],["C",429.82891845703125,585.1135864257812,426.347900390625,586.03955078125,423.6979064941406,587.5855712890625],["C",412.8739013671875,593.8995971679688,401.1899108886719,597.8375854492188,388.7698974609375,599.6295776367188],["C",367.7549133300781,602.66259765625,347.22991943359375,601.2935791015625,327.6559143066406,592.465576171875],["C",303.15789794921875,581.4176025390625,286.8879089355469,562.9486083984375,279.617919921875,537.0655517578125],["C",270.90789794921875,506.06158447265625,274.57891845703125,476.6385803222656,293.721923828125,450.2835693359375],["C",310.48492431640625,427.2065734863281,334.02789306640625,416.3285827636719,362.3249206542969,415.0645751953125],["C",375.17291259765625,414.48956298828125,388.1009216308594,414.6845703125,400.284912109375,418.62957763671875]],[["M",485.9779968261719,532.2437133789062],["C",485.98199462890625,534.4117431640625,485.9020080566406,536.9437255859375,485.9779968261719,539.1196899414062],["C",485.9469909667969,557.564697265625,486.2139892578125,575.2366943359375,485.9779968261719,593.480712890625],["C",485.9329833984375,596.9967041015625,487.97900390625,597.0966796875,490.5899963378906,597.0867309570312],["C",504.1029968261719,597.0357055664062,517.6170043945312,597.0596923828125,531.1300048828125,597.0877075195312],["C",533.0349731445312,597.0726928710938,534.010009765625,597.0496826171875,536.5980224609375,597.0267333984375],["C",534.9639892578125,599.6097412109375,533.5889892578125,599.3737182617188,531.9140014648438,599.376708984375],["C",513.8359985351562,599.4006958007812,495.7559814453125,599.2607421875,477.6789855957031,599.4117431640625],["C",473.6619873046875,599.4457397460938,472.2850036621094,598.2557373046875,472.322998046875,594.1376953125],["C",472.47900390625,577.3417358398438,472.3800048828125,560.543701171875,472.3070068359375,543.7457275390625],["C",472.2959899902344,541.3847045898438,472.2829895019531,539.0247192382812,472.3070068359375,536.6177368164062],["C",472.2799987792969,534.3267211914062,472.30499267578125,531.9647216796875,472.3070068359375,529.6146850585938],["C",472.33599853515625,494.38671875,472.3599853515625,458.5577087402344,472.43499755859375,423.3307189941406],["C",472.4389953613281,421.14971923828125,472.82000732421875,418.2977294921875,474.6130065917969,417.4017028808594],["C",478.0069885253906,416.0287170410156,480.9679870605469,416.001708984375,483.7969970703125,417.44671630859375],["C",485.781982421875,418.33673095703125,485.9389953613281,421.57672119140625,485.94500732421875,423.3307189941406],["L",485.9779968261719,532.2437133789062]],[["M",565.2459716796875,591.750244140625],["C",565.2459716796875,597.2002563476562,567.6799926757812,599.4042358398438,572.5029907226562,599.4042358398438],["C",577.0149536132812,599.2892456054688,579.35595703125,597.2352294921875,579.35595703125,591.9252319335938],["C",579.35595703125,534.9222412109375,579.1319580078125,479.1862487792969,579.35595703125,422.1832275390625],["C",579.3779907226562,416.4532470703125,576.8199462890625,416.146240234375,572.4339599609375,416.19622802734375],["C",568.1739501953125,416.2452392578125,565.3529663085938,416.250244140625,565.4149780273438,422.11822509765625],["L",565.2459716796875,591.750244140625]],[["M",800.7166748046875,597.7426147460938],["C",801.149658203125,598.1016235351562,801.1526489257812,598.671630859375,800.70068359375,599.005615234375],["C",799.7486572265625,599.7056274414062,797.3016967773438,599.6356201171875,795.9956665039062,599.6365966796875],["C",771.3246459960938,599.6586303710938,746.4906616210938,599.5866088867188,721.8197021484375,599.6386108398438],["C",717.7796630859375,599.6476440429688,715.7476806640625,599.6216430664062,718.0116577148438,594.360595703125],["C",728.545654296875,569.8765869140625,738.6326904296875,545.1995849609375,748.8206787109375,520.5665893554688],["C",762.1817016601562,488.2606201171875,775.4526977539062,455.9176025390625,788.8606567382812,423.6316223144531],["C",790.4136962890625,419.89361572265625,789.9536743164062,418.6266174316406,785.57568359375,418.66961669921875],["C",767.8506469726562,418.84161376953125,750.1236572265625,418.72760009765625,732.397705078125,418.6776123046875],["C",730.65869140625,418.672607421875,728.649658203125,418.735595703125,727.0836791992188,418.2606201171875],["C",726.2766723632812,418.015625,726.1806640625,416.8746337890625,726.9256591796875,416.4806213378906],["C",727.5286865234375,416.16259765625,728.1427001953125,416.1876220703125,728.899658203125,416.15960693359375],["C",752.8386840820312,416.089599609375,776.7786865234375,416.296630859375,800.7176513671875,416.15960693359375],["C",805.1856689453125,416.1346130371094,805.5986938476562,417.51361083984375,803.9946899414062,421.2936096191406],["C",791.2406616210938,451.35162353515625,778.1126708984375,481.2646179199219,766.1016845703125,511.6186218261719],["C",755.4006958007812,538.6636352539062,744.0506591796875,565.4326171875,733.0996704101562,592.3685913085938],["C",731.6786499023438,595.8635864257812,732.0056762695312,596.9885864257812,736.1646728515625,596.9515991210938],["C",755.899658203125,596.7745971679688,776.2796630859375,596.8926391601562,796.0156860351562,596.9515991210938],["C",797.5307006835938,596.9556274414062,799.9656982421875,597.11962890625,800.7166748046875,597.7426147460938]],[["M",642.794189453125,418.4912109375],["C",637.3911743164062,418.46722412109375,618.7252197265625,418.5062255859375,607.59619140625,418.4912109375],["C",601.585205078125,418.48321533203125,601.0311889648438,416.8102111816406,601.0311889648438,416.8102111816406],["C",601.5491943359375,416.8102111816406,673.5521850585938,416.814208984375,709.7611694335938,416.8102111816406],["C",709.7611694335938,416.8102111816406,708.127197265625,418.48822021484375,703.2711791992188,418.4912109375],["C",691.6212158203125,418.49920654296875,680.2061767578125,418.44122314453125,668.201171875,418.4912109375],["C",665.9451904296875,418.4851989746094,662.3541870117188,419.8731994628906,662.3641967773438,424.4201965332031],["C",662.501220703125,480.4862060546875,662.51318359375,537.7371826171875,662.4421997070312,593.80419921875],["C",662.440185546875,596.0042114257812,663.6521606445312,598.033203125,660.9801635742188,599.0081787109375],["C",657.5941772460938,600.2432250976562,653.6602172851562,600.1412353515625,650.2072143554688,598.979248046875],["C",647.9481811523438,598.2182006835938,648.816162109375,595.4661865234375,648.814208984375,593.5732421875],["C",648.773193359375,565.0831909179688,648.8101806640625,536.5932006835938,648.80419921875,508.1022033691406],["C",648.7982177734375,480.16021728515625,648.8742065429688,427.84820556640625,648.8372192382812,424.2762145996094],["C",648.8081665039062,421.4532165527344,646.2481689453125,418.5072021484375,642.794189453125,418.4912109375]],[["M",667.9552001953125,642.306640625],["L",667.9552001953125,644.8146362304688],["C",667.9552001953125,646.4916381835938,669.2952270507812,647.8616333007812,670.97119140625,647.901611328125],["C",673.8822021484375,647.9706420898438,676.63818359375,648.0616455078125,679.3311767578125,647.6956176757812],["C",680.772216796875,647.5006103515625,683.0751953125,646.3306274414062,683.0751953125,643.86865234375],["C",683.0751953125,641.1906127929688,681.085205078125,639.9506225585938,679.6192016601562,639.609619140625],["C",677.0972290039062,638.9886474609375,674.13720703125,639.2186279296875,671.1962280273438,639.22265625],["C",669.4312133789062,639.2246704101562,667.9552001953125,640.5416259765625,667.9552001953125,642.306640625],["M",667.8171997070312,658.1796264648438],["C",667.8171997070312,659.8446655273438,669.13818359375,661.2056274414062,670.8021850585938,661.2616577148438],["C",673.9722290039062,661.3666381835938,676.1411743164062,661.483642578125,678.7562255859375,661.254638671875],["C",678.9841918945312,661.234619140625,679.2222290039062,661.1896362304688,679.4412231445312,661.1206665039062],["C",682.7232055664062,660.0816650390625,684.4942016601562,658.1346435546875,684.9942016601562,656.2666625976562],["C",685.7971801757812,653.2626342773438,683.1812133789062,651.6636352539062,680.3621826171875,651.5146484375],["C",677.2421875,651.3486328125,674.1112060546875,651.4036254882812,670.8751831054688,651.4386596679688],["C",669.1832275390625,651.4576416015625,667.8171997070312,652.8336181640625,667.8171997070312,654.525634765625],["L",667.8171997070312,658.1796264648438],["M",684.9641723632812,648.24462890625],["C",684.5991821289062,648.8016357421875,684.730224609375,649.5476684570312,685.26123046875,649.9506225585938],["C",687.9992065429688,652.026611328125,689.7081909179688,654.6386108398438,688.4262084960938,658.4396362304688],["C",686.9102172851562,662.9296264648438,683.1522216796875,664.1056518554688,678.9212036132812,664.3466186523438],["C",664.3892211914062,665.1776123046875,664.38818359375,665.170654296875,664.38818359375,650.5836181640625],["C",664.38818359375,648.66064453125,664.377197265625,646.7376708984375,664.3901977539062,644.8146362304688],["C",664.3822021484375,636.2276611328125,663.3472290039062,636.254638671875,673.3101806640625,636.2566528320312],["C",675.5382080078125,636.2566528320312,677.815185546875,636.3916625976562,679.9862060546875,636.8556518554688],["C",686.5831909179688,638.265625,688.501220703125,642.8486328125,684.9641723632812,648.24462890625]],[["M",591.251220703125,636.381591796875],["C",592.1842041015625,636.3585815429688,592.7822265625,636.8955688476562,592.8302001953125,637.9696044921875],["C",593.0872192382812,643.7445678710938,593.2022094726562,651.9215698242188,591.9161987304688,656.82861328125],["C",591.408203125,658.7645874023438,590.252197265625,660.4415893554688,588.6802368164062,661.6785888671875],["C",585.3532104492188,664.298583984375,581.7282104492188,665.1795654296875,577.365234375,664.4285888671875],["C",572.002197265625,663.5036010742188,568.2882080078125,660.2015991210938,567.5491943359375,655.1356201171875],["C",566.7022094726562,649.3225708007812,567.2261962890625,643.3065795898438,567.252197265625,637.3786010742188],["C",567.26123046875,636.6975708007812,567.9352416992188,636.3576049804688,568.8222045898438,636.3585815429688],["C",569.6212158203125,636.3585815429688,570.2672119140625,636.6975708007812,570.2952270507812,637.4776000976562],["C",570.3522338867188,639.08056640625,570.240234375,641.984619140625,570.2492065429688,643.2536010742188],["C",570.2792358398438,647.3895874023438,570.2232055664062,649.3905639648438,570.5701904296875,653.3765869140625],["C",571.0042114257812,658.3685913085938,574.8192138671875,661.2075805664062,579.9161987304688,661.318603515625],["C",585.1192016601562,661.4315795898438,588.792236328125,658.7645874023438,589.3482055664062,653.7205810546875],["C",589.8641967773438,649.9475708007812,589.7131958007812,642.8065795898438,589.7572021484375,637.8555908203125],["C",589.7651977539062,636.9215698242188,590.3641967773438,636.403564453125,591.251220703125,636.381591796875]],[["M",423.0013122558594,639.5242919921875],["C",423.9403076171875,640.4902954101562,422.78631591796875,642.0213012695312,421.6023254394531,641.3773193359375],["C",417.03131103515625,638.894287109375,412.3463134765625,637.6693115234375,407.5333251953125,641.7033081054688],["C",405.3353271484375,643.5462646484375,403.6053161621094,647.0863037109375,403.47430419921875,649.9342651367188],["C",403.34429931640625,652.7783203125,404.7593078613281,656.5133056640625,406.8263244628906,658.4132690429688],["C",409.0063171386719,660.4163208007812,412.75830078125,661.5162963867188,415.82232666015625,661.5142822265625],["C",417.7362976074219,661.5133056640625,419.6493225097656,660.5682983398438,421.6683044433594,659.5682983398438],["C",422.768310546875,659.0242919921875,423.8663024902344,660.3292846679688,423.1383056640625,661.3172607421875],["C",421.184326171875,663.9702758789062,417.5973205566406,665.3363037109375,413.2633056640625,665.1602783203125],["C",406.45831298828125,664.88427734375,400.7853088378906,659.09228515625,400.01031494140625,651.6282958984375],["C",399.2903137207031,644.6983032226562,403.7213134765625,638.4403076171875,410.6893005371094,636.5422973632812],["C",415.29632568359375,635.2882690429688,419.97430419921875,636.4102783203125,423.0013122558594,639.5242919921875]],[["M",509.9468994140625,664.226806640625],["C",503.23089599609375,664.19482421875,497.9638977050781,664.3057861328125,491.9869079589844,664.226806640625],["C",489.4359130859375,664.2357788085938,489.4169006347656,664.2138061523438,489.3938903808594,661.7568359375],["C",489.3829040527344,660.5418090820312,489.2789001464844,646.0548095703125,489.3938903808594,638.2037963867188],["C",489.4049072265625,637.4907836914062,490.21990966796875,636.2448120117188,491.9978942871094,636.2448120117188],["L",491.9978942871094,660.3248291015625],["C",491.9978942871094,660.3598022460938,492.00689697265625,660.923828125,492.014892578125,661.4288330078125],["C",492.02191162109375,661.872802734375,492.3799133300781,662.2288208007812,492.82489013671875,662.2288208007812],["C",495.8489074707031,662.2308349609375,506.534912109375,662.1558227539062,509.9458923339844,662.226806640625],["C",510.89788818359375,662.246826171875,510.89990234375,664.2318115234375,509.9468994140625,664.226806640625]]]};function oc(i=1.85,t=.045,e=!1){let n=new Zt;n.name="Logo GLITZ originale PDF";let[s,r,o,a]=hh.bounds,c=e?602.6626:a,l=i/(o-s),h=new ei({color:"#ffffff",side:Ce});for(let u of hh.paths){if(e&&u[0][2]>610)continue;let d=new Dr;for(let[f,...m]of u){let y=p=>(p-(s+o)/2)*l,g=p=>(c-p)*l;f==="M"?d.moveTo(y(m[0]),g(m[1])):f==="L"?d.lineTo(y(m[0]),g(m[1])):f==="C"?d.bezierCurveTo(y(m[0]),g(m[1]),y(m[2]),g(m[3]),y(m[4]),g(m[5])):f==="Z"&&d.currentPath.closePath()}for(let f of d.toShapes(!0)){let m=new ae(new ni(f,{depth:t,bevelEnabled:!1,curveSegments:20}),h);m.name="Logo originale vettoriale",n.add(m)}}return n.userData={source:"Logo bianco su nero 3(1).pdf",width:i,height:(c-r)*l,wordmarkOnly:e},n}var Yr=new R;function vn(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Yr.copy(t),Yr[n]=0,Yr.normalize();let l=.5*o/(o+a),h=1-Yr.angleTo(i)/c;return Math.sign(Yr[e])===1?h*l:a/(o+a)+l+l*(1-h)}var oi=class i extends Ye{constructor(t=1,e=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new R,l=new R,h=new R(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,y=new R,g=.5/o;for(let p=0,E=0;p<u.length;p+=3,E+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/m)){case 0:y.set(1,0,0),f[E+0]=vn(y,l,"z","y",r,n),f[E+1]=1-vn(y,l,"y","z",r,e);break;case 1:y.set(-1,0,0),f[E+0]=1-vn(y,l,"z","y",r,n),f[E+1]=1-vn(y,l,"y","z",r,e);break;case 2:y.set(0,1,0),f[E+0]=1-vn(y,l,"x","z",r,t),f[E+1]=vn(y,l,"z","x",r,n);break;case 3:y.set(0,-1,0),f[E+0]=1-vn(y,l,"x","z",r,t),f[E+1]=1-vn(y,l,"z","x",r,n);break;case 4:y.set(0,0,1),f[E+0]=1-vn(y,l,"x","y",r,t),f[E+1]=1-vn(y,l,"y","x",r,e);break;case 5:y.set(0,0,-1),f[E+0]=vn(y,l,"x","y",r,t),f[E+1]=1-vn(y,l,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var ac=[{id:"R1",zoneId:"riva",schematicPosition:[605,236],planPosition:[578.1115,284.8948],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R2",zoneId:"riva",schematicPosition:[618,319],planPosition:[583.5358,330.8489],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R3",zoneId:"riva",schematicPosition:[633,418],planPosition:[589.7481,386.5943],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R4",zoneId:"riva",schematicPosition:[645,509],planPosition:[594.256,438.8066],height:1.12,furniture:"riva-compact",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R5",zoneId:"riva",schematicPosition:[746,237],planPosition:[676.429,284.7854],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R6",zoneId:"riva",schematicPosition:[761,319],planPosition:[683.8613,329.0998],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R7",zoneId:"riva",schematicPosition:[771,439],planPosition:[686.6616,395.3518],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R8",zoneId:"riva",schematicPosition:[792,516],planPosition:[698.6514,438.284],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R9",zoneId:"riva",schematicPosition:[906,237],planPosition:[782.6637,284.0729],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R10",zoneId:"riva",schematicPosition:[917,318],planPosition:[788.045,326.7514],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R11",zoneId:"riva",schematicPosition:[933,439],planPosition:[795.9485,391.693],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R12",zoneId:"riva",schematicPosition:[955,516],planPosition:[808.8624,433.4353],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R13",zoneId:"riva",schematicPosition:[1073,237],planPosition:[887.8866,283.3671],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R14",zoneId:"riva",schematicPosition:[1083,318],planPosition:[893.2601,324.9309],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R15",zoneId:"riva",schematicPosition:[1096,439],planPosition:[900.2273,388.202],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"R16",zoneId:"riva",schematicPosition:[1111,516],planPosition:[875,426],height:1.12,furniture:"riva-lounge",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B0",zoneId:"back",schematicPosition:[80,195],planPosition:[233.13,261.7103],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B1",zoneId:"back",schematicPosition:[104,260],planPosition:[248.25,305.6414],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B2",zoneId:"back",schematicPosition:[171,195],planPosition:[290.46,261.7103],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B3",zoneId:"back",schematicPosition:[207,260],planPosition:[313.14,305.6414],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B4",zoneId:"back",schematicPosition:[262,195],planPosition:[347.79,261.7103],height:.62,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B5",zoneId:"back",schematicPosition:[89,346],planPosition:[238.8,345],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0,rotation:-1.5707963267948966},{id:"B6",zoneId:"back",schematicPosition:[201,346],planPosition:[297.36,361.0123],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B7",zoneId:"back",schematicPosition:[88,415],planPosition:[238.17,390.7391],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B8",zoneId:"back",schematicPosition:[76,626],planPosition:[230.61,566.2336],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B9",zoneId:"back",schematicPosition:[160,626],planPosition:[283.53,554.2336],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B10",zoneId:"back",schematicPosition:[247,626],planPosition:[338.34,554.2336],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B11",zoneId:"back",schematicPosition:[325,698],planPosition:[387.48,595.2804],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B12",zoneId:"back",schematicPosition:[400,718],planPosition:[434.73,606.6822],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B13",zoneId:"back",schematicPosition:[478,742],planPosition:[483.87,620.3645],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B14",zoneId:"back",schematicPosition:[391,772],planPosition:[429.06,637.4673],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"B15",zoneId:"back",schematicPosition:[79,748],planPosition:[232.5,623.785],height:.92,furniture:"beanbag-round",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G1",zoneId:"glitzbar",schematicPosition:[134,822],planPosition:[291.368,677.33],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G2",zoneId:"glitzbar",schematicPosition:[213,863],planPosition:[347.616,708.9],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G3",zoneId:"glitzbar",schematicPosition:[144,914],planPosition:[298.488,748.17],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G4",zoneId:"glitzbar",schematicPosition:[175,979],planPosition:[340,818],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G5",zoneId:"glitzbar",schematicPosition:[161,1038],planPosition:[310.592,843.65],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G6",zoneId:"glitzbar",schematicPosition:[263,1072],planPosition:[383.216,869.83],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G7",zoneId:"glitzbar",schematicPosition:[371,1038],planPosition:[441,843.65],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"G8",zoneId:"glitzbar",schematicPosition:[382,940],planPosition:[441,768.19],height:.812,furniture:"masonry-director",layoutSource:"Pianta schematica monocromatica della venue.png",idConfirmedBySource:!0},{id:"SV1",zoneId:"seaview",schematicPosition:null,planPosition:[902,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV2",zoneId:"seaview",schematicPosition:null,planPosition:[830,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV3",zoneId:"seaview",schematicPosition:null,planPosition:[758,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV4",zoneId:"seaview",schematicPosition:null,planPosition:[686,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV5",zoneId:"seaview",schematicPosition:null,planPosition:[614,245],height:.05,furniture:"panorama-masonry",rotation:1.5707963267948966,layoutSource:"Foto DJI_20250915191421_0178_D(1).jpg",idConfirmedBySource:!1},{id:"SV6",zoneId:"seaview",schematicPosition:null,planPosition:[583,161.3],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV7",zoneId:"seaview",schematicPosition:null,planPosition:[652,168.2],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV8",zoneId:"seaview",schematicPosition:null,planPosition:[721,175.1],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV9",zoneId:"seaview",schematicPosition:null,planPosition:[790,182],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV10",zoneId:"seaview",schematicPosition:null,planPosition:[859,188.9],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"SV11",zoneId:"seaview",schematicPosition:null,planPosition:[928,195.8],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1,furnitureScale:.82},{id:"PB1",zoneId:"prato-back",schematicPosition:null,planPosition:[245,183],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB2",zoneId:"prato-back",schematicPosition:null,planPosition:[307,183],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB3",zoneId:"prato-back",schematicPosition:null,planPosition:[369,183],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB4",zoneId:"prato-back",schematicPosition:null,planPosition:[383,137],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Foto e annotazioni settembre 2026; disposizione proposta",idConfirmedBySource:!1},{id:"PB5",zoneId:"prato-back",schematicPosition:null,planPosition:[104,246],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB6",zoneId:"prato-back",schematicPosition:null,planPosition:[151,251],height:.02,furniture:"lawn-short-l",rotation:-1.5707963267948966,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB7",zoneId:"prato-back",schematicPosition:null,planPosition:[103,182],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB8",zoneId:"prato-back",schematicPosition:null,planPosition:[151,178],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB9",zoneId:"prato-back",schematicPosition:null,planPosition:[236,138],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1},{id:"PB10",zoneId:"prato-back",schematicPosition:null,planPosition:[305,144],height:.02,furniture:"lawn-short-l",rotation:-1.6704649792860586,layoutSource:"Sei tavoli aggiuntivi richiesti dal proprietario; disposizione proposta",idConfirmedBySource:!1}];var jt={ivory:"#eeeae0",fabric:"#cec8bc",seam:"#b5ada0",wood:"#87522c",metal:"#f1efe8",masonry:"#e9e6dd",black:"#262a2a"},Id={},Dd=i=>Id[i]??(Id[i]=new ce({color:i,roughness:i===jt.wood?.53:.9}));function Xn(i,t,e,n,s=[0,0,0]){let r=new ae(i,typeof t=="string"?Dd(t):t);return r.name=e,r.position.set(...s),r.castShadow=!0,r.receiveShadow=!0,n.add(r),r}function fe(i,t,e,n,s,r=0){return Xn(r?new oi(...n,3,r):new Ye(...n),s,t,i,e)}function Wn(i,t,e,n,s,r){let o=new R(...e),a=new R(...n),c=a.clone().sub(o),l=Xn(new we(s,s,c.length(),7),r,t,i,o.clone().add(a).multiplyScalar(.5).toArray());return l.quaternion.setFromUnitVectors(new R(0,1,0),c.normalize()),l}function lc(i,t,e,n=0){let s=new Zt;return s.position.set(t,0,e),s.rotation.y=n,i.add(s),s}function cc(i,t,e,n,s=!1){let r=s?jt.metal:jt.black;for(let a of[-.055,.055])for(let c of[-.055,.055])Wn(i,"Lanterne montante",[t+a,e,n+c],[t+a,e+.27,n+c],.008,r);fe(i,"Lanterne base",[t,e,n],[.13,.025,.13],r),fe(i,"Lanterne tetto",[t,e+.28,n],[.13,.025,.13],r),Xn(new we(.025,.025,.07,8),"#e3d3b7","Candela",i,[t,e+.055,n]);let o=Xn(new Tr(.04,.006,5,12),r,"Manico lanterna",i,[t,e+.325,n])}function uh(i,t,e,n=.48,s=.9,r=.7,o=!0){fe(i,"Tavolo piano legno",[t,n,e],[s,.105,r],jt.wood,.014);for(let a=1;a<7;a++)fe(i,"Tavolo fughe doghe",[t-s/2+a*s/7,n+.053,e],[.006,.002,r-.035],"#684125");for(let a of[-s/2+.055,s/2-.055])for(let c of[-r/2+.055,r/2-.055])fe(i,"Tavolo gamba",[t+a,(n-.05)/2,e+c],[.042,n-.05,.042],o?jt.metal:jt.wood);cc(i,t,n+.065,e,o)}function Ld(i,t,e,n=0,s=1.6){let r=lc(i,t,e,n);fe(r,"Divano fascia in legno",[0,.16,0],[s,.17,.78],jt.wood,.017),fe(r,"Divano telaio bianco",[0,.065,0],[s+.02,.05,.8],jt.metal,.008);for(let a of[-s/2+.055,s/2-.055])for(let c of[-.33,.33])fe(r,"Divano piedino bianco",[a,.07,c],[.04,.14,.04],jt.metal);fe(r,"Divano seduta imbottita",[0,.375,.03],[s,.29,.84],jt.ivory,.095);let o=fe(r,"Divano schienale alto",[0,.685,-.32],[s,.68,.24],jt.ivory,.09);o.rotation.x=-.11;for(let a of[-s*.23,s*.23]){let c=fe(r,"Divano cuscino decorativo",[a,.625,-.135],[s*.34,.35,.115],"#ded8ce",.055);c.rotation.x=-.23,c.rotation.z=a<0?.07:-.06}return r}function $x(i,t,e,n=1.35,s=.64){let r=lc(i,t,e);fe(r,"Pouf rettangolare fascia legno",[0,.16,0],[n,.17,s],jt.wood,.018),fe(r,"Pouf rettangolare imbottitura",[0,.39,0],[n,.3,s+.015],jt.ivory,.07);for(let o of[-n/2+.05,n/2-.05])for(let a of[-s/2+.05,s/2-.05])fe(r,"Pouf piedino bianco",[o,.065,a],[.04,.13,.04],jt.metal);return r}function Zr(i,t,e,n=0,s=.92){let r=lc(i,t,e,n),o=new oi(s,.51,s*.96,5,.19),a=o.attributes.position;for(let l=0;l<a.count;l++){let h=a.getX(l),u=a.getY(l),d=a.getZ(l),f=.009*Math.sin(h*35+d*21)*Math.cos(u*22);a.setXYZ(l,h+f,u+.012*Math.sin(d*18)*Math.cos(h*15),d+f*.6)}o.computeVertexNormals(),Xn(o,jt.fabric,"Poltrona sacco corpo morbido",r,[0,.275,0]);let c=fe(r,"Poltrona sacco schienale",[0,.62,-s*.31],[s*.98,.6,.35],jt.fabric,.145);c.rotation.x=-.18;for(let l of[-s*.32,s*.32]){let h=new Ps([new R(l,.08,.3),new R(l,.46,.4),new R(l,.53,.05),new R(l,.57,-.2)]);Xn(new wr(h,15,.003,4,!1),jt.seam,"Cucitura tessuto",r)}return r}function jx(i,t,e,n=.33){Xn(new we(n,n,.035,32),jt.metal,"Tavolino tondo bianco",i,[t,.43,e]);for(let s of[0,Math.PI*.5,Math.PI,Math.PI*1.5])Wn(i,"Tavolino piede inclinato",[t+Math.cos(s)*n*.8,0,e+Math.sin(s)*n*.8],[t+Math.cos(s)*n*.5,.41,e+Math.sin(s)*n*.5],.018,jt.metal);cc(i,t,.46,e)}function Nd(i,t,e,n=0){let s=lc(i,t,e,n);for(let o of[-.26,.26])Wn(s,"Sedia gamba incrociata",[o,.015,-.28],[o,.48,.23],.014,jt.metal),Wn(s,"Sedia gamba incrociata",[o,.015,.28],[o,.48,-.23],.014,jt.metal),Wn(s,"Sedia montante",[o,.42,-.25],[o,.92,-.3],.014,jt.metal),Wn(s,"Sedia supporto bracciolo",[o,.46,.23],[o,.65,.23],.014,jt.metal),fe(s,"Bracciolo legno",[o,.65,-.015],[.035,.035,.54],jt.wood,.008);fe(s,"Sedia tela seduta",[0,.46,0],[.49,.025,.47],jt.fabric,.006);let r=fe(s,"Sedia tela schienale",[0,.745,-.278],[.48,.32,.022],jt.fabric,.006);r.rotation.x=-.075,Wn(s,"Sedia traverso basso",[-.26,.025,.28],[.26,.025,.28],.014,jt.metal)}function Qx(i){let t="#353735";Xn(new we(.1,.12,.025,24),t,"Lampada ricaricabile base",i,[0,.6,0]),Wn(i,"Lampada ricaricabile stelo",[0,.61,0],[0,.84,0],.014,t);let e=new ce({color:"#fff0ca",emissive:"#ffcc81",emissiveIntensity:.65});Xn(new we(.075,.115,.14,24),e,"Lampada ricaricabile diffusore",i,[0,.8,0]);for(let n=0;n<16;n++){let s=n*Math.PI/8;Wn(i,"Lampada ricaricabile gabbia",[Math.cos(s)*.125,.73,Math.sin(s)*.125],[Math.cos(s)*.085,.89,Math.sin(s)*.085],.007,t)}Xn(new we(.085,.085,.018,24),t,"Lampada ricaricabile cappello",i,[0,.9,0])}function t1(i){fe(i,"Seat View panca murata",[0,.22,0],[3.2,.44,.76],jt.masonry),fe(i,"Seat View tavolino murato",[0,.5,0],[.48,.16,.76],jt.masonry);for(let e of[-1.14,-.59,.59,1.14])fe(i,"Seat View cuscino panca",[e,.48,.015],[.53,.08,.68],jt.fabric,.025);Qx(i);let t=new ce({color:"#fff2d1",emissive:"#ffc875",emissiveIntensity:.8});for(let e of[-1.08,0,1.08])fe(i,"Seat View incasso luce",[e,.2,.383],[.13,.1,.018],jt.metal),fe(i,"Seat View luce calda",[e,.2,.394],[.095,.065,.008],t)}function Ud(i,t){let e=new Zt;if(e.name="ARREDI_"+t,i==="panorama-masonry")t1(e);else if(i==="riva-compact")Ld(e,0,-.62,0,1.35),uh(e,0,.08,.47,.8,.64),$x(e,0,.95,1.15,.55);else if(i==="riva-lounge")Ld(e,0,-.87,0,1.6),uh(e,0,0,.48,.95,.72);else if(i==="lawn-short-l"){Zr(e,.39,-.35,0,.76);let n=Zr(e,-.39,.4,Math.PI/2,.76);n.name="Pouf morbido senza schienale",n.getObjectByName("Poltrona sacco schienale").removeFromParent(),fe(e,"Tavolino quadrato bianco",[.4,.43,.42],[.48,.045,.48],jt.metal,.01);for(let s of[.19,.61])for(let r of[.21,.63])fe(e,"Tavolino bianco gamba",[s,.21,r],[.026,.42,.026],jt.metal);cc(e,.4,.46,.42,!0)}else if(i==="lawn-pair"){Zr(e,-.65,0,0,.92),Zr(e,.65,0,0,.92),fe(e,"Tavolino quadrato bianco",[0,.43,0],[.55,.045,.55],jt.metal,.01);for(let n of[-.24,.24])for(let s of[-.24,.24])fe(e,"Tavolino bianco gamba",[n,.21,s],[.026,.42,.026],jt.metal);cc(e,0,.46,0,!0)}else i==="beanbag-round"?(Zr(e,0,-.46,0,.89),jx(e,.05,.45,.3)):(uh(e,0,.08,.67,.86,.67,!1),Nd(e,0,.9,Math.PI));return e}function Jr(i,t,e,n=.812){for(let s=1;s<e.length;s++){let r=t(...e[s-1],n),o=t(...e[s],n),a=o.clone().sub(r),c=a.length(),l=new Zt;l.name="GLITZ_BAR_PANCA_CONTINUA",l.position.copy(r).add(o).multiplyScalar(.5),l.rotation.y=Math.atan2(-a.z,a.x),i.add(l),fe(l,"Muratura continua base",[0,.23,0],[c+.02,.46,.72],jt.masonry),fe(l,"Muratura schienale continuo",[0,.56,-.36],[c+.02,.92,.16],jt.masonry);let h=Math.max(1,Math.round(c/.74));for(let u=0;u<h;u++){let d=-c/2+(u+.5)*c/h;fe(l,"Cuscino su panca murata",[d,.505,.035],[c/h-.015,.09,.64],jt.fabric,.025);let f=fe(l,"Cuscino schienale",[d,.735,-.2],[.38,.37,.12],u%3===1?jt.black:jt.fabric,.055);f.rotation.x=-.18,f.rotation.z=u%2?.075:-.06}}}function Fd(){let i=new Zt;return i.name="Sgabello ingresso",Nd(i,0,0),i.scale.y=1.42,i.traverse(t=>{t.name.startsWith("Sedia tela")&&(t.material=Dd(jt.metal))}),Wn(i,"Poggiapiedi sgabello",[-.26,.2,.28],[.26,.2,.28],.016,jt.metal),i}var ai={width:9,heightAboveSupport:4,heightAboveDancefloor:5,supportAboveDancefloor:1,dancefloorY:.1,supportY:1.1,crownY:5.1,widthReference:"outer structural envelope",heightReference:"crown of truss; fixtures and sign separate",source:"User supplied dimensions"};function Bd(i){let t=new Zt;t.name="GLITZ_ARCH_9M",t.position.copy(i),t.position.y=ai.supportY,t.userData={...ai};let e=new Zt,n=new Zt,s=new Zt;e.name="ARCH_TRUSS",n.name="ARCH_LIGHTS_AUDIO",s.name="ARCH_GLITZ_LETTERS",t.add(e,n,s);let r=new ce({color:"#bdc4c5",metalness:.8,roughness:.3}),o=new ce({color:"#20252a",roughness:.65}),a=new ce({color:"#f4f1e7",roughness:.5});function c(p,E,C,_,T,v,b,x,P){let D=new ae(new oi(v,b,x,2,Math.min(.025,v/8)),P);return D.position.set(C,_,T),D.name=E,p.add(D),D}function l(p,E,C,_,T=.024,v=r){let b=_.clone().sub(C),x=new ae(new we(T,T,b.length(),8),v);return x.position.copy(C).add(_).multiplyScalar(.5),x.quaternion.setFromUnitVectors(new R(0,1,0),b.normalize()),x.name=E,p.add(x),x}let h=(p,E=!1,C=0)=>new R((E?4.195:4.475)*Math.cos(p),.025+(E?3.695:3.95)*Math.sin(p),C);for(let p=0;p<48;p++){let E=p*Math.PI/48,C=(p+1)*Math.PI/48;for(let _ of[-.16,.16])l(e,"Corrente esterno",h(E,!1,_),h(C,!1,_)),l(e,"Corrente interno",h(E,!0,_),h(C,!0,_)),l(e,"Diagonale faccia",h(E,p%2===0,_),h(C,p%2!==0,_),.01),p%2===0&&l(e,"Montante radiale",h(E,!1,_),h(E,!0,_),.012);if(l(e,"Diagonale profondita",h(E,!1,-.16),h(C,!1,.16),.01),p%4===0)for(let _ of[!1,!0])l(e,"Traverso",h(E,_,-.16),h(E,_,.16),.014)}for(let p of[-4.475,4.475])c(n,"Piastra piede",p,-.025,0,.43,.05,.47,r);for(let p=0;p<24;p++){let E=.16+p*(Math.PI-.32)/24,C=E+(Math.PI-.32)/24*.91;if(Math.abs(4.475*Math.cos((E+C)/2))<1.12)continue;let _=h(E,!1,.202),T=h(C,!1,.202);l(n,"Barra LED scocca",_,T,.039,o);let v=new Wt().setHSL(.66+p/24*.07,.9,.66),b=new ce({color:v,emissive:v,emissiveIntensity:.65});l(n,"Barra LED diffusore",_.clone().add(new R(0,0,.022)),T.clone().add(new R(0,0,.022)),.017,b)}for(let p of[.25,.58,.91,1.22,1.91,2.24,2.57,2.89]){let E=h(p,!1,0),C=new Zt;C.position.copy(E),C.rotation.z=p-Math.PI/2,n.add(C),c(C,"Testa mobile base",0,.045,0,.26,.085,.29,o);for(let v of[-.14,.14])c(C,"Forcella testa mobile",v,.22,0,.04,.3,.08,o);let _=c(C,"Testa mobile proiettore",0,.29,.02,.24,.32,.23,o);_.rotation.x=-.38;let T=new ae(new we(.074,.074,.014,20),new ce({color:"#99a6ba",metalness:.2,roughness:.22}));T.rotation.x=Math.PI/2-.38,T.position.set(0,.29,.155),T.name="Lente testa mobile",C.add(T)}for(let p of[-3.13,3.13]){let E=.025+3.95*Math.sqrt(1-(p/4.475)**2);l(n,"Sospensione audio",new R(p,E-.1,-.07),new R(p,E-.65,-.07),.014,o);for(let C=0;C<2;C++){let _=c(n,"Line array modulo",p,E-.67-C*.32,.01,.7,.29,.42,o);_.rotation.x=.035+C*.045,c(n,"Griglia diffusore",p,E-.67-C*.32,.228,.65,.25,.015,new ce({color:"#333941",roughness:1}))}}let u=new Zt;u.name="REAR_SCREEN_TRUSS",t.add(u);function d(p,E,C=.3){let _=E.clone().sub(p).normalize(),T=Math.abs(_.y)>.9?new R(1,0,0):new R(0,1,0),v=new R().crossVectors(_,T).normalize().multiplyScalar(C/2),b=new R().crossVectors(_,v).normalize().multiplyScalar(C/2),x=[v.clone().add(b),v.clone().sub(b),v.clone().negate().sub(b),b.clone().sub(v)];for(let D of x)l(u,"Corrente truss rettilinea",p.clone().add(D),E.clone().add(D),.024);let P=Math.ceil(p.distanceTo(E)/.34);for(let D=0;D<P;D++)for(let U=0;U<4;U++){let V=p.clone().lerp(E,D/P),W=p.clone().lerp(E,(D+1)/P);l(u,"Diagonale truss rettilinea",V.clone().add(x[U]),W.clone().add(x[(U+1)%4]),.009),D%3===0&&l(u,"Traverso truss",V.clone().add(x[U]),V.clone().add(x[(U+1)%4]),.012)}}let f=-5.79,m=3.7;for(let p of[-1,1]){d(new R(p*2.95,-.5,f),new R(p*2.95,m-.42,f));for(let E=0;E<8;E++){let C=E*Math.PI/16,_=(E+1)*Math.PI/16;d(new R(p*(2.53+.42*Math.cos(C)),m-.42+.42*Math.sin(C),f),new R(p*(2.53+.42*Math.cos(_)),m-.42+.42*Math.sin(_),f))}}d(new R(-2.53,m,f),new R(2.53,m,f)),d(new R(0,3.81,-.16),new R(0,m,f));for(let p=1;p<8;p++){let E=p*Math.PI/8;for(let C of[-.16,.16])l(n,"Giunto modulo arco",h(E,!1,C).add(new R(0,-.045,0)),h(E,!1,C).add(new R(0,.045,0)),.034,r)}let y=oc(1.85,.045,!0),g=(3.975+3.72)/2;y.position.set(0,g-y.userData.height/2,.29),s.add(y);for(let p of[-.65,.65])l(s,"Staffa aggancio logo alla truss",new R(p,g,.16),new R(p,g,.31),.012,r);return t.traverse(p=>{p.isMesh&&(p.castShadow=!0,p.receiveShadow=!0,p.userData.archComponent=!0)}),{root:t,truss:e,equipment:n,sign:s,rear:u,spec:ai}}var e1=["#354b2a","#425e32","#58713b","#657c46","#486536"],Od=e1.map(i=>new ce({color:i,roughness:1,side:Ce})),n1=new ce({color:"#79644e",roughness:1});function zd(i,t){let e=159,n=()=>(e=e*1664525+1013904223>>>0,e/4294967296);function s(_,T,v=.025){let b=T.clone().sub(_),x=new ae(new we(v*.7,v,b.length(),6),n1);x.position.copy(_).add(T).multiplyScalar(.5),x.quaternion.setFromUnitVectors(new R(0,1,0),b.normalize()),x.name="Ramo",x.castShadow=!0,i.add(x)}function r(_,T=.2,v=0){let b=[];for(let D=0;D<12;D++){let U=n()*Math.PI*2,V=Math.sqrt(n())*T,W=_.clone().add(new R(Math.cos(U)*V,(n()-.5)*T*1.7,Math.sin(U)*V)),F=n()*Math.PI*2,k=T*(.28+n()*.25),Q=k*.45,Y=new R(Math.cos(F)*k,.03,Math.sin(F)*k),rt=new R(-Math.sin(F)*Q,0,Math.cos(F)*Q),et=W.clone().add(Y),st=W.clone().sub(Y),it=W.clone().add(rt),bt=W.clone().sub(rt);W.y+=.025;for(let vt of[[st,it,W],[it,et,W],[et,bt,W],[bt,st,W]])for(let Ut of vt)b.push(...Ut.toArray())}let x=new he;x.setAttribute("position",new Jt(b,3)),x.computeVertexNormals();let P=new ae(x,Od[v%5]);P.name="Foglie singole ripiegate",P.castShadow=!0,P.receiveShadow=!0,i.add(P)}function o(_,T,v,b=3,x=0){let P=t(_,T,x);s(P,P.clone().add(new R(.08,b*.7,0)),.11);for(let D=0;D<12;D++){let U=D*2.399,V=v*(.3+.6*n()),W=P.clone().add(new R(Math.cos(U)*V,b*(.6+.35*n()),Math.sin(U)*V));s(P.clone().add(new R(0,b*.5,0)),W,.022);for(let F=0;F<13;F++)r(W.clone().add(new R((n()-.5)*v*.8,(n()-.5)*v*.6,(n()-.5)*v*.8)),v*(.14+.12*n()),D+F)}}[[810,936,3.5,6.2]].forEach(_=>o(..._));function a(_,T,v=.8,b=.6){let x=t(..._),P=t(...T),D=Math.ceil(x.distanceTo(P)/.3);for(let U=0;U<=D;U++){let V=x.clone().lerp(P,U/D);for(let W=0;W<4;W++)r(V.clone().add(new R((n()-.5)*b,v*(.4+n()*.5),(n()-.5)*b)),.22+n()*.08,U+W)}}a([560,137],[982,174],1,.75),a([1030,355],[1030,655],.95,.9),a([670,677],[1004,696],.75,.75),a([210,653],[253,895],1.1,.6),a([190,237],[190,624],1.4,.85);function c(_,T,v,b=0){let x=t(_,T,b),P=x.clone().add(new R(.18,v,0));s(x,P,.15);for(let D=0;D<16;D++){let U=D*2.399,V=2.3+D%3*.2,W=[];for(let Y=0;Y<=12;Y++){let rt=Y/12;W.push(P.clone().add(new R(Math.cos(U)*V*rt,.7*Math.sin(rt*Math.PI)-.9*rt*rt,Math.sin(U)*V*rt)))}for(let Y=1;Y<W.length;Y++)s(W[Y-1],W[Y],.014);let F=[];for(let Y=1;Y<12;Y++){let rt=Y/12;for(let et of[-1,1]){let st=W[Y],it=.55*Math.sin(Math.PI*rt),bt=st.clone().add(new R(Math.cos(U+Math.PI/2)*it*et,-.25,Math.sin(U+Math.PI/2)*it*et));bt.add(new R(Math.cos(U)*.25,0,Math.sin(U)*.25)),F.push(...st.toArray(),...bt.toArray(),...st.clone().add(new R(Math.cos(U)*.11,0,Math.sin(U)*.11)).toArray())}}let k=new he;k.setAttribute("position",new Jt(F,3)),k.computeVertexNormals();let Q=new ae(k,Od[D%5]);Q.name="Palma fronda pennata",Q.castShadow=!0,i.add(Q)}}c(548,815,6.3,.8),c(1238,392,4.8);let l=new ce({color:"#deded4",roughness:.7}),h=new ce({color:"#a74f83",roughness:1});for(let[_,T]of[[480,703],[480,774]]){let v=t(_,T,.8),b=new ae(new we(.29,.2,.48,16),l);b.position.copy(v).add(new R(0,.24,0)),b.name="Vaso bianco",i.add(b);for(let x=0;x<30;x++)r(v.clone().add(new R((n()-.5)*.6,.75+n()*.6,(n()-.5)*.6)),.13,x)}let u=t(480,738.5,.81);for(let _=0;_<65;_++){let T=n()*Math.PI,v=u.clone().add(new R(Math.cos(T)*1.58004458,1.65+Math.sin(T)*.7,(n()-.5)*.28));if(r(v,.1+n()*.05,_),_%3===0){let b=new ae(new br(.065),h);b.position.copy(v).add(new R(.07,.03,.04)),b.name="Bougainvillea fiore",i.add(b)}}let d=new ce({color:"#343b32",roughness:.8});function f(_,T,v=.012){let b=T.clone().sub(_),x=new ae(new we(v,v,b.length(),5),d);x.position.copy(_).add(T).multiplyScalar(.5),x.quaternion.setFromUnitVectors(new R(0,1,0),b.normalize()),x.name="Recinzione mare",i.add(x)}let m=t(90,90),y=t(1020,183);for(let _=0;_<=110;_++){let T=m.clone().lerp(y,_/110);if(f(T,T.clone().add(new R(0,1.12,0)),_%10===0?.025:.009),_%9===0)for(let v=0;v<26;v++)r(T.clone().add(new R((n()-.5)*.35,.12+n()*1.2,(n()-.5)*.5)),.13,v)}f(m.clone().add(new R(0,1.12,0)),y.clone().add(new R(0,1.12,0)),.018);let g=new Zt;g.name="Grande pianta PB chioma alta";let p=i.children.length,E=t(103,125,0),C=E.clone().add(new R(0,3.2,0));s(E,C,.18);for(let _=0;_<12;_++){let T=_*Math.PI/6,v=C.clone().add(new R(Math.cos(T)*2.5,1.2+_%3*.3,Math.sin(T)*2.5));s(C,v,.065);for(let b=0;b<18;b++){let x=b*2.399;r(v.clone().add(new R(Math.cos(x)*.7,.2+n()*.6,Math.sin(x)*.7)),.37+b%3*.05,b)}}for(let _ of i.children.slice(p))g.add(_);i.add(g),g.userData={trunkPlan:[103,125],clearHeight:3.2};for(let[_,T]of[[1030,384],[1030,434],[1030,478],[1030,562],[1030,603],[1030,645],[852,669],[889,670],[925,670],[959,670],[995,670]])o(_,T,.38,.85);for(let[_,T]of[[164,520]]){let v=t(_,T);for(let b=0;b<12;b++){let x=b*2.399,P=.9+n()*.5,D=v.clone().add(new R(Math.cos(x)*P,3.5+n(),Math.sin(x)*P));s(v,D,.03);for(let U=0;U<10;U++)r(D.clone().add(new R((n()-.5)*.25,-U*.19,(n()-.5)*.25)),.17,b+U)}}}var de=1191/1888*25.4/72*200/1e3,pe=(i,t,e=0)=>new R((440-t)*de,e,(i-580)*de);function Vd(){let i=new Zt;i.name="GLITZ_CLUB",i.userData={version:"18.0",archDimensions:ai,layoutSource:"Pianta schematica monocromatica della venue.png",tableIdsFromUserPlan:!0,scaleBasis:"A3 PDF, nominal 1:200, hand digitized",surveyVerified:!1,up:"Y",units:"metres"};let t=[],e=[],n=[],s={},r=(N,X=.8)=>s[N]??(s[N]=new ce({color:N,roughness:X,metalness:0})),o={white:"#efede3",stone:"#c5c3b9",light:"#d6d3c7",grass:"#50634d",leaf:"#496247",wood:"#a27549",metal:"#bbc4bf",dark:"#22282c",puff:"#c4c0b3",path:"#b8b1a0"};function a(N,X,Z,j=i){let ht=new ae(N,typeof X=="string"?r(X):X);return ht.name=Z,ht.castShadow=!0,ht.receiveShadow=!0,j.add(ht),ht}function c(N,X,Z,j,ht,dt=o.white,pt=i,St=0){let B=St?new oi(Z,j,ht,2,St):new Ye(Z,j,ht),Xt=a(B,dt,N,pt);return Xt.position.copy(X),Xt}function l(N,X,Z,j,ht,dt,pt,St,B=i,Xt=0){return c(N,pe(X,Z,j),ht,dt,pt,St,B,Xt)}function h(N,X,Z,j,ht=o.white,dt=i){let pt=Z.clone().sub(X),St=a(new we(j,j,pt.length(),6),ht,N,dt);return St.position.copy(X).add(Z).multiplyScalar(.5),St.quaternion.setFromUnitVectors(new R(0,1,0),pt.normalize()),St}function u(N,X,Z,j,ht,dt=i){let pt=new Cn;X.forEach(([Xt,Yt],I)=>{let M=pe(Xt,Yt);I?pt.lineTo(M.x,-M.z):pt.moveTo(M.x,-M.z)}),pt.closePath();let St=new ni(pt,{depth:j,bevelEnabled:!1,steps:1});St.rotateX(-Math.PI/2);let B=a(St,ht,N,dt);return B.position.y=Z-j,B}function d(N,X,Z=i){for(let j=1;j<N.length;j++){let ht=pe(...N[j-1],X),dt=pe(...N[j],X),pt=Math.ceil(ht.distanceTo(dt)/1.4);for(let St=0;St<=pt;St++){let B=ht.clone().lerp(dt,St/pt);h("Montante",B,B.clone().add(new R(0,1.03,0)),.027,o.white,Z)}for(let St of[.2,.4,.6,.8,1.03])h("Corrimano",ht.clone().add(new R(0,St,0)),dt.clone().add(new R(0,St,0)),.016,o.white,Z)}}u("Terreno",[[30,85],[70,70],[1035,160],[1206,265],[1260,580],[1360,620],[1250,890],[1490,964],[1540,1110],[1370,1125],[190,930]],-.04,.32,o.grass),u("Accesso esterno ingresso",[[530,1030],[620,1050],[650,958],[570,946]],.8,.12,o.path),u("Pavimento perimetrale",[[180,213],[1007,213],[1007,654],[201,654],[201,233],[180,233]],.05,.11,o.light);let m=[[544,257],[979,257],[979,380]];for(let N=0;N<=10;N++){let X=N*Math.PI/2/10;m.push([941+38*Math.cos(X),380+64*Math.sin(X)])}m.push([572,478]);let y=[[391,233],[543,233],[572,478],[565,516],[583,532],[513,606],[498,604],[374,568],[345,381],[343,349],[347,329],[363,300],[379,268]],g=[[201,234],[388,234],[379,268],[363,300],[347,329],[343,349],[345,381],[275,406],[258,423],[201,426]],p=[[201,426],[258,423],[265,498],[276,525],[295,531],[368,532],[374,568],[498,604],[513,618],[514,654],[201,654]],E=[[345,382],[275,406],[261,419],[256,435],[264,496],[277,523],[295,531],[368,532]],C=[[228,655],[480,655],[480,905],[263,895]],_=[[546,170],[956,195],[979,212],[547,212]];u("Pista da ballo \xB7 quota -0.50",y,.1,.15,o.stone),u("Piazzale \xB7 quota 0.00",[[543,233],[979,239],[979,478],[1007,478],[1007,654],[514,654],[514,618],[498,604],[513,606],[583,532],[565,516],[572,478]],.6,.55,o.light),u("Palco DJ \xB7 quota 0.00",E,.6,.55,o.stone);function T(N,X,Z,j,ht,dt){u(X,Z,j,j+.04,o.white),u(X+" finitura",Z,j+.012,.024,o.stone);let pt={id:N,name:X,coords:Z,y:j,anchor:pe(...ht,j+.8),description:dt};return t.push(pt),pt}T("riva","RIVA DECK",m,1.1,[760,365],"Divani bianchi, base in legno e tavolini quadrati. Tavoli R1\u2013R16.");let v=[[201,234],[388,234],[355,322],[201,322]],b=.85,x=201+b/de,P=[[x,322],[355,322],[350,338],[x,338]],D=[[201,338],[350,338],[343,349],[345,381],[275,406],[258,423],[201,426]];for(let[N,X]of[[D,.9],[p,.9],[v,.6],[P,.9]])u("BACK THE STAGE",N,X,X+.04,o.white),u("BACK THE STAGE finitura",N,X+.012,.024,o.stone);t.push({id:"back",name:"BACK THE STAGE",coords:[...g,...p],y:.9,parts:[{coords:P,y:.9},{coords:D,y:.9},{coords:p,y:.9},{coords:v,y:.6}],anchor:pe(280,574,1.7),description:"Sedute morbide e tavolini tondi intorno al palco. Tavoli B0\u2013B15."}),T("glitzbar","GLITZ BAR",C,.8,[388,786],"Panche in muratura, tavoli in legno e sedie pieghevoli. Tavoli G1\u2013G8."),d([[544,257],[943,257]],1.12),d([[980,286],[980,380]],1.12),d([[980,380],...m.slice(3,-1),[793,458]],1.12),d([[708,466],[572,478],[544,257]],1.12),d([[241,234],[388,234]],.62),d([[202,271],[202,322]],.62),d([[202,339],[202,425],[202,427],[202,653],[330,653]],.92),d([[411,653],[512,653],[512,619]],.92);let U=new Zt;U.name="Ringhiera dalla scala dietro B5-B6 e fronte B6",i.add(U),d([[x,322],[355,322],[350,338],[343,349],[345,381]],.92,U);let V=new Zt;V.name="Ringhiera fronte B3-B4",i.add(V),d([[388,234],[355,322]],.62,V),d([[368,532],[374,568],[498,604],[513,618]],.92),d([[345,381],[276,406],[257,430],[265,495],[278,526],[368,531]],.6);function W(N,X,Z,j,ht,dt,pt,St=0,B=4){let Xt=new Zt;Xt.name=N,Xt.position.copy(pe(X,Z)),Xt.rotation.y=St,i.add(Xt);for(let Yt=0;Yt<B;Yt++){let I=j+(ht-j)*(Yt+1)/B;c("Gradino",new R(0,I/2,(Yt+.5)*pt/B-pt/2),dt,I,pt/B,o.white,Xt);let M=c("Luce gradino",new R(0,I-.04,(Yt+1)*pt/B-pt/2),dt*.95,.025,.02,new ce({color:"#ffe3ad",emissive:"#ffc778",emissiveIntensity:.4}),Xt);M.castShadow=!1}}W("Scala terrazza laterale",752,474,1.1,.6,3.8,1.1,-Math.atan2(369,34),3),W("Seat View scala bassa quattro gradini",958,222,.05,.65,1.7,1.12,-Math.PI/2,4),u("Seat View pianerottolo",[[939,235],[977,235],[977,242],[939,242]],.65,.6,o.light),W("Seat View scala alta tre gradini",958,249,.65,1.1,1.7,.62,-Math.PI/2,3);for(let N of[937,979])u("Seat View muretto scala",[[N-2,208],[N+2,208],[N+2,257],[N-2,257]],.8,.75,o.white),d([[N,242],[N,257]],1.1);W("Scala pista",548,565,.1,.6,Math.hypot(70,-74)*de,1.15,Math.atan2(-70,74),3),W("Scala priv\xE9 giardino",370,660,.8,.9,1.9,.6,Math.PI/2,2),W("Due gradini in discesa verso B0-B4",201+b/de/2,330,.6,.9,b,16*de,-Math.PI/2,2);let F=new Zt;F.name="Scala angolare dietro B0 su due lati",i.add(F);for(let N=0;N<4;N++){let X=(4-N)*.31/de;u("Gradino angolare",[[201-X,234-X],[240,234-X],[240,270],[201-X,270]],.6*(N+1)/4,.6*(N+1)/4,o.white,F)}d([[572,478],[565,516],[583,532]],.6);let k=Bd(pe(351,457));k.root.rotation.y=Math.atan2(23,150),i.add(k.root),k.root.updateMatrixWorld(!0);for(let N of[-4.475,4.475]){let X=k.root.localToWorld(new R(N,0,0));X.y=(ai.supportY+.9)/2;let Z=c("Appoggio arco quota confermata",X,.47,ai.supportY-.9,.47,o.white);Z.rotation.y=k.root.rotation.y}let Q=c("LED wall",new R(0,(.6+4.65)/2-ai.supportY,-5.6),5.6,4.05,.12,o.dark,k.root);Q.userData.sign="GLITZ";let Y=oc(4.3,.008);Y.position.set(0,(.6+4.65)/2-ai.supportY-Y.userData.height/2,-5.53),k.root.add(Y);let rt=Pd();rt.rotation.y=k.root.rotation.y,rt.position.copy(pe(351,457,.6)).add(new R(0,0,-1.02).applyAxisAngle(new R(0,1,0),rt.rotation.y)),i.add(rt);for(let N of[-3.13,3.13]){let X=k.root.localToWorld(new R(N,0,.56));X.y=.39;let Z=c("Sub doppio sotto palco",X,1.4,.58,.62,o.dark);Z.rotation.y=k.root.rotation.y,Z.userData.alignedWithSuspendedArray=!0}let et=[[78,92],[428,127],[428,210],[178,210],[178,282],[78,282]],st=[[546,147],[979,185],[979,213],[546,213]];for(let[N,X,Z,j,ht]of[["prato-back","Prato Back the Stage",et,[280,183],"Salottini sul prato accanto a Back the Stage, con poltrone morbide e tavolini bianchi."],["seaview","Seat View",st,[765,193],"Il panorama. La zona vista mare, tra aperitivo e tramonto sull\u2019Isola di Dino."]]){u(X+" prato",Z,0,.04,o.grass);let dt={id:N,name:X,coords:Z,y:0,anchor:pe(...j,.8),description:ht};N==="seaview"&&(dt.parts=[{coords:Z,y:0},{coords:[[574,233],[940,233],[940,255],[574,255]],y:.05}],dt.description="Seduta panoramica in muratura SV1\u2013SV5, con lampade ricaricabili; salottini SV6\u2013SV11 lungo la ringhiera nera."),t.push(dt)}for(let N of ac){let X=Ud(N.furniture,N.id);X.name="TABLE_"+N.id,X.userData={tableId:N.id,zoneId:N.zoneId,idConfirmedBySource:N.idConfirmedBySource!==!1,furnitureDimensionsEstimated:!0};let Z=N.zoneId==="back"?Number(N.id.slice(1))<=4?.62:.92:N.height;X.position.copy(pe(...N.planPosition,Z)),N.furnitureScale&&X.scale.setScalar(N.furnitureScale),Number.isFinite(N.rotation)?X.rotation.y=N.rotation:N.zoneId==="riva"?X.rotation.y=Math.PI:N.id==="G6"?X.rotation.y=Math.PI/2:["G7","G8"].includes(N.id)&&(X.rotation.y=Math.PI),X.traverse(j=>{j.isMesh&&(j.userData.tableId=N.id,j.userData.zoneId=N.zoneId,n.push(j))}),i.add(X),e.push({...N,height:Z,label:N.id,position:X.position.clone().add(new R(0,.85,0)),capacity:null,minSpend:null,status:"unconfigured",source:"ID and layout from user schematic; furniture appearance from supplied photos",group:X})}function it(N,X,Z,j,ht,dt=.6){l(N+" pavimento",X,Z,dt,j,.1,ht,"#a7a69d"),l(N+" fronte",X,Z-j/de/2+6,dt+.51,.28,1.02,ht,o.white),l(N+" piano frontale",X,Z-j/de/2+6,dt+1.045,.46,.07,ht+.08,"#b08757");for(let pt of[-1,1])l(N+" fianco",X+pt*(ht/2-.16)/de,Z,dt+.51,j,1.02,.28,o.white),l(N+" piano laterale",X+pt*(ht/2-.16)/de,Z,dt+1.045,j+.12,.07,.46,"#b08757");for(let pt=0;pt<Math.floor(ht/.14);pt++)l(N+" doga verticale",X+(pt*.14-ht/2+.07)/de,Z-j/de/2+2.7,dt+.5,.013,.94,.018,"#d2d0c5");l(N+" banco lavoro inox",X,Z+j/de/2-10,dt+.82,.65,.065,ht*.7,"#a4aaab");for(let pt of[-ht*.22,ht*.22])l(N+" frigorifero",X+pt/de,Z+j/de/2-10,dt+.37,.58,.74,.68,"#b6bdba"),l(N+" porta frigorifero",X+pt/de,Z+j/de/2-2.9,dt+.39,.022,.56,.53,"#363f3e");for(let pt=0;pt<7;pt++){let St=X+(pt-3)*.22/de;l(N+" bottiglia corpo",St,Z-j/de/2+6,dt+1.19,.07,.24,.07,pt%2?"#708265":"#b89761"),l(N+" bottiglia collo",St,Z-j/de/2+6,dt+1.34,.027,.07,.027,"#596454")}l(N+" lavello",X,Z+j/de/2-10,dt+.855,.43,.012,.4,"#4c5657")}it("Main Bar",936,613,2.35,5.25,.6);let bt=new Zt;bt.name="Main Bar rivolto verso Riva Deck",bt.position.copy(pe(936,613)),i.add(bt);for(let N of[...i.children])N.name.startsWith("Main Bar ")&&N!==bt&&(N.position.sub(bt.position),bt.add(N));bt.rotation.y=0,bt.userData.frontFacesRiva=!0,l("Bar mare fronte",467,180,.59,.14,1.12,4.9,o.white),l("Bar mare piano legno",467,180,1.18,.66,.065,5.02,"#ab794f"),l("Bar mare zoccolo",467,180,.075,.2,.09,4.96,o.white);for(let N=0;N<35;N++)l("Bar mare fuga doghe",467+(N*.14-2.38)/de,178.35,.61,.008,1,.007,"#c4c5bd");for(let N of[-2.38,2.38])l("Bar mare fianco",467+N/de,185,.59,.6,1.12,.09,o.white);for(let N of[-1.8,1.8]){l("Bar mare lanterna base",467+N/de,180,1.235,.22,.025,.22,o.white);for(let X of[-.1,.1])for(let Z of[-.1,.1]){let j=pe(467+N/de,180,1.25).add(new R(X,0,Z));h("Bar mare lanterna",j,j.clone().add(new R(0,.42,0)),.012,o.white)}l("Bar mare lanterna tetto",467+N/de,180,1.68,.22,.025,.22,o.white)}let vt=new Zt;vt.name="Bar mare ruotato 180 gradi",vt.position.copy(pe(467,180)),i.add(vt);for(let N of[...i.children])N.name.startsWith("Bar mare ")&&N!==vt&&(N.position.sub(vt.position),vt.add(N));vt.rotation.y=Math.PI;for(let N=0;N<10;N++)for(let X=0;X<3;X++)l("Bar mare lastra",414+N*12.1,183+X*12.1,.04,.525,.055,.525,"#a9aba3");l("Regia",526,684,1.13,1.7,1.05,2.4,o.white),l("Regia vetro",518,684,1.7,1.6,.06,1.7,o.dark),h("Muro fonico",pe(105,380,1.6),pe(157,688,1.6),.07,o.white),u("Parete fonica",[[102,379],[110,379],[163,687],[155,689]],3.25,3.25,o.white),u("Garden parete",[[218,655],[228,655],[270,900],[263,901]],2.9,2.9,o.white),u("Garden parete fondo",[[264,896],[505,907],[504,917],[264,905]],2.9,2.9,o.white),Jr(i,pe,[[326,888],[278,885],[240,660]]),Jr(i,pe,[[250,705],[317,705]]),Jr(i,pe,[[267,801],[321,801]]),Jr(i,pe,[[472,774],[472,895],[410,895]]);function Ut(N,X,Z){let j=X.map(([St,B],Xt)=>pe(St,B,Z[Xt])),ht=new he().setFromPoints(j);ht.setIndex([0,1,2,0,2,3]),ht.computeVertexNormals();let dt=new ce({color:o.light,roughness:.95,side:Ce}),pt=a(ht,dt,N);pt.castShadow=!1}Ut("Rampa ingresso divide i prati",[[570,946],[650,958],[760,655],[680,655]],[.8,.8,.6,.6]),u("Prato ingresso sinistro",[[505,909],[570,946],[680,655],[572,655]],.8,.84,o.grass),u("Prato ingresso destro",[[650,958],[925,1040],[1006,658],[760,655]],.8,.84,o.grass),u("Prato davanti ingresso Glitz Bar",[[573,660],[640,660],[570,934],[507,909]],.8,.84,o.grass),u("Prato continuo davanti Glitz Bar e sotto regia",[[480,655],[572,655],[505,909],[480,905]],.8,.84,o.grass),Ut("Rampa curva Riva Deck verso prato",[[979,257],[1007,257],[1007,478],[979,478]],[.05,.05,.6,.6]);function zt(N,X,Z,j){let ht=new Zt;ht.name=N,ht.position.copy(pe(X,Z,.8)),ht.rotation.y=j,i.add(ht),c("Pannello dogato bianco",new R(0,.54,0),.14,1.08,2.45,o.white,ht),c("Top superiore legno",new R(0,1.11,0),.66,.07,2.55,o.wood,ht),c("Scrivania interna bianca operatori",new R(-.4,.77,0),.7,.06,2.35,o.white,ht);for(let dt=0;dt<17;dt++)c("Fuga doghe ingresso",new R(.073,.54,-1.18+dt*.14),.006,1.04,.007,"#c4c5bd",ht);for(let dt of[-1.12,1.12])c("Supporto scrivania",new R(-.65,.37,dt),.07,.74,.07,o.white,ht);for(let dt of[-.78,0,.78]){let pt=Fd();pt.position.set(-1.02,0,dt),pt.rotation.y=Math.PI/2,ht.add(pt)}return ht}let te=pe(720,655).sub(pe(610,952)).normalize(),nt=new R(-te.z,0,te.x),ct=pe(665,803.5,.8),xt=Math.atan2(te.x,te.z);for(let[N,X]of[["Ingresso tavoli",-1],["Ingresso ticket",1]]){let Z=zt(N,0,0,xt+(X===-1?Math.PI:0));Z.position.copy(ct).addScaledVector(nt,X*2.05),Z.userData.alignedToEntranceRamp=!0}let Ot=pe(480,738.5,.81);for(let N=0;N<24;N++){let X=N*Math.PI/24,Z=(N+1)*Math.PI/24;h("Pergola garden",Ot.clone().add(new R(Math.cos(X)*1.58004458,1.65+Math.sin(X)*.7,0)),Ot.clone().add(new R(Math.cos(Z)*1.58004458,1.65+Math.sin(Z)*.7,0)),.022,"#646550")}for(let N of[-1.58004458,1.58004458])h("Montante pergola",Ot.clone().add(new R(N,0,0)),Ot.clone().add(new R(N,1.65,0)),.025,"#646550");zd(i,pe);function Tt(N,X,Z,j,ht){l(N,X,Z,1.15,j,2.3,ht,"#e6e6de"),l(N+" tetto",X,Z,2.34,j+.22,.08,ht+.2,"#e6e6de");let dt=N==="WC donne"?2:1;for(let pt=0;pt<dt;pt++){let St=Z+(pt-(dt-1)/2)*j*.42/de;l(N+" porta bianca",X+ht/de/2+.4,St,1.1,.85,2.1,.035,"#f1f0e9"),l(N+" gradino",X+ht/de/2+5,St,.12,1,.24,.45,"#969b97"),l(N+" maniglia",X+ht/de/2+1,St-6,.98,.15,.025,.025,"#a7adae")}for(let pt=0;pt<14;pt++)l(N+" fuga tavole",X+ht/de/2+.43,Z,.15+pt*.155,j,.007,.01,"#cdd0c9")}Tt("WC accessibile",1095,230,1.7,1.9),Tt("WC donne",1005,980,4.2,6.5),Tt("WC uomini",1413,1080,1.8,7.4);for(let N of i.children)N.name.startsWith("WC donne")&&(N.position.y+=.8);u("Raccordo prato unico senza fessura",[[925,1040],[1006,658],[1100,658],[1100,1040]],.8,.84,o.grass);let Ht=[["Palco DJ",314,457,2.1],["Pista",461,404,.12],["Main Bar",936,613,1.9],["Bar",467,180,1.4],["Gin xp",1165,490,1.6],["Ingresso",610,958,1.1],["WC",1005,980,2.2]],ee=[];for(let N of t){N.overlays=[],N.lines=[];for(let X of N.parts||[{coords:N.coords,y:N.y}]){let Z=u("Area "+N.id,X.coords,X.y+.035,.006,new ei({color:"#edcb94",transparent:!0,opacity:0,depthWrite:!1,side:Ce}));Z.userData.zoneId=N.id,Z.castShadow=!1,Z.receiveShadow=!1,ee.push(Z),N.overlays.push(Z);let j=X.coords.map(dt=>pe(...dt,X.y+.045));j.push(j[0].clone());let ht=new hr(new he().setFromPoints(j),new Cs({color:"#f9eed8",transparent:!0,opacity:0}));ht.name="Contorno "+N.id,i.add(ht),N.lines.push(ht)}}let ot=Rd(pe);return i.add(ot.root),{root:i,zones:t,tables:e,pickables:n,hotspots:ee,pois:Ht,materials:s,arch:k,environment:ot}}function Hd(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new he,l=0;for(let h=0;h<i.length;++h){let u=i[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0,u=[];for(let d=0;d<i.length;++d){let f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=kd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let y=0;y<o[h].length;++y)f.push(o[h][y][d]);let m=kd(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}}return c}function kd(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){let h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Re(o,e,n),c=0;for(let l=0;l<i.length;++l){let h=i[l];if(h.isInterleavedBufferAttribute){let u=c/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){let y=h.getComponent(d,m);a.setComponent(d+u,m,y)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Gd(i){i.root.updateMatrixWorld(!0);function t(n,s,r={}){let o=n.matrixWorld.clone().invert(),a=new Map;for(let c of s){if(Array.isArray(c.material))continue;let l=c.material.uuid,h=a.get(l);h||(h={material:c.material,meshes:[]},a.set(l,h)),h.meshes.push(c)}for(let c of a.values()){let l=[];for(let d of c.meshes){let f=d.geometry.clone();f.index&&(f=f.toNonIndexed()),f.attributes.normal||f.computeVertexNormals(),f.attributes.uv||f.setAttribute("uv",new Re(new Float32Array(f.attributes.position.count*2),2));for(let m of Object.keys(f.attributes))["position","normal","uv","color"].includes(m)||f.deleteAttribute(m);f.applyMatrix4(o.clone().multiply(d.matrixWorld)),l.push(f)}let h=Hd(l);if(!h)continue;let u=new ae(h,c.material);u.name=r.tableId?"TABLE_"+r.tableId+"_parts":"Architecture_"+c.material.color.getHexString(),u.userData={...r,components:[...new Set(c.meshes.map(d=>d.name))]},u.castShadow=!0,u.receiveShadow=!0,n.add(u);for(let d of c.meshes)d.removeFromParent();for(let d of l)d.dispose()}}let e=[];if(i.root.traverse(n=>{n.isMesh&&!n.userData.tableId&&!n.userData.zoneId&&!n.userData.sign&&!n.userData.archComponent&&e.push(n)}),t(i.root,e),i.arch)for(let n of[i.arch.truss,i.arch.equipment,i.arch.sign,i.arch.rear]){let s=[];n.traverse(r=>{r.isMesh&&s.push(r)}),t(n,s,{archComponent:!0})}i.pickables.length=0;for(let n of i.tables){let s=[];n.group.traverse(r=>{r.isMesh&&s.push(r)}),t(n.group,s,{tableId:n.id,zoneId:n.zoneId}),n.group.traverse(r=>{r.isMesh&&i.pickables.push(r)})}i.root.updateMatrixWorld(!0)}var Yd=new URLSearchParams(location.search).get("embedded")==="1",Kr=null,i1=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Rt=i=>document.querySelector(i),ve=Vd(),Ui=new Mi;Yd&&(document.body.classList.add("embedded"),ve.tables.forEach(i=>i.status="unavailable"));Ui.background=new Wt("#000000");Ui.add(ve.root);var li=Rt("#map"),ui=new ec({canvas:li,antialias:!0,alpha:!1,preserveDrawingBuffer:!0});ui.setPixelRatio(Math.min(devicePixelRatio,2));ui.shadowMap.enabled=!0;ui.shadowMap.type=ca;ui.outputColorSpace=ke;ui.toneMapping=Fr;ui.toneMappingExposure=1.04;Ui.add(new Pr("#fff7e7","#6d7970",1.8));var Fi=new Ds("#fff1d7",2.6);Fi.position.set(-14,35,18);Fi.castShadow=!0;Fi.shadow.mapSize.set(2048,2048);Object.assign(Fi.shadow.camera,{left:-40,right:40,top:40,bottom:-40,near:1,far:110});Fi.shadow.bias=-4e-4;Fi.shadow.normalBias=.035;Ui.add(Fi);Ui.add(Fi.target);var Zd=new Ds("#c4dbe0",.8);Zd.position.set(20,15,-25);Ui.add(Zd);var Se=new Ci(-25,25,25,-25,.1,2200);Se.position.set(-36,48,54);var Ge=new rc(Se,li);Ge.target.set(0,0,0);Ge.enableDamping=!0;Ge.dampingFactor=.12;Ge.minPolarAngle=.08;Ge.maxPolarAngle=1.37;Ge.minZoom=.08;Ge.maxZoom=5;Ge.enablePan=!0;Ge.mouseButtons={LEFT:yn.ROTATE,MIDDLE:yn.DOLLY,RIGHT:yn.PAN};var cn=null,Je=null,en=null,ci=!1,uc=1,fh=[],Xs=null,Nn=!0,$r=null,dh=new Lr,Wd=new ut;function s1(){let i=li.parentElement.getBoundingClientRect();ui.setSize(i.width,i.height,!1);let t=i.width/i.height,e=Math.max(40,47/t);Se.left=-e*t/2,Se.right=e*t/2,Se.top=e/2,Se.bottom=-e/2,Se.updateProjectionMatrix(),Nn=!0}new ResizeObserver(s1).observe(li.parentElement);function dc(i){uc=i,document.querySelectorAll(".step").forEach((t,e)=>{t.classList.toggle("active",e+1===i),t.classList.toggle("done",e+1<i)}),Rt("#back").hidden=i===1,Rt("#back").textContent=i===3?"\u2190 Torna al tavolo":"\u2190 Tutte le zone",Rt("#panel").classList.toggle("summary-mode",i===3)}function qs(i,t,e=!1){let n=Se.position.clone().sub(Ge.target);e&&(n=new R(-36,48,54)),ci&&(n=new R(.01,75,.01)),en={start:performance.now(),from:Se.position.clone(),to:i.clone().add(n),t0:Ge.target.clone(),t1:i.clone(),z0:Se.zoom,z1:t},Nn=!0}function Jd(){for(let i of ve.zones){let t=i.id===cn;i.overlays.forEach(e=>e.material.opacity=t?.14:0),i.lines.forEach(e=>e.material.opacity=t?1:0)}}function fc(){for(let i of ve.tables)i.group.traverse(t=>{t.isMesh&&t.userData.originalMaterial&&(t.material=t.userData.originalMaterial,delete t.userData.originalMaterial)})}function Kd(i){fc(),i&&i.group.traverse(t=>{t.isMesh&&(t.userData.originalMaterial=t.material,t.material=t.material.clone(),t.material.emissive=new Wt("#e10600"),t.material.emissiveIntensity=.18)})}function jr(){cn=null,Je=null,$r=null,dc(1),Jd(),fc(),Rt("#panel-title").textContent="Scegli la tua zona.",Rt("#panel-kicker").textContent="IL CLUB, DA UN ALTRO PUNTO DI VISTA",Rt("#panel-content").innerHTML='<p class="intro">Dal palco al giardino: esplora gli spazi e trova il tuo salottino.</p><div class="source-note">Nomi e tavoli dalla tua piantina.<br>Arredi modellati sulle fotografie del Glitz.</div>',Rt("#panel-content").querySelectorAll("[data-zone]").forEach(i=>i.onclick=()=>Ys(i.dataset.zone)),Rt("#sticky-action").hidden=!1,Rt("#action").textContent="Prenota",Rt("#action").disabled=!0,Rt("#action").onclick=null,Rt("#action-note").textContent="Seleziona un tavolo sulla mappa",Rt("#map-caption").textContent="Tocca una zona per esplorarla",pc(),qs(new R(0,0,0),1,!0),Rt("#view-name").textContent="Vista generale"}function $d(i){return{unconfigured:"Da verificare",available:"Disponibile",soldout:"Esaurito",unavailable:"Non disponibile"}[i.status]||"Da verificare"}function jd(i){return i.priceLabel?i1(i.priceLabel):Number.isFinite(i.minSpend)?new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(i.minSpend)+" min. tavolo":"Prezzo su richiesta"}function r1(){return`<div class="table-list">${ve.tables.filter(i=>i.zoneId===cn).map(i=>`<button data-table="${i.id}" class="table-chip ${i.id===Je?"selected":""}" ${["soldout","unavailable"].includes(i.status)?"disabled":""}><i class="dot ${i.status}"></i>${i.id}</button>`).join("")}</div>`}function o1(){document.querySelectorAll("[data-table]").forEach(i=>i.onclick=()=>hi(i.dataset.table))}function Ys(i,t=!0){let e=ve.zones.find(n=>n.id===i);if(e&&(cn=i,Je=null,$r=null,dc(2),Jd(),fc(),Rt("#panel-kicker").textContent="SCEGLI IL TUO SALOTTINO",Rt("#panel-title").textContent=e.name,Rt("#panel-content").innerHTML=`<p class="intro">${e.description}</p>${r1()}<div id="table-detail" aria-live="polite"><div class="empty-detail"><span class="selection-icon">\u25CE</span><p>Tocca un indicatore sulla mappa<br>o scegli un ID qui sopra.</p></div></div><div class="source-note">Disposizione e codici dalla piantina fornita. Capienze e condizioni da configurare.</div>`,o1(),Rt("#sticky-action").hidden=!1,Rt("#action").textContent="Prenota",Rt("#action").disabled=!0,Rt("#action").onclick=null,Rt("#action-note").textContent="Seleziona un tavolo sulla mappa",Rt("#view-name").textContent=e.name,Rt("#map-caption").textContent="Seleziona un salottino",pc(),t)){let n=new zn().setFromPoints(e.coords.map(l=>pe(...l,e.y))),s=n.getCenter(new R),r=n.getSize(new R),o=Se.right-Se.left,a=Se.top-Se.bottom,c=Math.max(r.x,r.z);qs(s,Math.min(3.2,Math.max(1.4,Math.min(o,a)/(c*1.35)))),i==="glitzbar"&&!ci&&(en.to=s.clone().add(new R(14,24,14)))}}function hi(i){let t=ve.tables.find(e=>e.id===i);!t||["soldout","unavailable"].includes(t.status)||((cn!==t.zoneId||uc===3)&&Ys(t.zoneId,!1),Je=i,dc(2),Kd(t),document.querySelectorAll("[data-table]").forEach(e=>e.classList.toggle("selected",e.dataset.table===i)),Rt("#table-detail").innerHTML=`<div class="table-detail"><div class="row"><span class="eyebrow">IL TUO SALOTTINO</span><span class="status"><i class="dot ${t.status}"></i>${$d(t)}</span></div><h3>${t.id}</h3><div class="table-data"><span>Condizioni</span><strong>${jd(t)}</strong><span>Ospiti</span><strong>${t.capacity?`Fino a ${t.capacity}`:"Capienza da confermare"}</strong></div></div>`,Rt("#sticky-action").hidden=!1,Rt("#action").disabled=!1,Rt("#action").textContent="Prenota",Rt("#action").onclick=()=>{Kr?t.status==="available"&&Kr(hc()):Yd||a1()},Kr&&(Rt("#action").textContent="Prenota"),Rt("#action-note").textContent=Kr?"Apri il modulo \xB7 conferma dello staff via WhatsApp":`${ve.zones.find(e=>e.id===t.zoneId).name} \xB7 ${t.id} \xB7 Anteprima`,pc(),window.dispatchEvent(new CustomEvent("glitz:table-selected",{detail:hc()})),Nn=!0)}function hc(){let i=ve.tables.find(t=>t.id===Je);return i?{tableId:i.id,zoneId:i.zoneId,zone:ve.zones.find(t=>t.id===i.zoneId).name,guests:$r?.guests??null,minSpend:i.minSpend,currency:"EUR",status:i.status,layoutConfirmedBySource:i.idConfirmedBySource!==!1,furnitureDimensionsEstimated:!0}:null}function a1(){if(!Je)return;let i=ve.tables.find(t=>t.id===Je);dc(3),Rt("#panel-kicker").textContent="LA TUA SCELTA",Rt("#panel-title").textContent="Una notte al Glitz.",Rt("#panel-content").innerHTML=`<div class="summary-card"><span class="eyebrow">${ve.zones.find(t=>t.id===i.zoneId).name}</span><h3>${i.id}</h3><p>${jd(i)}</p></div><label class="field-label" for="guests">QUANTI SIETE?</label><input id="guests" type="number" inputmode="numeric" min="1" ${i.capacity?`max="${i.capacity}"`:""} value="${$r?.guests||5}" aria-describedby="guest-note"><p class="source-note" id="guest-note">Il numero di ospiti sar\xE0 da verificare con la capienza effettiva del tavolo.</p><div class="integration-note"><span>Anteprima della selezione</span><p>Disponibilit\xE0, pagamento e conferma non sono ancora collegati al sistema di prenotazione.</p></div>`,Rt("#action").textContent="Salva la selezione",Rt("#action").onclick=c1,Rt("#action-note").textContent="Scarica un riepilogo \xB7 nessuna prenotazione",Rt("#sticky-action").hidden=!1,pc()}function c1(){let i=Rt("#guests");if(!i.reportValidity())return;$r={guests:Number(i.value)};let t=hc();l1(JSON.stringify(t,null,2),"glitz-selezione.json","application/json"),window.dispatchEvent(new CustomEvent("glitz:selection-confirmed",{detail:t})),Rt("#action-note").textContent="Riepilogo salvato. Nessuna prenotazione effettuata."}function l1(i,t,e){let n=new Blob([i],{type:e}),s=document.createElement("a");s.href=URL.createObjectURL(n),s.download=t,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),2e3)}function pc(){Qd();let i=Rt("#markers");i.replaceChildren(),fh=[];for(let t of ve.tables.filter(e=>!cn||e.zoneId===cn)){let e=document.createElement("button");e.className="table-marker "+t.status+(Je===t.id?" selected":""),e.innerHTML=`<i></i><span>${t.id}</span>`,e.disabled=["soldout","unavailable"].includes(t.status),e.setAttribute("aria-label",`Salottino ${t.id}, ${$d(t)}`),e.onclick=()=>hi(t.id),i.append(e),fh.push({el:e,p:t.position})}Nn=!0}var Xd=0;function h1(i){if(i-Xd<25)return;Xd=i;let t=li.getBoundingClientRect();for(let e of fh){let n=e.p.clone().project(Se);e.el.style.transform=`translate(-50%,-100%) translate(${(n.x+1)/2*t.width}px,${(1-n.y)/2*t.height}px)`,e.el.style.visibility=n.z>1||n.z<-1||Math.abs(n.x)>1.12||Math.abs(n.y)>1.2?"hidden":"visible"}}li.addEventListener("pointerdown",i=>{Xs=[i.clientX,i.clientY]});li.addEventListener("pointerup",i=>{if(!Xs||Math.hypot(i.clientX-Xs[0],i.clientY-Xs[1])>6)return;Xs=null;let t=li.getBoundingClientRect();if(Wd.set((i.clientX-t.left)/t.width*2-1,-(i.clientY-t.top)/t.height*2+1),dh.setFromCamera(Wd,Se),cn){let n=dh.intersectObjects(ve.pickables.filter(s=>s.userData.zoneId===cn))[0];if(n){hi(n.object.userData.tableId);return}}let e=dh.intersectObjects(ve.hotspots)[0];e&&Ys(e.object.userData.zoneId)});li.addEventListener("pointercancel",()=>Xs=null);Ge.addEventListener("start",()=>{en=null});Ge.addEventListener("change",()=>Nn=!0);Rt("#back").onclick=()=>{if(uc===3){let i=Je;Ys(cn,!1),hi(i)}else jr()};Rt("#reset").onclick=()=>{ci=!1,Rt("#top").classList.remove("active"),jr()};Rt("#zoom-in").onclick=()=>{Se.zoom=Math.min(5,Se.zoom*1.2),Se.updateProjectionMatrix(),Nn=!0};Rt("#zoom-out").onclick=()=>{Se.zoom=Math.max(.08,Se.zoom/1.2),Se.updateProjectionMatrix(),Nn=!0};Rt("#top").onclick=()=>{ci=!ci,Rt("#top").classList.toggle("active",ci),qs(Ge.target.clone(),Se.zoom,!0)};Rt("#arch-view").onclick=()=>{Rt("#source-plan").hidden||Rt("#plan-toggle").click(),ci=!1,Rt("#top").classList.remove("active");let i=ve.arch.root.position.clone().add(new R(0,2,0));qs(i,3.5,!0),en.to=i.clone().add(new R(-7,5,18)),Rt("#view-name").textContent="L\u2019arco del Glitz",Rt("#map-caption").textContent="9 m di larghezza \xB7 5 m sopra la pista"};Rt("#garden-view").onclick=()=>{ci=!1,qs(ve.environment.gardenTarget,.85,!0),en.to=ve.environment.gardenTarget.clone().add(new R(35,28,-25))};Rt("#panorama-view").onclick=()=>{ci=!1,qs(ve.environment.panoramaTarget,.12,!0),en.to=ve.environment.panoramaTarget.clone().add(new R(-95,115,170))};Rt("#help").onclick=()=>Rt("#help-dialog").showModal();Rt("#close-help").onclick=()=>Rt("#help-dialog").close();function u1(i){if(!Array.isArray(i))throw Error("Inventory must be an array");for(let n of i){let s=ve.tables.find(r=>r.id===n.id);s&&(["available","soldout","unavailable","unconfigured"].includes(n.status)&&(s.status=n.status),typeof n.priceLabel=="string"&&(s.priceLabel=n.priceLabel),(n.minSpend===null||Number.isFinite(n.minSpend)&&n.minSpend>=0)&&(s.minSpend=n.minSpend),(n.capacity===null||Number.isInteger(n.capacity)&&n.capacity>0)&&(s.capacity=n.capacity))}let t=cn,e=Je;t?(Ys(t,!1),e&&hi(e)):jr(),Nn=!0}Gd(ve);var Ws=!1;function Qd(){document.querySelectorAll("#plan-hits rect").forEach(i=>{i.classList.toggle("current",i.dataset.id===Je),i.style.opacity=cn&&i.dataset.zone!==cn?.28:1})}for(let i of ac.filter(t=>Array.isArray(t.schematicPosition))){let t=document.createElementNS("http://www.w3.org/2000/svg","rect");t.setAttribute("x",i.schematicPosition[0]-27),t.setAttribute("y",i.schematicPosition[1]-25),t.setAttribute("width",54),t.setAttribute("height",50),t.setAttribute("rx",3),t.setAttribute("tabindex","0"),t.setAttribute("role","button"),t.setAttribute("aria-label","Seleziona "+i.id+" sulla piantina"),t.dataset.id=i.id,t.dataset.zone=i.zoneId,t.onclick=()=>hi(i.id),t.onkeydown=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),hi(i.id))},Rt("#plan-hits").append(t)}Rt("#plan-toggle").onclick=()=>{Ws=!Ws,Rt("#source-plan").hidden=!Ws,Rt(".map-stage").classList.toggle("show-plan",Ws),Rt("#plan-toggle").classList.toggle("active",Ws),Rt("#plan-toggle").textContent=Ws?"Torna al 3D":"Pianta",Qd()};window.GlitzMap={setBookingHandler:i=>{Kr=typeof i=="function"?i:null,Je&&hi(Je)},selectZone:Ys,selectTable:hi,reset:jr,getSelection:hc,getTables:()=>ve.tables.map(({group:i,position:t,...e})=>({...e,position:t.toArray()})),setInventory:u1,exportGLB:async()=>{fc(),ve.zones.forEach(t=>{t.overlays.forEach(e=>e.visible=!1),t.lines.forEach(e=>e.visible=!1)});let i=await new Ni().parseAsync(ve.root,{binary:!0,onlyVisible:!0});return ve.zones.forEach(t=>{t.overlays.forEach(e=>e.visible=!0),t.lines.forEach(e=>e.visible=!0)}),Je&&Kd(ve.tables.find(t=>t.id===Je)),i},getModelMetadata:()=>ve.root.userData};window.__glitz={model:ve,scene:Ui,camera:Se,renderer:ui,controls:Ge,get state(){return{step:uc,currentZone:cn,currentTable:Je}},ready:!0};jr();var qd=0;function tf(i){if(requestAnimationFrame(tf),en){let t=Math.min(1,(i-en.start)/650),e=1-Math.pow(1-t,3);Se.position.lerpVectors(en.from,en.to,e),Ge.target.lerpVectors(en.t0,en.t1,e),Se.zoom=ii.lerp(en.z0,en.z1,e),Se.updateProjectionMatrix(),t===1&&(en=null),Nn=!0}Ge.update(),(Nn||qd<5)&&(ui.render(Ui,Se),h1(i),Nn=!1,qd++)}requestAnimationFrame(tf);Rt("#loading").remove();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
