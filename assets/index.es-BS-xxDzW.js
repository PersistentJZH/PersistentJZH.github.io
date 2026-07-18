var vu=Object.defineProperty,_u=(i,e,t)=>e in i?vu(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,ie=(i,e,t)=>(_u(i,typeof e!="symbol"?e+"":e,t),t);/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ko="152",oi={ROTATE:0,DOLLY:1,PAN:2},ai={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yu=0,ba=1,xu=2,Yc=1,Su=2,pn=3,Cn=0,Et=1,mn=2,Tn=0,Ui=1,wa=2,Ta=3,Ca=4,Mu=5,Ri=100,Eu=101,Au=102,Ra=103,Pa=104,bu=200,wu=201,Tu=202,Cu=203,Zc=204,qc=205,Ru=206,Pu=207,Lu=208,Iu=209,Uu=210,Du=0,Nu=1,Ou=2,To=3,Bu=4,Fu=5,zu=6,Gu=7,Ms=0,Hu=1,Vu=2,vn=0,ku=1,Wu=2,Xu=3,ju=4,Yu=5,Jc=300,Fi=301,zi=302,Co=303,Ro=304,Es=306,Po=1e3,Xt=1001,Lo=1002,Rt=1003,La=1004,Fs=1005,Ft=1006,Zu=1007,gr=1008,Zn=1009,qu=1010,Ju=1011,Qc=1012,Qu=1013,Hn=1014,Vn=1015,vr=1016,Ku=1017,$u=1018,Di=1020,ef=1021,jt=1023,tf=1024,nf=1025,kn=1026,Gi=1027,rf=1028,sf=1029,of=1030,af=1031,lf=1033,zs=33776,Gs=33777,Hs=33778,Vs=33779,Ia=35840,Ua=35841,Da=35842,Na=35843,cf=36196,Oa=37492,Ba=37496,Fa=37808,za=37809,Ga=37810,Ha=37811,Va=37812,ka=37813,Wa=37814,Xa=37815,ja=37816,Ya=37817,Za=37818,qa=37819,Ja=37820,Qa=37821,ks=36492,hf=36283,Ka=36284,$a=36285,el=36286,Kc=3e3,Wn=3001,uf=3200,ff=3201,Tr=0,df=1,Xn="",Oe="srgb",rn="srgb-linear",$c="display-p3",Ws=7680,pf=519,Io=35044,tl="300 es",Uo=1035;class ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nl=1234567;const cr=Math.PI/180,_r=180/Math.PI;function nn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function ht(i,e,t){return Math.max(e,Math.min(t,i))}function $o(i,e){return(i%e+e)%e}function mf(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function gf(i,e,t){return i!==e?(t-i)/(e-i):0}function hr(i,e,t){return(1-t)*i+t*e}function vf(i,e,t,n){return hr(i,e,1-Math.exp(-t*n))}function _f(i,e=1){return e-Math.abs($o(i,e*2)-e)}function yf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function xf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Sf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Mf(i,e){return i+Math.random()*(e-i)}function Ef(i){return i*(.5-Math.random())}function Af(i){i!==void 0&&(nl=i);let e=nl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function bf(i){return i*cr}function wf(i){return i*_r}function Do(i){return(i&i-1)===0&&i!==0}function Tf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function eh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cf(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),f=a((e-n)/2),p=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function gn(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Je(i,e){switch(e.constructor){case Float32Array:return i;case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Rf={DEG2RAD:cr,RAD2DEG:_r,generateUUID:nn,clamp:ht,euclideanModulo:$o,mapLinear:mf,inverseLerp:gf,lerp:hr,damp:vf,pingpong:_f,smoothstep:yf,smootherstep:xf,randInt:Sf,randFloat:Mf,randFloatSpread:Ef,seededRandom:Af,degToRad:bf,radToDeg:wf,isPowerOfTwo:Do,ceilPowerOfTwo:Tf,floorPowerOfTwo:eh,setQuaternionFromProperEuler:Cf,normalize:Je,denormalize:gn};class ae{constructor(e=0,t=0){ae.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],v=r[0],m=r[3],d=r[6],M=r[1],_=r[4],y=r[7],A=r[2],C=r[5],U=r[8];return s[0]=a*v+o*M+l*A,s[3]=a*m+o*_+l*C,s[6]=a*d+o*y+l*U,s[1]=c*v+h*M+u*A,s[4]=c*m+h*_+u*C,s[7]=c*d+h*y+u*U,s[2]=f*v+p*M+g*A,s[5]=f*m+p*_+g*C,s[8]=f*d+p*y+g*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,f=o*l-h*s,p=c*s-a*l,g=t*u+n*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(r*c-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=f*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Xs.makeScale(e,t)),this}rotate(e){return this.premultiply(Xs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xs.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xs=new ke;function th(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}const il={};function ur(i){i in il||(il[i]=!0,console.warn(i))}function Ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Pf=new ke().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Lf=new ke().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function If(i){return i.convertSRGBToLinear().applyMatrix3(Lf)}function Uf(i){return i.applyMatrix3(Pf).convertLinearToSRGB()}const Df={[rn]:i=>i,[Oe]:i=>i.convertSRGBToLinear(),[$c]:If},Nf={[rn]:i=>i,[Oe]:i=>i.convertLinearToSRGB(),[$c]:Uf},Ht={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return rn},set workingColorSpace(i){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Df[e],r=Nf[t];if(n===void 0||r===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)}};let li;class nh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{li===void 0&&(li=yr("canvas")),li.width=e.width,li.height=e.height;const n=li.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ni(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class ih{constructor(e=null){this.isSource=!0,this.uuid=nn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ys(r[a].image)):s.push(Ys(r[a]))}else s=Ys(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ys(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Of=0;class Pt extends ei{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=Xt,r=Xt,s=Ft,a=gr,o=jt,l=Zn,c=Pt.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=nn(),this.name="",this.source=new ih(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Wn?Oe:Xn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Jc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Po:e.x=e.x-Math.floor(e.x);break;case Xt:e.x=e.x<0?0:1;break;case Lo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Po:e.y=e.y-Math.floor(e.y);break;case Xt:e.y=e.y<0?0:1;break;case Lo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Oe?Wn:Kc}set encoding(e){ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Wn?Oe:Xn}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=Jc;Pt.DEFAULT_ANISOTROPY=1;class Ye{constructor(e=0,t=0,n=0,r=1){Ye.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(p+1)/2,A=(d+1)/2,C=(h+f)/4,U=(u+v)/4,F=(g+m)/4;return _>y&&_>A?_<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(_),r=C/n,s=U/n):y>A?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=C/r,s=F/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=U/s,r=F/s),this.set(n,r,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(f-h)/M,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qn extends ei{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(ur("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Wn?Oe:Xn),this.texture=new Pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Ft,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ih(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rh extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bf extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3];const f=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==f||c!==p||h!==g){let m=1-o;const d=l*f+c*p+h*g+u*v,M=d>=0?1:-1,_=1-d*d;if(_>Number.EPSILON){const A=Math.sqrt(_),C=Math.atan2(A,d*M);m=Math.sin(m*C)/A,o=Math.sin(o*C)/A}const y=o*M;if(l=l*m+f*y,c=c*m+p*y,h=h*m+g*y,u=u*m+v*y,m===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[a],f=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*u+l*p-c*f,e[t+1]=l*g+h*f+c*u-o*p,e[t+2]=c*g+h*p+o*f-l*u,e[t+3]=h*g-o*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),u=o(s/2),f=l(n/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*r-o*n,h=l*n+o*t-s*r,u=l*r+s*n-a*t,f=-s*t-a*n-o*r;return this.x=c*l+f*-s+h*-o-u*-a,this.y=h*l+f*-a+u*-s-c*-o,this.z=u*l+f*-o+c*-a-h*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zs.copy(this).projectOnVector(e),this.sub(Zs)}reflect(e){return this.sub(Zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zs=new T,rl=new yn;class Rn{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),ci.copy(e.boundingBox),ci.applyMatrix4(e.matrixWorld),this.union(ci);else{const r=e.geometry;if(r!==void 0)if(t&&r.attributes!==void 0&&r.attributes.position!==void 0){const s=r.attributes.position;for(let a=0,o=s.count;a<o;a++)cn.fromBufferAttribute(s,a).applyMatrix4(e.matrixWorld),this.expandByPoint(cn)}else r.boundingBox===null&&r.computeBoundingBox(),ci.copy(r.boundingBox),ci.applyMatrix4(e.matrixWorld),this.union(ci)}const n=e.children;for(let r=0,s=n.length;r<s;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),Ir.subVectors(this.max,Qi),hi.subVectors(e.a,Qi),ui.subVectors(e.b,Qi),fi.subVectors(e.c,Qi),En.subVectors(ui,hi),An.subVectors(fi,ui),Dn.subVectors(hi,fi);let t=[0,-En.z,En.y,0,-An.z,An.y,0,-Dn.z,Dn.y,En.z,0,-En.x,An.z,0,-An.x,Dn.z,0,-Dn.x,-En.y,En.x,0,-An.y,An.x,0,-Dn.y,Dn.x,0];return!qs(t,hi,ui,fi,Ir)||(t=[1,0,0,0,1,0,0,0,1],!qs(t,hi,ui,fi,Ir))?!1:(Ur.crossVectors(En,An),t=[Ur.x,Ur.y,Ur.z],qs(t,hi,ui,fi,Ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ln=[new T,new T,new T,new T,new T,new T,new T,new T],cn=new T,ci=new Rn,hi=new T,ui=new T,fi=new T,En=new T,An=new T,Dn=new T,Qi=new T,Ir=new T,Ur=new T,Nn=new T;function qs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Nn.fromArray(i,s);const o=r.x*Math.abs(Nn.x)+r.y*Math.abs(Nn.y)+r.z*Math.abs(Nn.z),l=e.dot(Nn),c=t.dot(Nn),h=n.dot(Nn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Ff=new Rn,Ki=new T,Js=new T;class ti{constructor(e=new T,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ff.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ki.subVectors(e,this.center);const t=Ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ki,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Js.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ki.copy(e.center).add(Js)),this.expandByPoint(Ki.copy(e.center).sub(Js))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hn=new T,Qs=new T,Dr=new T,bn=new T,Ks=new T,Nr=new T,$s=new T;class As{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Qs.copy(e).add(t).multiplyScalar(.5),Dr.copy(t).sub(e).normalize(),bn.copy(this.origin).sub(Qs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Dr),o=bn.dot(this.direction),l=-bn.dot(Dr),c=bn.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*l-o,f=a*o-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=s,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*s+o)),f=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(u=Math.max(0,-(a*s+o)),f=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c);else f=a>0?-s:s,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Qs).addScaledVector(Dr,f),p}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const n=hn.dot(this.direction),r=hn.dot(hn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,r,s){Ks.subVectors(t,e),Nr.subVectors(n,e),$s.crossVectors(Ks,Nr);let a=this.direction.dot($s),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bn.subVectors(this.origin,e);const l=o*this.direction.dot(Nr.crossVectors(bn,Nr));if(l<0)return null;const c=o*this.direction.dot(Ks.cross(bn));if(c<0||l+c>a)return null;const h=-o*bn.dot($s);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class et{constructor(){et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,r,s,a,o,l,c,h,u,f,p,g,v,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new et().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/di.setFromMatrixColumn(e,0).length(),s=1/di.setFromMatrixColumn(e,1).length(),a=1/di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=a*h,p=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=f-v*c,t[9]=-o*l,t[2]=v-f*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,g=c*h,v=c*u;t[0]=f+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,g=c*h,v=c*u;t[0]=f-v*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,p=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=f*c+v,t[1]=l*u,t[5]=v*c+f,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-f*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=f-v*u}else if(e.order==="XZY"){const f=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+v,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zf,e,Gf)}lookAt(e,t,n){const r=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),wn.crossVectors(n,Ut),wn.lengthSq()===0&&(Math.abs(n.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),wn.crossVectors(n,Ut)),wn.normalize(),Or.crossVectors(Ut,wn),r[0]=wn.x,r[4]=Or.x,r[8]=Ut.x,r[1]=wn.y,r[5]=Or.y,r[9]=Ut.y,r[2]=wn.z,r[6]=Or.z,r[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],v=n[6],m=n[10],d=n[14],M=n[3],_=n[7],y=n[11],A=n[15],C=r[0],U=r[4],F=r[8],x=r[12],E=r[1],O=r[5],V=r[9],L=r[13],N=r[2],G=r[6],Q=r[10],z=r[14],W=r[3],K=r[7],$=r[11],ge=r[15];return s[0]=a*C+o*E+l*N+c*W,s[4]=a*U+o*O+l*G+c*K,s[8]=a*F+o*V+l*Q+c*$,s[12]=a*x+o*L+l*z+c*ge,s[1]=h*C+u*E+f*N+p*W,s[5]=h*U+u*O+f*G+p*K,s[9]=h*F+u*V+f*Q+p*$,s[13]=h*x+u*L+f*z+p*ge,s[2]=g*C+v*E+m*N+d*W,s[6]=g*U+v*O+m*G+d*K,s[10]=g*F+v*V+m*Q+d*$,s[14]=g*x+v*L+m*z+d*ge,s[3]=M*C+_*E+y*N+A*W,s[7]=M*U+_*O+y*G+A*K,s[11]=M*F+_*V+y*Q+A*$,s[15]=M*x+_*L+y*z+A*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],v=e[7],m=e[11],d=e[15];return g*(+s*l*u-r*c*u-s*o*f+n*c*f+r*o*p-n*l*p)+v*(+t*l*p-t*c*f+s*a*f-r*a*p+r*c*h-s*l*h)+m*(+t*c*u-t*o*p-s*a*u+n*a*p+s*o*h-n*c*h)+d*(-r*o*h-t*l*u+t*o*f+r*a*u-n*a*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],v=e[13],m=e[14],d=e[15],M=u*m*c-v*f*c+v*l*p-o*m*p-u*l*d+o*f*d,_=g*f*c-h*m*c-g*l*p+a*m*p+h*l*d-a*f*d,y=h*v*c-g*u*c+g*o*p-a*v*p-h*o*d+a*u*d,A=g*u*l-h*v*l-g*o*f+a*v*f+h*o*m-a*u*m,C=t*M+n*_+r*y+s*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/C;return e[0]=M*U,e[1]=(v*f*s-u*m*s-v*r*p+n*m*p+u*r*d-n*f*d)*U,e[2]=(o*m*s-v*l*s+v*r*c-n*m*c-o*r*d+n*l*d)*U,e[3]=(u*l*s-o*f*s-u*r*c+n*f*c+o*r*p-n*l*p)*U,e[4]=_*U,e[5]=(h*m*s-g*f*s+g*r*p-t*m*p-h*r*d+t*f*d)*U,e[6]=(g*l*s-a*m*s-g*r*c+t*m*c+a*r*d-t*l*d)*U,e[7]=(a*f*s-h*l*s+h*r*c-t*f*c-a*r*p+t*l*p)*U,e[8]=y*U,e[9]=(g*u*s-h*v*s-g*n*p+t*v*p+h*n*d-t*u*d)*U,e[10]=(a*v*s-g*o*s+g*n*c-t*v*c-a*n*d+t*o*d)*U,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*p-t*o*p)*U,e[12]=A*U,e[13]=(h*v*r-g*u*r+g*n*f-t*v*f-h*n*m+t*u*m)*U,e[14]=(g*o*r-a*v*r-g*n*l+t*v*l+a*n*m-t*o*m)*U,e[15]=(a*u*r-h*o*r+h*n*l-t*u*l-a*n*f+t*o*f)*U,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,f=s*c,p=s*h,g=s*u,v=a*h,m=a*u,d=o*u,M=l*c,_=l*h,y=l*u,A=n.x,C=n.y,U=n.z;return r[0]=(1-(v+d))*A,r[1]=(p+y)*A,r[2]=(g-_)*A,r[3]=0,r[4]=(p-y)*C,r[5]=(1-(f+d))*C,r[6]=(m+M)*C,r[7]=0,r[8]=(g+_)*U,r[9]=(m-M)*U,r[10]=(1-(f+v))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=di.set(r[0],r[1],r[2]).length();const a=di.set(r[4],r[5],r[6]).length(),o=di.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vt.copy(this);const c=1/s,h=1/a,u=1/o;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=h,Vt.elements[5]*=h,Vt.elements[6]*=h,Vt.elements[8]*=u,Vt.elements[9]*=u,Vt.elements[10]*=u,t.setFromRotationMatrix(Vt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a){const o=this.elements,l=2*s/(t-e),c=2*s/(n-r),h=(t+e)/(t-e),u=(n+r)/(n-r),f=-(a+s)/(a-s),p=-2*a*s/(a-s);return o[0]=l,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=u,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,s,a){const o=this.elements,l=1/(t-e),c=1/(n-r),h=1/(a-s),u=(t+e)*l,f=(n+r)*c,p=(a+s)*h;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-u,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const di=new T,Vt=new et,zf=new T(0,0,0),Gf=new T(1,1,1),wn=new T,Or=new T,Ut=new T,sl=new et,ol=new yn;class bs{constructor(e=0,t=0,n=0,r=bs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ol.setFromEuler(this),this.setFromQuaternion(ol,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bs.DEFAULT_ORDER="XYZ";class ea{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hf=0;const al=new T,pi=new yn,un=new et,Br=new T,$i=new T,Vf=new T,kf=new yn,ll=new T(1,0,0),cl=new T(0,1,0),hl=new T(0,0,1),Wf={type:"added"},ul={type:"removed"};class ut extends ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hf++}),this.uuid=nn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new T,t=new bs,n=new yn,r=new T(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new et},normalMatrix:{value:new ke}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new ea,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(ll,e)}rotateY(e){return this.rotateOnAxis(cl,e)}rotateZ(e){return this.rotateOnAxis(hl,e)}translateOnAxis(e,t){return al.copy(e).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ll,e)}translateY(e){return this.translateOnAxis(cl,e)}translateZ(e){return this.translateOnAxis(hl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt($i,Br,this.up):un.lookAt(Br,$i,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),pi.setFromRotationMatrix(un),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Wf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ul)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(ul)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let r=0,s=this.children.length;r<s;r++){const a=this.children[r].getObjectsByProperty(e,t);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,e,Vf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,kf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}ut.DEFAULT_UP=new T(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kt=new T,fn=new T,eo=new T,dn=new T,mi=new T,gi=new T,fl=new T,to=new T,no=new T,io=new T;let Fr=!1;class zt{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),kt.subVectors(e,t),r.cross(kt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){kt.subVectors(r,t),fn.subVectors(n,t),eo.subVectors(e,t);const a=kt.dot(kt),o=kt.dot(fn),l=kt.dot(eo),c=fn.dot(fn),h=fn.dot(eo),u=a*c-o*o;if(u===0)return s.set(-2,-1,-1);const f=1/u,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,dn),dn.x>=0&&dn.y>=0&&dn.x+dn.y<=1}static getUV(e,t,n,r,s,a,o,l){return Fr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Fr=!0),this.getInterpolation(e,t,n,r,s,a,o,l)}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,dn),l.setScalar(0),l.addScaledVector(s,dn.x),l.addScaledVector(a,dn.y),l.addScaledVector(o,dn.z),l}static isFrontFacing(e,t,n,r){return kt.subVectors(n,t),fn.subVectors(e,t),kt.cross(fn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kt.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),kt.cross(fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return zt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return Fr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Fr=!0),zt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return zt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;mi.subVectors(r,n),gi.subVectors(s,n),to.subVectors(e,n);const l=mi.dot(to),c=gi.dot(to);if(l<=0&&c<=0)return t.copy(n);no.subVectors(e,r);const h=mi.dot(no),u=gi.dot(no);if(h>=0&&u<=h)return t.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(mi,a);io.subVectors(e,s);const p=mi.dot(io),g=gi.dot(io);if(g>=0&&p<=g)return t.copy(s);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(gi,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return fl.subVectors(s,r),o=(u-h)/(u-h+(p-g)),t.copy(r).addScaledVector(fl,o);const d=1/(m+v+f);return a=v*d,o=f*d,t.copy(n).addScaledVector(mi,a).addScaledVector(gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Xf=0;class qt extends ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=nn(),this.name="",this.type="Material",this.blending=Ui,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Zc,this.blendDst=qc,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=To,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ws,this.stencilZFail=Ws,this.stencilZPass=Ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Cn&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const sh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wt={h:0,s:0,l:0},zr={h:0,s:0,l:0};function ro(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&n===void 0?this.set(e):this.setRGB(e,t,n)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Oe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ht.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ht.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ht.workingColorSpace){if(e=$o(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ro(a,s,e+1/3),this.g=ro(a,s,e),this.b=ro(a,s,e-1/3)}return Ht.toWorkingColorSpace(this,r),this}setStyle(e,t=Oe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Oe){const n=sh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=js(e.r),this.g=js(e.g),this.b=js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Oe){return Ht.fromWorkingColorSpace(St.copy(this),e),Math.round(ht(St.r*255,0,255))*65536+Math.round(ht(St.g*255,0,255))*256+Math.round(ht(St.b*255,0,255))}getHexString(e=Oe){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ht.workingColorSpace){Ht.fromWorkingColorSpace(St.copy(this),t);const n=St.r,r=St.g,s=St.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ht.workingColorSpace){return Ht.fromWorkingColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Oe){Ht.fromWorkingColorSpace(St.copy(this),e);const t=St.r,n=St.g,r=St.b;return e!==Oe?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Wt),Wt.h+=e,Wt.s+=t,Wt.l+=n,this.setHSL(Wt.h,Wt.s,Wt.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Wt),e.getHSL(zr);const n=hr(Wt.h,zr.h,t),r=hr(Wt.s,zr.s,t),s=hr(Wt.l,zr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new De;De.NAMES=sh;class Yt extends qt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ms,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new T,Gr=new ae;class rt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Io,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Io&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class oh extends rt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ah extends rt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class at extends rt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let jf=0;const Bt=new et,so=new ut,vi=new T,Dt=new Rn,er=new Rn,mt=new T;class tt extends ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=nn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(th(e)?ah:oh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,n){return Bt.makeTranslation(e,t,n),this.applyMatrix4(Bt),this}scale(e,t,n){return Bt.makeScale(e,t,n),this.applyMatrix4(Bt),this}lookAt(e){return so.lookAt(e),so.updateMatrix(),this.applyMatrix4(so.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Dt.setFromBufferAttribute(s),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Dt.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Dt.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Dt.min),this.boundingBox.expandByPoint(Dt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){const n=this.boundingSphere.center;if(Dt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];er.setFromBufferAttribute(o),this.morphTargetsRelative?(mt.addVectors(Dt.min,er.min),Dt.expandByPoint(mt),mt.addVectors(Dt.max,er.max),Dt.expandByPoint(mt)):(Dt.expandByPoint(er.min),Dt.expandByPoint(er.max))}Dt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)mt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(mt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)mt.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(e,c),mt.add(vi)),r=Math.max(r,n.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new T,h[E]=new T;const u=new T,f=new T,p=new T,g=new ae,v=new ae,m=new ae,d=new T,M=new T;function _(E,O,V){u.fromArray(r,E*3),f.fromArray(r,O*3),p.fromArray(r,V*3),g.fromArray(a,E*2),v.fromArray(a,O*2),m.fromArray(a,V*2),f.sub(u),p.sub(u),v.sub(g),m.sub(g);const L=1/(v.x*m.y-m.x*v.y);isFinite(L)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-v.y).multiplyScalar(L),M.copy(p).multiplyScalar(v.x).addScaledVector(f,-m.x).multiplyScalar(L),c[E].add(d),c[O].add(d),c[V].add(d),h[E].add(M),h[O].add(M),h[V].add(M))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let E=0,O=y.length;E<O;++E){const V=y[E],L=V.start,N=V.count;for(let G=L,Q=L+N;G<Q;G+=3)_(n[G+0],n[G+1],n[G+2])}const A=new T,C=new T,U=new T,F=new T;function x(E){U.fromArray(s,E*3),F.copy(U);const O=c[E];A.copy(O),A.sub(U.multiplyScalar(U.dot(O))).normalize(),C.crossVectors(F,O);const L=C.dot(h[E])<0?-1:1;l[E*4]=A.x,l[E*4+1]=A.y,l[E*4+2]=A.z,l[E*4+3]=L}for(let E=0,O=y.length;E<O;++E){const V=y[E],L=V.start,N=V.count;for(let G=L,Q=L+N;G<Q;G+=3)x(n[G+0]),x(n[G+1]),x(n[G+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const r=new T,s=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),v=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new rt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new tt,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dl=new et,Qt=new As,Hr=new ti,pl=new T,_i=new T,yi=new T,xi=new T,oo=new T,Vr=new T,kr=new ae,Wr=new ae,Xr=new ae,ml=new T,gl=new T,vl=new T,jr=new T,Yr=new T;class it extends ut{constructor(e=new tt,t=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Vr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(oo.fromBufferAttribute(u,e),a?Vr.addScaledVector(oo,h):Vr.addScaledVector(oo.sub(t),h))}t.add(Vr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(s),Qt.copy(e.ray).recast(e.near),!(Hr.containsPoint(Qt.origin)===!1&&(Qt.intersectSphere(Hr,pl)===null||Qt.origin.distanceToSquared(pl)>(e.far-e.near)**2))&&(dl.copy(s).invert(),Qt.copy(e.ray).applyMatrix4(dl),!(n.boundingBox!==null&&Qt.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t)))}_computeIntersections(e,t){let n;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(s))for(let p=0,g=u.length;p<g;p++){const v=u[p],m=s[v.materialIndex],d=Math.max(v.start,f.start),M=Math.min(a.count,Math.min(v.start+v.count,f.start+f.count));for(let _=d,y=M;_<y;_+=3){const A=a.getX(_),C=a.getX(_+1),U=a.getX(_+2);n=Zr(this,m,e,Qt,l,c,h,A,C,U),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=v.materialIndex,t.push(n))}}else{const p=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let v=p,m=g;v<m;v+=3){const d=a.getX(v),M=a.getX(v+1),_=a.getX(v+2);n=Zr(this,s,e,Qt,l,c,h,d,M,_),n&&(n.faceIndex=Math.floor(v/3),t.push(n))}}else if(o!==void 0)if(Array.isArray(s))for(let p=0,g=u.length;p<g;p++){const v=u[p],m=s[v.materialIndex],d=Math.max(v.start,f.start),M=Math.min(o.count,Math.min(v.start+v.count,f.start+f.count));for(let _=d,y=M;_<y;_+=3){const A=_,C=_+1,U=_+2;n=Zr(this,m,e,Qt,l,c,h,A,C,U),n&&(n.faceIndex=Math.floor(_/3),n.face.materialIndex=v.materialIndex,t.push(n))}}else{const p=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let v=p,m=g;v<m;v+=3){const d=v,M=v+1,_=v+2;n=Zr(this,s,e,Qt,l,c,h,d,M,_),n&&(n.faceIndex=Math.floor(v/3),t.push(n))}}}}function Yf(i,e,t,n,r,s,a,o){let l;if(e.side===Et?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Cn,o),l===null)return null;Yr.copy(o),Yr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Yr);return c<t.near||c>t.far?null:{distance:c,point:Yr.clone(),object:i}}function Zr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,_i),i.getVertexPosition(l,yi),i.getVertexPosition(c,xi);const h=Yf(i,e,t,n,_i,yi,xi,jr);if(h){r&&(kr.fromBufferAttribute(r,o),Wr.fromBufferAttribute(r,l),Xr.fromBufferAttribute(r,c),h.uv=zt.getInterpolation(jr,_i,yi,xi,kr,Wr,Xr,new ae)),s&&(kr.fromBufferAttribute(s,o),Wr.fromBufferAttribute(s,l),Xr.fromBufferAttribute(s,c),h.uv1=zt.getInterpolation(jr,_i,yi,xi,kr,Wr,Xr,new ae),h.uv2=h.uv1),a&&(ml.fromBufferAttribute(a,o),gl.fromBufferAttribute(a,l),vl.fromBufferAttribute(a,c),h.normal=zt.getInterpolation(jr,_i,yi,xi,ml,gl,vl,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new T,materialIndex:0};zt.getNormal(_i,yi,xi,u.normal),h.face=u}return h}class Wi extends tt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(u,2));function g(v,m,d,M,_,y,A,C,U,F,x){const E=y/U,O=A/F,V=y/2,L=A/2,N=C/2,G=U+1,Q=F+1;let z=0,W=0;const K=new T;for(let $=0;$<Q;$++){const ge=$*O-L;for(let pe=0;pe<G;pe++){const X=pe*E-V;K[v]=X*M,K[m]=ge*_,K[d]=N,c.push(K.x,K.y,K.z),K[v]=0,K[m]=0,K[d]=C>0?1:-1,h.push(K.x,K.y,K.z),u.push(pe/U),u.push(1-$/F),z+=1}}for(let $=0;$<F;$++)for(let ge=0;ge<U;ge++){const pe=f+ge+G*$,X=f+ge+G*($+1),ee=f+(ge+1)+G*($+1),ue=f+(ge+1)+G*$;l.push(pe,X,ue),l.push(X,ee,ue),W+=6}o.addGroup(p,W,x),p+=W,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Ct(i){const e={};for(let t=0;t<i.length;t++){const n=Hi(i[t]);for(const r in n)e[r]=n[r]}return e}function Zf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function lh(i){return i.getRenderTarget()===null?i.outputColorSpace:rn}const ta={clone:Hi,merge:Ct};var qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends qt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qf,this.fragmentShader=Jf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Zf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ch extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Nt extends ch{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_r*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(cr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,Mi=1;class Qf extends ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n;const r=new Nt(Si,Mi,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(1,0,0),this.add(r);const s=new Nt(Si,Mi,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const a=new Nt(Si,Mi,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new Nt(Si,Mi,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new Nt(Si,Mi,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Nt(Si,Mi,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[r,s,a,o,l,c]=this.children,h=e.getRenderTarget(),u=e.toneMapping,f=e.xr.enabled;e.toneMapping=vn,e.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,r),e.setRenderTarget(n,1),e.render(t,s),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=p,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=u,e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class hh extends Pt{constructor(e,t,n,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Fi,super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Kf extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(ur("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Wn?Oe:Xn),this.texture=new hh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Wi(5,5,5),s=new xn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Et,blending:Tn});s.uniforms.tEquirect.value=t;const a=new it(r,s),o=t.minFilter;return t.minFilter===gr&&(t.minFilter=Ft),new Qf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const ao=new T,$f=new T,ed=new ke;class Bn{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ao.subVectors(n,t).cross($f.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ao),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ed.getNormalMatrix(e),r=this.coplanarPoint(ao).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const On=new ti,qr=new T;class na{constructor(e=new Bn,t=new Bn,n=new Bn,r=new Bn,s=new Bn,a=new Bn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e){const t=this.planes,n=e.elements,r=n[0],s=n[1],a=n[2],o=n[3],l=n[4],c=n[5],h=n[6],u=n[7],f=n[8],p=n[9],g=n[10],v=n[11],m=n[12],d=n[13],M=n[14],_=n[15];return t[0].setComponents(o-r,u-l,v-f,_-m).normalize(),t[1].setComponents(o+r,u+l,v+f,_+m).normalize(),t[2].setComponents(o+s,u+c,v+p,_+d).normalize(),t[3].setComponents(o-s,u-c,v-p,_-d).normalize(),t[4].setComponents(o-a,u-h,v-g,_-M).normalize(),t[5].setComponents(o+a,u+h,v+g,_+M).normalize(),this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(qr.x=r.normal.x>0?e.max.x:e.min.x,qr.y=r.normal.y>0?e.max.y:e.min.y,qr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uh(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function td(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,h){const u=c.array,f=c.usage,p=i.createBuffer();i.bindBuffer(h,p),i.bufferData(h,u,f),c.onUploadCallback();let g;if(u instanceof Float32Array)g=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=i.SHORT;else if(u instanceof Uint32Array)g=i.UNSIGNED_INT;else if(u instanceof Int32Array)g=i.INT;else if(u instanceof Int8Array)g=i.BYTE;else if(u instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version}}function s(c,h,u){const f=h.array,p=h.updateRange;i.bindBuffer(u,c),p.count===-1?i.bufferSubData(u,0,f):(t?i.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):i.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u===void 0?n.set(c,r(c,h)):u.version<c.version&&(s(u.buffer,c,h),u.version=c.version)}return{get:a,remove:o,update:l}}class jn extends tt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,u=e/o,f=t/l,p=[],g=[],v=[],m=[];for(let d=0;d<h;d++){const M=d*f-a;for(let _=0;_<c;_++){const y=_*u-s;g.push(y,-M,0),v.push(0,0,1),m.push(_/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let M=0;M<o;M++){const _=M+c*d,y=M+c*(d+1),A=M+1+c*(d+1),C=M+1+c*d;p.push(_,y,C),p.push(y,A,C)}this.setIndex(p),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.width,e.height,e.widthSegments,e.heightSegments)}}var nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,id=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,sd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,od=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ad=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ld="vec3 transformed = vec3( position );",cd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ud=`#ifdef USE_IRIDESCENCE
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
		float R21 = R12;
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
#endif`,fd=`#ifdef USE_BUMPMAP
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
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,dd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_d=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,xd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Sd=`#define PI 3.141592653589793
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
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
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
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,Md=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
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
#endif`,Ed=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rd=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pd=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,Ld=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Id=`#ifdef USE_ENVMAP
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
#endif`,Ud=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dd=`#ifdef USE_ENVMAP
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
#endif`,Nd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Od=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zd=`#ifdef USE_GRADIENTMAP
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
}`,Gd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Hd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
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
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
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
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
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
#endif`,Xd=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
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
#endif`,Qd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
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
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
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
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
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
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
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
}`,Kd=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
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
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
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
		getSpotLightInfo( spotLight, geometry, directLight );
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
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
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$d=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ep=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,tp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,np=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,rp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,sp=`#ifdef USE_MAP
	diffuseColor *= texture2D( map, vMapUv );
#endif`,op=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lp=`#if defined( USE_POINTS_UV )
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
#endif`,cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,up=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,dp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
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
vec3 geometryNormal = normal;`,gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
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
#endif`,Sp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ep=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ap=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
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
}`,Tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ip=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return shadow;
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
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
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Op=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gp=`#ifdef USE_SKINNING
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
#endif`,Hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xp=`#ifdef USE_TRANSMISSION
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
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,jp=`#ifdef USE_TRANSMISSION
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
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Yp=`#ifdef USE_UV
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
#endif`,Zp=`#ifdef USE_UV
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
#endif`,qp=`#ifdef USE_UV
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
#endif`,Jp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,em=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,im=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
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
}`,rm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,sm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
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
}`,om=`#define DISTANCE
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
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,cm=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,um=`#include <common>
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
	#include <morphcolor_vertex>
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
}`,fm=`uniform vec3 diffuse;
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
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
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
}`,pm=`#define LAMBERT
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
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
	#include <morphcolor_vertex>
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
}`,gm=`#define MATCAP
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
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_m=`#define NORMAL
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
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ym=`#define PHONG
varying vec3 vViewPosition;
#include <common>
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
}`,xm=`#define PHONG
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
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
	#include <morphcolor_vertex>
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
}`,Mm=`#define STANDARD
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
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
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
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`#define TOON
varying vec3 vViewPosition;
#include <common>
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
	#include <morphcolor_vertex>
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
}`,Am=`#define TOON
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bm=`uniform float size;
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
}`,wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tm=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
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
}`,Cm=`uniform vec3 color;
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
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Rm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Fe={alphamap_fragment:nd,alphamap_pars_fragment:id,alphatest_fragment:rd,alphatest_pars_fragment:sd,aomap_fragment:od,aomap_pars_fragment:ad,begin_vertex:ld,beginnormal_vertex:cd,bsdfs:hd,iridescence_fragment:ud,bumpmap_pars_fragment:fd,clipping_planes_fragment:dd,clipping_planes_pars_fragment:pd,clipping_planes_pars_vertex:md,clipping_planes_vertex:gd,color_fragment:vd,color_pars_fragment:_d,color_pars_vertex:yd,color_vertex:xd,common:Sd,cube_uv_reflection_fragment:Md,defaultnormal_vertex:Ed,displacementmap_pars_vertex:Ad,displacementmap_vertex:bd,emissivemap_fragment:wd,emissivemap_pars_fragment:Td,encodings_fragment:Cd,encodings_pars_fragment:Rd,envmap_fragment:Pd,envmap_common_pars_fragment:Ld,envmap_pars_fragment:Id,envmap_pars_vertex:Ud,envmap_physical_pars_fragment:Xd,envmap_vertex:Dd,fog_vertex:Nd,fog_pars_vertex:Od,fog_fragment:Bd,fog_pars_fragment:Fd,gradientmap_pars_fragment:zd,lightmap_fragment:Gd,lightmap_pars_fragment:Hd,lights_lambert_fragment:Vd,lights_lambert_pars_fragment:kd,lights_pars_begin:Wd,lights_toon_fragment:jd,lights_toon_pars_fragment:Yd,lights_phong_fragment:Zd,lights_phong_pars_fragment:qd,lights_physical_fragment:Jd,lights_physical_pars_fragment:Qd,lights_fragment_begin:Kd,lights_fragment_maps:$d,lights_fragment_end:ep,logdepthbuf_fragment:tp,logdepthbuf_pars_fragment:np,logdepthbuf_pars_vertex:ip,logdepthbuf_vertex:rp,map_fragment:sp,map_pars_fragment:op,map_particle_fragment:ap,map_particle_pars_fragment:lp,metalnessmap_fragment:cp,metalnessmap_pars_fragment:hp,morphcolor_vertex:up,morphnormal_vertex:fp,morphtarget_pars_vertex:dp,morphtarget_vertex:pp,normal_fragment_begin:mp,normal_fragment_maps:gp,normal_pars_fragment:vp,normal_pars_vertex:_p,normal_vertex:yp,normalmap_pars_fragment:xp,clearcoat_normal_fragment_begin:Sp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:Ep,iridescence_pars_fragment:Ap,output_fragment:bp,packing:wp,premultiplied_alpha_fragment:Tp,project_vertex:Cp,dithering_fragment:Rp,dithering_pars_fragment:Pp,roughnessmap_fragment:Lp,roughnessmap_pars_fragment:Ip,shadowmap_pars_fragment:Up,shadowmap_pars_vertex:Dp,shadowmap_vertex:Np,shadowmask_pars_fragment:Op,skinbase_vertex:Bp,skinning_pars_vertex:Fp,skinning_vertex:zp,skinnormal_vertex:Gp,specularmap_fragment:Hp,specularmap_pars_fragment:Vp,tonemapping_fragment:kp,tonemapping_pars_fragment:Wp,transmission_fragment:Xp,transmission_pars_fragment:jp,uv_pars_fragment:Yp,uv_pars_vertex:Zp,uv_vertex:qp,worldpos_vertex:Jp,background_vert:Qp,background_frag:Kp,backgroundCube_vert:$p,backgroundCube_frag:em,cube_vert:tm,cube_frag:nm,depth_vert:im,depth_frag:rm,distanceRGBA_vert:sm,distanceRGBA_frag:om,equirect_vert:am,equirect_frag:lm,linedashed_vert:cm,linedashed_frag:hm,meshbasic_vert:um,meshbasic_frag:fm,meshlambert_vert:dm,meshlambert_frag:pm,meshmatcap_vert:mm,meshmatcap_frag:gm,meshnormal_vert:vm,meshnormal_frag:_m,meshphong_vert:ym,meshphong_frag:xm,meshphysical_vert:Sm,meshphysical_frag:Mm,meshtoon_vert:Em,meshtoon_frag:Am,points_vert:bm,points_frag:wm,shadow_vert:Tm,shadow_frag:Cm,sprite_vert:Rm,sprite_frag:Pm},he={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaTest:{value:0}}},Lt={basic:{uniforms:Ct([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:Ct([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new De(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:Ct([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:Ct([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:Ct([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new De(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:Ct([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:Ct([he.points,he.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:Ct([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:Ct([he.common,he.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:Ct([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:Ct([he.sprite,he.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:Ct([he.common,he.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:Ct([he.lights,he.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};Lt.physical={uniforms:Ct([Lt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Jr={r:0,b:0,g:0};function Lm(i,e,t,n,r,s,a){const o=new De(0);let l=s===!0?0:1,c,h,u=null,f=0,p=null;function g(m,d){let M=!1,_=d.isScene===!0?d.background:null;switch(_&&_.isTexture&&(_=(d.backgroundBlurriness>0?t:e).get(_)),_===null?v(o,l):_&&_.isColor&&(v(_,1),M=!0),i.xr.getEnvironmentBlendMode()){case"opaque":M=!0;break;case"additive":n.buffers.color.setClear(0,0,0,1,a),M=!0;break;case"alpha-blend":n.buffers.color.setClear(0,0,0,0,a),M=!0;break}(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Es)?(h===void 0&&(h=new it(new Wi(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:Hi(Lt.backgroundCube.uniforms),vertexShader:Lt.backgroundCube.vertexShader,fragmentShader:Lt.backgroundCube.fragmentShader,side:Et,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,U,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=_.colorSpace!==Oe,(u!==_||f!==_.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,f=_.version,p=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new it(new jn(2,2),new xn({name:"BackgroundMaterial",uniforms:Hi(Lt.background.uniforms),vertexShader:Lt.background.vertexShader,fragmentShader:Lt.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=_.colorSpace!==Oe,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,p=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,d){m.getRGB(Jr,lh(i)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:g}}function Im(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null);let c=l,h=!1;function u(N,G,Q,z,W){let K=!1;if(a){const $=v(z,Q,G);c!==$&&(c=$,p(c.object)),K=d(N,z,Q,W),K&&M(N,z,Q,W)}else{const $=G.wireframe===!0;(c.geometry!==z.id||c.program!==Q.id||c.wireframe!==$)&&(c.geometry=z.id,c.program=Q.id,c.wireframe=$,K=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(K||h)&&(h=!1,F(N,G,Q,z),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function p(N){return n.isWebGL2?i.bindVertexArray(N):s.bindVertexArrayOES(N)}function g(N){return n.isWebGL2?i.deleteVertexArray(N):s.deleteVertexArrayOES(N)}function v(N,G,Q){const z=Q.wireframe===!0;let W=o[N.id];W===void 0&&(W={},o[N.id]=W);let K=W[G.id];K===void 0&&(K={},W[G.id]=K);let $=K[z];return $===void 0&&($=m(f()),K[z]=$),$}function m(N){const G=[],Q=[],z=[];for(let W=0;W<r;W++)G[W]=0,Q[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:Q,attributeDivisors:z,object:N,attributes:{},index:null}}function d(N,G,Q,z){const W=c.attributes,K=G.attributes;let $=0;const ge=Q.getAttributes();for(const pe in ge)if(ge[pe].location>=0){const ee=W[pe];let ue=K[pe];if(ue===void 0&&(pe==="instanceMatrix"&&N.instanceMatrix&&(ue=N.instanceMatrix),pe==="instanceColor"&&N.instanceColor&&(ue=N.instanceColor)),ee===void 0||ee.attribute!==ue||ue&&ee.data!==ue.data)return!0;$++}return c.attributesNum!==$||c.index!==z}function M(N,G,Q,z){const W={},K=G.attributes;let $=0;const ge=Q.getAttributes();for(const pe in ge)if(ge[pe].location>=0){let ee=K[pe];ee===void 0&&(pe==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),pe==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor));const ue={};ue.attribute=ee,ee&&ee.data&&(ue.data=ee.data),W[pe]=ue,$++}c.attributes=W,c.attributesNum=$,c.index=z}function _(){const N=c.newAttributes;for(let G=0,Q=N.length;G<Q;G++)N[G]=0}function y(N){A(N,0)}function A(N,G){const Q=c.newAttributes,z=c.enabledAttributes,W=c.attributeDivisors;Q[N]=1,z[N]===0&&(i.enableVertexAttribArray(N),z[N]=1),W[N]!==G&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,G),W[N]=G)}function C(){const N=c.newAttributes,G=c.enabledAttributes;for(let Q=0,z=G.length;Q<z;Q++)G[Q]!==N[Q]&&(i.disableVertexAttribArray(Q),G[Q]=0)}function U(N,G,Q,z,W,K){n.isWebGL2===!0&&(Q===i.INT||Q===i.UNSIGNED_INT)?i.vertexAttribIPointer(N,G,Q,W,K):i.vertexAttribPointer(N,G,Q,z,W,K)}function F(N,G,Q,z){if(n.isWebGL2===!1&&(N.isInstancedMesh||z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const W=z.attributes,K=Q.getAttributes(),$=G.defaultAttributeValues;for(const ge in K){const pe=K[ge];if(pe.location>=0){let X=W[ge];if(X===void 0&&(ge==="instanceMatrix"&&N.instanceMatrix&&(X=N.instanceMatrix),ge==="instanceColor"&&N.instanceColor&&(X=N.instanceColor)),X!==void 0){const ee=X.normalized,ue=X.itemSize,me=t.get(X);if(me===void 0)continue;const P=me.buffer,Re=me.type,Pe=me.bytesPerElement;if(X.isInterleavedBufferAttribute){const le=X.data,Se=le.stride,ne=X.offset;if(le.isInstancedInterleavedBuffer){for(let Z=0;Z<pe.locationSize;Z++)A(pe.location+Z,le.meshPerAttribute);N.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Z=0;Z<pe.locationSize;Z++)y(pe.location+Z);i.bindBuffer(i.ARRAY_BUFFER,P);for(let Z=0;Z<pe.locationSize;Z++)U(pe.location+Z,ue/pe.locationSize,Re,ee,Se*Pe,(ne+ue/pe.locationSize*Z)*Pe)}else{if(X.isInstancedBufferAttribute){for(let le=0;le<pe.locationSize;le++)A(pe.location+le,X.meshPerAttribute);N.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let le=0;le<pe.locationSize;le++)y(pe.location+le);i.bindBuffer(i.ARRAY_BUFFER,P);for(let le=0;le<pe.locationSize;le++)U(pe.location+le,ue/pe.locationSize,Re,ee,ue*Pe,ue/pe.locationSize*le*Pe)}}else if($!==void 0){const ee=$[ge];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(pe.location,ee);break;case 3:i.vertexAttrib3fv(pe.location,ee);break;case 4:i.vertexAttrib4fv(pe.location,ee);break;default:i.vertexAttrib1fv(pe.location,ee)}}}}C()}function x(){V();for(const N in o){const G=o[N];for(const Q in G){const z=G[Q];for(const W in z)g(z[W].object),delete z[W];delete G[Q]}delete o[N]}}function E(N){if(o[N.id]===void 0)return;const G=o[N.id];for(const Q in G){const z=G[Q];for(const W in z)g(z[W].object),delete z[W];delete G[Q]}delete o[N.id]}function O(N){for(const G in o){const Q=o[G];if(Q[N.id]===void 0)continue;const z=Q[N.id];for(const W in z)g(z[W].object),delete z[W];delete Q[N.id]}}function V(){L(),h=!0,c!==l&&(c=l,p(c.object))}function L(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:V,resetDefaultState:L,dispose:x,releaseStatesOfGeometry:E,releaseStatesOfProgram:O,initAttributes:_,enableAttribute:y,disableUnusedAttributes:C}}function Um(i,e,t,n){const r=n.isWebGL2;let s;function a(c){s=c}function o(c,h){i.drawArrays(s,c,h),t.update(h,s,1)}function l(c,h,u){if(u===0)return;let f,p;if(r)f=i,p="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](s,c,h,u),t.update(h,s,u)}this.setMode=a,this.render=o,this.renderInstances=l}function Dm(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,y=a||e.has("OES_texture_float"),A=_&&y,C=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:M,vertexTextures:_,floatFragmentTextures:y,floatVertexTextures:A,maxSamples:C}}function Nm(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Bn,o=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||r;return r=f,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const M=s?0:n,_=M*4;let y=d.clippingState||null;l.value=y,y=h(g,f,_,p);for(let A=0;A!==_;++A)y[A]=t[A];d.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,p,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const d=p+v*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let _=0,y=p;_!==v;++_,y+=4)a.copy(u[_]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Om(i){let e=new WeakMap;function t(a,o){return o===Co?a.mapping=Fi:o===Ro&&(a.mapping=zi),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Co||o===Ro)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Kf(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ia extends ch{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Pi=4,_l=[.125,.215,.35,.446,.526,.582],Gn=20,lo=new ia,yl=new De;let co=null;const Fn=(1+Math.sqrt(5))/2,Ei=1/Fn,xl=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,Fn,Ei),new T(0,Fn,-Ei),new T(Ei,0,Fn),new T(-Ei,0,Fn),new T(Fn,Ei,0),new T(-Fn,Ei,0)];class Sl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){co=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=El(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(co),e.scissorTest=!1,Qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),co=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:vr,format:jt,colorSpace:rn,depthBuffer:!1},r=Ml(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ml(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bm(s)),this._blurMaterial=Fm(s,e,t)}return r}_compileMaterial(e){const t=new it(this._lodPlanes[0],e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,n,r){const o=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(yl),h.toneMapping=vn,h.autoClear=!1;const p=new Yt({name:"PMREM.Background",side:Et,depthWrite:!1,depthTest:!1}),g=new it(new Wi,p);let v=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(yl),v=!0);for(let d=0;d<6;d++){const M=d%3;M===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):M===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const _=this._cubeSize;Qr(r,M*_,d>2?_:0,_,_),h.setRenderTarget(r),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Fi||e.mapping===zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Al()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=El());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new it(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Qr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,lo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=xl[(r-1)%xl.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new it(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Gn-1),v=s/g,m=isFinite(s)?1+Math.floor(h*v):Gn;m>Gn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gn}`);const d=[];let M=0;for(let U=0;U<Gn;++U){const F=U/v,x=Math.exp(-F*F/2);d.push(x),U===0?M+=x:U<m&&(M+=2*x)}for(let U=0;U<d.length;U++)d[U]=d[U]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-n;const y=this._sizeLods[r],A=3*y*(r>_-Pi?r-_+Pi:0),C=4*(this._cubeSize-y);Qr(t,A,C,3*y,2*y),l.setRenderTarget(t),l.render(u,lo)}}function Bm(i){const e=[],t=[],n=[];let r=i;const s=i-Pi+1+_l.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Pi?l=_l[a-i+Pi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,m=2,d=1,M=new Float32Array(v*g*p),_=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let C=0;C<p;C++){const U=C%3*2/3-1,F=C>2?0:-1,x=[U,F,0,U+2/3,F,0,U+2/3,F+1,0,U,F,0,U+2/3,F+1,0,U,F+1,0];M.set(x,v*g*C),_.set(f,m*g*C);const E=[C,C,C,C,C,C];y.set(E,d*g*C)}const A=new tt;A.setAttribute("position",new rt(M,v)),A.setAttribute("uv",new rt(_,m)),A.setAttribute("faceIndex",new rt(y,d)),e.push(A),r>Pi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ml(i,e,t){const n=new qn(i,e,t);return n.texture.mapping=Es,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Fm(i,e,t){const n=new Float32Array(Gn),r=new T(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ra(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function El(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ra(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Al(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function ra(){return`

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
	`}function zm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Co||l===Ro,h=l===Fi||l===zi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Sl(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&r(u)){t===null&&(t=new Sl(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Gm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Hm(i,e,t,n){const r={},s=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const v=p[g];for(let m=0,d=v.length;m<d;m++)e.update(v[m],i.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let v=0;if(p!==null){const M=p.array;v=p.version;for(let _=0,y=M.length;_<y;_+=3){const A=M[_+0],C=M[_+1],U=M[_+2];f.push(A,C,C,U,U,A)}}else{const M=g.array;v=g.version;for(let _=0,y=M.length/3-1;_<y;_+=3){const A=_+0,C=_+1,U=_+2;f.push(A,C,C,U,U,A)}}const m=new(th(f)?ah:oh)(f,1);m.version=v;const d=s.get(u);d&&e.remove(d),s.set(u,m)}function h(u){const f=s.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Vm(i,e,t,n){const r=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,p){i.drawElements(s,p,o,f*l),t.update(p,s,1)}function u(f,p,g){if(g===0)return;let v,m;if(r)v=i,m="drawElementsInstanced";else if(v=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[m](s,p,o,f*l,g),t.update(p,s,g)}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u}function km(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Wm(i,e){return i[0]-e[0]}function Xm(i,e){return Math.abs(e[1])-Math.abs(i[1])}function jm(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new Ye,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=p!==void 0?p.length:0;let v=s.get(h);if(v===void 0||v.count!==g){let M=function(){L.dispose(),s.delete(h),h.removeEventListener("dispose",M)};v!==void 0&&v.texture.dispose();const _=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],U=h.morphAttributes.normal||[],F=h.morphAttributes.color||[];let x=0;_===!0&&(x=1),y===!0&&(x=2),A===!0&&(x=3);let E=h.attributes.position.count*x,O=1;E>e.maxTextureSize&&(O=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const V=new Float32Array(E*O*4*g),L=new rh(V,E,O,g);L.type=Vn,L.needsUpdate=!0;const N=x*4;for(let G=0;G<g;G++){const Q=C[G],z=U[G],W=F[G],K=E*O*4*G;for(let $=0;$<Q.count;$++){const ge=$*N;_===!0&&(a.fromBufferAttribute(Q,$),V[K+ge+0]=a.x,V[K+ge+1]=a.y,V[K+ge+2]=a.z,V[K+ge+3]=0),y===!0&&(a.fromBufferAttribute(z,$),V[K+ge+4]=a.x,V[K+ge+5]=a.y,V[K+ge+6]=a.z,V[K+ge+7]=0),A===!0&&(a.fromBufferAttribute(W,$),V[K+ge+8]=a.x,V[K+ge+9]=a.y,V[K+ge+10]=a.z,V[K+ge+11]=W.itemSize===4?a.w:1)}}v={count:g,texture:L,size:new ae(E,O)},s.set(h,v),h.addEventListener("dispose",M)}let m=0;for(let M=0;M<f.length;M++)m+=f[M];const d=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",d),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",v.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}else{const p=f===void 0?0:f.length;let g=n[h.id];if(g===void 0||g.length!==p){g=[];for(let _=0;_<p;_++)g[_]=[_,0];n[h.id]=g}for(let _=0;_<p;_++){const y=g[_];y[0]=_,y[1]=f[_]}g.sort(Xm);for(let _=0;_<8;_++)_<p&&g[_][1]?(o[_][0]=g[_][0],o[_][1]=g[_][1]):(o[_][0]=Number.MAX_SAFE_INTEGER,o[_][1]=0);o.sort(Wm);const v=h.morphAttributes.position,m=h.morphAttributes.normal;let d=0;for(let _=0;_<8;_++){const y=o[_],A=y[0],C=y[1];A!==Number.MAX_SAFE_INTEGER&&C?(v&&h.getAttribute("morphTarget"+_)!==v[A]&&h.setAttribute("morphTarget"+_,v[A]),m&&h.getAttribute("morphNormal"+_)!==m[A]&&h.setAttribute("morphNormal"+_,m[A]),r[_]=C,d+=C):(v&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),m&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),r[_]=0)}const M=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",M),u.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Ym(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);return r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER)),u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const fh=new Pt,dh=new rh,ph=new Bf,mh=new hh,bl=[],wl=[],Tl=new Float32Array(16),Cl=new Float32Array(9),Rl=new Float32Array(4);function Xi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=bl[r];if(s===void 0&&(s=new Float32Array(r),bl[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ws(i,e){let t=wl[e];t===void 0&&(t=new Int32Array(e),wl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Zm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2fv(this.addr,e),dt(t,e)}}function Jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;i.uniform3fv(this.addr,e),dt(t,e)}}function Qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4fv(this.addr,e),dt(t,e)}}function Km(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),dt(t,e)}else{if(ft(t,n))return;Rl.set(n),i.uniformMatrix2fv(this.addr,!1,Rl),dt(t,n)}}function $m(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),dt(t,e)}else{if(ft(t,n))return;Cl.set(n),i.uniformMatrix3fv(this.addr,!1,Cl),dt(t,n)}}function eg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),dt(t,e)}else{if(ft(t,n))return;Tl.set(n),i.uniformMatrix4fv(this.addr,!1,Tl),dt(t,n)}}function tg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function ng(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2iv(this.addr,e),dt(t,e)}}function ig(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3iv(this.addr,e),dt(t,e)}}function rg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4iv(this.addr,e),dt(t,e)}}function sg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2uiv(this.addr,e),dt(t,e)}}function ag(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3uiv(this.addr,e),dt(t,e)}}function lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4uiv(this.addr,e),dt(t,e)}}function cg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2D(e||fh,r)}function hg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ph,r)}function ug(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||mh,r)}function fg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||dh,r)}function dg(i){switch(i){case 5126:return Zm;case 35664:return qm;case 35665:return Jm;case 35666:return Qm;case 35674:return Km;case 35675:return $m;case 35676:return eg;case 5124:case 35670:return tg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return rg;case 5125:return sg;case 36294:return og;case 36295:return ag;case 36296:return lg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return hg;case 35680:case 36300:case 36308:case 36293:return ug;case 36289:case 36303:case 36311:case 36292:return fg}}function pg(i,e){i.uniform1fv(this.addr,e)}function mg(i,e){const t=Xi(e,this.size,2);i.uniform2fv(this.addr,t)}function gg(i,e){const t=Xi(e,this.size,3);i.uniform3fv(this.addr,t)}function vg(i,e){const t=Xi(e,this.size,4);i.uniform4fv(this.addr,t)}function _g(i,e){const t=Xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yg(i,e){const t=Xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xg(i,e){const t=Xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Sg(i,e){i.uniform1iv(this.addr,e)}function Mg(i,e){i.uniform2iv(this.addr,e)}function Eg(i,e){i.uniform3iv(this.addr,e)}function Ag(i,e){i.uniform4iv(this.addr,e)}function bg(i,e){i.uniform1uiv(this.addr,e)}function wg(i,e){i.uniform2uiv(this.addr,e)}function Tg(i,e){i.uniform3uiv(this.addr,e)}function Cg(i,e){i.uniform4uiv(this.addr,e)}function Rg(i,e,t){const n=this.cache,r=e.length,s=ws(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),dt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||fh,s[a])}function Pg(i,e,t){const n=this.cache,r=e.length,s=ws(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),dt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||ph,s[a])}function Lg(i,e,t){const n=this.cache,r=e.length,s=ws(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),dt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||mh,s[a])}function Ig(i,e,t){const n=this.cache,r=e.length,s=ws(t,r);ft(n,s)||(i.uniform1iv(this.addr,s),dt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||dh,s[a])}function Ug(i){switch(i){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return vg;case 35674:return _g;case 35675:return yg;case 35676:return xg;case 5124:case 35670:return Sg;case 35667:case 35671:return Mg;case 35668:case 35672:return Eg;case 35669:case 35673:return Ag;case 5125:return bg;case 36294:return wg;case 36295:return Tg;case 36296:return Cg;case 35678:case 36198:case 36298:case 36306:case 35682:return Rg;case 35679:case 36299:case 36307:return Pg;case 35680:case 36300:case 36308:case 36293:return Lg;case 36289:case 36303:case 36311:case 36292:return Ig}}class Dg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=dg(t.type)}}class Ng{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=Ug(t.type)}}class Og{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ho=/(\w+)(\])?(\[|\.)?/g;function Pl(i,e){i.seq.push(e),i.map[e.id]=e}function Bg(i,e,t){const n=i.name,r=n.length;for(ho.lastIndex=0;;){const s=ho.exec(n),a=ho.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Pl(t,c===void 0?new Dg(o,i,e):new Ng(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new Og(o),Pl(t,u)),t=u}}}class ms{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Bg(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Ll(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}let Fg=0;function zg(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Gg(i){switch(i){case rn:return["Linear","( value )"];case Oe:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),["Linear","( value )"]}}function Il(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+zg(i.getShaderSource(e),a)}else return r}function Hg(i,e){const t=Gg(e);return"vec4 "+i+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function Vg(i,e){let t;switch(e){case ku:t="Linear";break;case Wu:t="Reinhard";break;case Xu:t="OptimizedCineon";break;case ju:t="ACESFilmic";break;case Yu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function kg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ar).join(`
`)}function Wg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ar(i){return i!==""}function Ul(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(i){return i.replace(jg,Yg)}function Yg(i,e){const t=Fe[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return No(t)}const Zg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nl(i){return i.replace(Zg,qg)}function qg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ol(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Jg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Yc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Su?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===pn&&(e="SHADOWMAP_TYPE_VSM"),e}function Qg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fi:case zi:e="ENVMAP_TYPE_CUBE";break;case Es:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Kg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zi:e="ENVMAP_MODE_REFRACTION";break}return e}function $g(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ms:e="ENVMAP_BLENDING_MULTIPLY";break;case Hu:e="ENVMAP_BLENDING_MIX";break;case Vu:e="ENVMAP_BLENDING_ADD";break}return e}function ev(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tv(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Jg(t),c=Qg(t),h=Kg(t),u=$g(t),f=ev(t),p=t.isWebGL2?"":kg(t),g=Wg(s),v=r.createProgram();let m,d,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=[g].filter(ar).join(`
`),m.length>0&&(m+=`
`),d=[p,g].filter(ar).join(`
`),d.length>0&&(d+=`
`)):(m=[Ol(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),d=[p,Ol(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==vn?Vg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.encodings_pars_fragment,Hg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ar).join(`
`)),a=No(a),a=Ul(a,t),a=Dl(a,t),o=No(o),o=Ul(o,t),o=Dl(o,t),a=Nl(a),o=Nl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const _=M+m+a,y=M+d+o,A=Ll(r,r.VERTEX_SHADER,_),C=Ll(r,r.FRAGMENT_SHADER,y);if(r.attachShader(v,A),r.attachShader(v,C),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),i.debug.checkShaderErrors){const x=r.getProgramInfoLog(v).trim(),E=r.getShaderInfoLog(A).trim(),O=r.getShaderInfoLog(C).trim();let V=!0,L=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,A,C);else{const N=Il(r,A,"vertex"),G=Il(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Program Info Log: `+x+`
`+N+`
`+G)}else x!==""?console.warn("THREE.WebGLProgram: Program Info Log:",x):(E===""||O==="")&&(L=!1);L&&(this.diagnostics={runnable:V,programLog:x,vertexShader:{log:E,prefix:m},fragmentShader:{log:O,prefix:d}})}r.deleteShader(A),r.deleteShader(C);let U;this.getUniforms=function(){return U===void 0&&(U=new ms(r,v)),U};let F;return this.getAttributes=function(){return F===void 0&&(F=Xg(r,v)),F},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.name=t.shaderName,this.id=Fg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let nv=0;class iv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new rv(e),t.set(e,n)),n}}class rv{constructor(e){this.id=nv++,this.code=e,this.usedTimes=0}}function sv(i,e,t,n,r,s,a){const o=new ea,l=new iv,c=[],h=r.isWebGL2,u=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return x===1?"uv1":x===2?"uv2":x===3?"uv3":"uv"}function m(x,E,O,V,L){const N=V.fog,G=L.geometry,Q=x.isMeshStandardMaterial?V.environment:null,z=(x.isMeshStandardMaterial?t:e).get(x.envMap||Q),W=z&&z.mapping===Es?z.image.height:null,K=g[x.type];x.precision!==null&&(p=r.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const $=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ge=$!==void 0?$.length:0;let pe=0;G.morphAttributes.position!==void 0&&(pe=1),G.morphAttributes.normal!==void 0&&(pe=2),G.morphAttributes.color!==void 0&&(pe=3);let X,ee,ue,me;if(K){const Ze=Lt[K];X=Ze.vertexShader,ee=Ze.fragmentShader}else X=x.vertexShader,ee=x.fragmentShader,l.update(x),ue=l.getVertexShaderID(x),me=l.getFragmentShaderID(x);const P=i.getRenderTarget(),Re=L.isInstancedMesh===!0,Pe=!!x.map,le=!!x.matcap,Se=!!z,ne=!!x.aoMap,Z=!!x.lightMap,te=!!x.bumpMap,_e=!!x.normalMap,ce=!!x.displacementMap,Te=!!x.emissiveMap,Ce=!!x.metalnessMap,be=!!x.roughnessMap,Ne=x.clearcoat>0,We=x.iridescence>0,w=x.sheen>0,S=x.transmission>0,k=Ne&&!!x.clearcoatMap,re=Ne&&!!x.clearcoatNormalMap,se=Ne&&!!x.clearcoatRoughnessMap,fe=We&&!!x.iridescenceMap,R=We&&!!x.iridescenceThicknessMap,J=w&&!!x.sheenColorMap,H=w&&!!x.sheenRoughnessMap,de=!!x.specularMap,xe=!!x.specularColorMap,Ee=!!x.specularIntensityMap,ve=S&&!!x.transmissionMap,Me=S&&!!x.thicknessMap,Ie=!!x.gradientMap,ze=!!x.alphaMap,st=x.alphaTest>0,I=!!x.extensions,j=!!G.attributes.uv1,oe=!!G.attributes.uv2,ye=!!G.attributes.uv3;return{isWebGL2:h,shaderID:K,shaderName:x.type,vertexShader:X,fragmentShader:ee,defines:x.defines,customVertexShaderID:ue,customFragmentShaderID:me,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,instancing:Re,instancingColor:Re&&L.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:P===null?i.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:rn,map:Pe,matcap:le,envMap:Se,envMapMode:Se&&z.mapping,envMapCubeUVHeight:W,aoMap:ne,lightMap:Z,bumpMap:te,normalMap:_e,displacementMap:f&&ce,emissiveMap:Te,normalMapObjectSpace:_e&&x.normalMapType===df,normalMapTangentSpace:_e&&x.normalMapType===Tr,metalnessMap:Ce,roughnessMap:be,clearcoat:Ne,clearcoatMap:k,clearcoatNormalMap:re,clearcoatRoughnessMap:se,iridescence:We,iridescenceMap:fe,iridescenceThicknessMap:R,sheen:w,sheenColorMap:J,sheenRoughnessMap:H,specularMap:de,specularColorMap:xe,specularIntensityMap:Ee,transmission:S,transmissionMap:ve,thicknessMap:Me,gradientMap:Ie,opaque:x.transparent===!1&&x.blending===Ui,alphaMap:ze,alphaTest:st,combine:x.combine,mapUv:Pe&&v(x.map.channel),aoMapUv:ne&&v(x.aoMap.channel),lightMapUv:Z&&v(x.lightMap.channel),bumpMapUv:te&&v(x.bumpMap.channel),normalMapUv:_e&&v(x.normalMap.channel),displacementMapUv:ce&&v(x.displacementMap.channel),emissiveMapUv:Te&&v(x.emissiveMap.channel),metalnessMapUv:Ce&&v(x.metalnessMap.channel),roughnessMapUv:be&&v(x.roughnessMap.channel),clearcoatMapUv:k&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:re&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:R&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:J&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:H&&v(x.sheenRoughnessMap.channel),specularMapUv:de&&v(x.specularMap.channel),specularColorMapUv:xe&&v(x.specularColorMap.channel),specularIntensityMapUv:Ee&&v(x.specularIntensityMap.channel),transmissionMapUv:ve&&v(x.transmissionMap.channel),thicknessMapUv:Me&&v(x.thicknessMap.channel),alphaMapUv:ze&&v(x.alphaMap.channel),vertexTangents:_e&&!!G.attributes.tangent,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,vertexUv1s:j,vertexUv2s:oe,vertexUv3s:ye,pointsUvs:L.isPoints===!0&&!!G.attributes.uv&&(Pe||ze),fog:!!N,useFog:x.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:L.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:pe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:x.toneMapped?i.toneMapping:vn,useLegacyLights:i.useLegacyLights,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===mn,flipSided:x.side===Et,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:I&&x.extensions.derivatives===!0,extensionFragDepth:I&&x.extensions.fragDepth===!0,extensionDrawBuffers:I&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:I&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function d(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const O in x.defines)E.push(O),E.push(x.defines[O]);return x.isRawShaderMaterial===!1&&(M(E,x),_(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function M(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function _(x,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),x.push(o.mask)}function y(x){const E=g[x.type];let O;if(E){const V=Lt[E];O=ta.clone(V.uniforms)}else O=x.uniforms;return O}function A(x,E){let O;for(let V=0,L=c.length;V<L;V++){const N=c[V];if(N.cacheKey===E){O=N,++O.usedTimes;break}}return O===void 0&&(O=new tv(i,E,x,s),c.push(O)),O}function C(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),x.destroy()}}function U(x){l.remove(x)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:A,releaseProgram:C,releaseShaderCache:U,programs:c,dispose:F}}function ov(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function av(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Bl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u,f,p,g,v,m){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=v,d.group=m),e++,d}function o(u,f,p,g,v,m){const d=a(u,f,p,g,v,m);p.transmission>0?n.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(u,f,p,g,v,m){const d=a(u,f,p,g,v,m);p.transmission>0?n.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(u,f){t.length>1&&t.sort(u||av),n.length>1&&n.sort(f||Bl),r.length>1&&r.sort(f||Bl)}function h(){for(let u=e,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function lv(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Fl,i.set(n,[a])):r>=s.length?(a=new Fl,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function cv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new De};break;case"SpotLight":t={position:new T,direction:new T,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new T,halfWidth:new T,halfHeight:new T};break}return i[e.id]=t,t}}}function hv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let uv=0;function fv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function dv(i,e){const t=new cv,n=hv(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)r.probe.push(new T);const s=new T,a=new et,o=new et;function l(h,u){let f=0,p=0,g=0;for(let O=0;O<9;O++)r.probe[O].set(0,0,0);let v=0,m=0,d=0,M=0,_=0,y=0,A=0,C=0,U=0,F=0;h.sort(fv);const x=u===!0?Math.PI:1;for(let O=0,V=h.length;O<V;O++){const L=h[O],N=L.color,G=L.intensity,Q=L.distance,z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=N.r*G*x,p+=N.g*G*x,g+=N.b*G*x;else if(L.isLightProbe)for(let W=0;W<9;W++)r.probe[W].addScaledVector(L.sh.coefficients[W],G);else if(L.isDirectionalLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*x),L.castShadow){const K=L.shadow,$=n.get(L);$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,r.directionalShadow[v]=$,r.directionalShadowMap[v]=z,r.directionalShadowMatrix[v]=L.shadow.matrix,y++}r.directional[v]=W,v++}else if(L.isSpotLight){const W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(N).multiplyScalar(G*x),W.distance=Q,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,r.spot[d]=W;const K=L.shadow;if(L.map&&(r.spotLightMap[U]=L.map,U++,K.updateMatrices(L),L.castShadow&&F++),r.spotLightMatrix[d]=K.matrix,L.castShadow){const $=n.get(L);$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,r.spotShadow[d]=$,r.spotShadowMap[d]=z,C++}d++}else if(L.isRectAreaLight){const W=t.get(L);W.color.copy(N).multiplyScalar(G),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),r.rectArea[M]=W,M++}else if(L.isPointLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*x),W.distance=L.distance,W.decay=L.decay,L.castShadow){const K=L.shadow,$=n.get(L);$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,$.shadowCameraNear=K.camera.near,$.shadowCameraFar=K.camera.far,r.pointShadow[m]=$,r.pointShadowMap[m]=z,r.pointShadowMatrix[m]=L.shadow.matrix,A++}r.point[m]=W,m++}else if(L.isHemisphereLight){const W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(G*x),W.groundColor.copy(L.groundColor).multiplyScalar(G*x),r.hemi[_]=W,_++}}M>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=he.LTC_FLOAT_1,r.rectAreaLTC2=he.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=he.LTC_HALF_1,r.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=g;const E=r.hash;(E.directionalLength!==v||E.pointLength!==m||E.spotLength!==d||E.rectAreaLength!==M||E.hemiLength!==_||E.numDirectionalShadows!==y||E.numPointShadows!==A||E.numSpotShadows!==C||E.numSpotMaps!==U)&&(r.directional.length=v,r.spot.length=d,r.rectArea.length=M,r.point.length=m,r.hemi.length=_,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=A,r.pointShadowMap.length=A,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=A,r.spotLightMatrix.length=C+U-F,r.spotLightMap.length=U,r.numSpotLightShadowsWithMaps=F,E.directionalLength=v,E.pointLength=m,E.spotLength=d,E.rectAreaLength=M,E.hemiLength=_,E.numDirectionalShadows=y,E.numPointShadows=A,E.numSpotShadows=C,E.numSpotMaps=U,r.version=uv++)}function c(h,u){let f=0,p=0,g=0,v=0,m=0;const d=u.matrixWorldInverse;for(let M=0,_=h.length;M<_;M++){const y=h[M];if(y.isDirectionalLight){const A=r.directional[f];A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),f++}else if(y.isSpotLight){const A=r.spot[g];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),A.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(d),g++}else if(y.isRectAreaLight){const A=r.rectArea[v];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),o.identity(),a.copy(y.matrixWorld),a.premultiply(d),o.extractRotation(a),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),v++}else if(y.isPointLight){const A=r.point[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const A=r.hemi[m];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function zl(i,e){const t=new dv(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(u){n.push(u)}function o(u){r.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function pv(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new zl(i,e),t.set(s,[l])):a>=o.length?(l=new zl(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class mv extends qt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=uf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gv extends qt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_v=`uniform sampler2D shadow_pass;
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
}`;function yv(i,e,t){let n=new na;const r=new ae,s=new ae,a=new Ye,o=new mv({depthPacking:ff}),l=new gv,c={},h=t.maxTextureSize,u={[Cn]:Et,[Et]:Cn,[mn]:mn},f=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:vv,fragmentShader:_v}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new tt;g.setAttribute("position",new rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new it(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yc;let d=this.type;this.render=function(A,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const F=i.getRenderTarget(),x=i.getActiveCubeFace(),E=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Tn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const V=d!==pn&&this.type===pn,L=d===pn&&this.type!==pn;for(let N=0,G=A.length;N<G;N++){const Q=A[N],z=Q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const W=z.getFrameExtents();if(r.multiply(W),s.copy(z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/W.x),r.x=s.x*W.x,z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/W.y),r.y=s.y*W.y,z.mapSize.y=s.y)),z.map===null||V===!0||L===!0){const $=this.type!==pn?{minFilter:Rt,magFilter:Rt}:{};z.map!==null&&z.map.dispose(),z.map=new qn(r.x,r.y,$),z.map.texture.name=Q.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const K=z.getViewportCount();for(let $=0;$<K;$++){const ge=z.getViewport($);a.set(s.x*ge.x,s.y*ge.y,s.x*ge.z,s.y*ge.w),O.viewport(a),z.updateMatrices(Q,$),n=z.getFrustum(),y(C,U,z.camera,Q,this.type)}z.isPointLightShadow!==!0&&this.type===pn&&M(z,U),z.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(F,x,E)};function M(A,C){const U=e.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new qn(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,U,f,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,U,p,v,null)}function _(A,C,U,F){let x=null;const E=U.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(E!==void 0)x=E;else if(x=U.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const O=x.uuid,V=C.uuid;let L=c[O];L===void 0&&(L={},c[O]=L);let N=L[V];N===void 0&&(N=x.clone(),L[V]=N),x=N}if(x.visible=C.visible,x.wireframe=C.wireframe,F===pn?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:u[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const O=i.properties.get(x);O.light=U}return x}function y(A,C,U,F,x){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,A.matrixWorld);const V=e.update(A),L=A.material;if(Array.isArray(L)){const N=V.groups;for(let G=0,Q=N.length;G<Q;G++){const z=N[G],W=L[z.materialIndex];if(W&&W.visible){const K=_(A,W,F,x);i.renderBufferDirect(U,null,V,K,A,z)}}}else if(L.visible){const N=_(A,L,F,x);i.renderBufferDirect(U,null,V,N,A,null)}}const O=A.children;for(let V=0,L=O.length;V<L;V++)y(O[V],C,U,F,x)}}function xv(i,e,t){const n=t.isWebGL2;function r(){let I=!1;const j=new Ye;let oe=null;const ye=new Ye(0,0,0,0);return{setMask:function(Ae){oe!==Ae&&!I&&(i.colorMask(Ae,Ae,Ae,Ae),oe=Ae)},setLocked:function(Ae){I=Ae},setClear:function(Ae,Ze,qe,yt,Mn){Mn===!0&&(Ae*=yt,Ze*=yt,qe*=yt),j.set(Ae,Ze,qe,yt),ye.equals(j)===!1&&(i.clearColor(Ae,Ze,qe,yt),ye.copy(j))},reset:function(){I=!1,oe=null,ye.set(-1,0,0,0)}}}function s(){let I=!1,j=null,oe=null,ye=null;return{setTest:function(Ae){Ae?P(i.DEPTH_TEST):Re(i.DEPTH_TEST)},setMask:function(Ae){j!==Ae&&!I&&(i.depthMask(Ae),j=Ae)},setFunc:function(Ae){if(oe!==Ae){switch(Ae){case Du:i.depthFunc(i.NEVER);break;case Nu:i.depthFunc(i.ALWAYS);break;case Ou:i.depthFunc(i.LESS);break;case To:i.depthFunc(i.LEQUAL);break;case Bu:i.depthFunc(i.EQUAL);break;case Fu:i.depthFunc(i.GEQUAL);break;case zu:i.depthFunc(i.GREATER);break;case Gu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=Ae}},setLocked:function(Ae){I=Ae},setClear:function(Ae){ye!==Ae&&(i.clearDepth(Ae),ye=Ae)},reset:function(){I=!1,j=null,oe=null,ye=null}}}function a(){let I=!1,j=null,oe=null,ye=null,Ae=null,Ze=null,qe=null,yt=null,Mn=null;return{setTest:function(ot){I||(ot?P(i.STENCIL_TEST):Re(i.STENCIL_TEST))},setMask:function(ot){j!==ot&&!I&&(i.stencilMask(ot),j=ot)},setFunc:function(ot,Ot,Jt){(oe!==ot||ye!==Ot||Ae!==Jt)&&(i.stencilFunc(ot,Ot,Jt),oe=ot,ye=Ot,Ae=Jt)},setOp:function(ot,Ot,Jt){(Ze!==ot||qe!==Ot||yt!==Jt)&&(i.stencilOp(ot,Ot,Jt),Ze=ot,qe=Ot,yt=Jt)},setLocked:function(ot){I=ot},setClear:function(ot){Mn!==ot&&(i.clearStencil(ot),Mn=ot)},reset:function(){I=!1,j=null,oe=null,ye=null,Ae=null,Ze=null,qe=null,yt=null,Mn=null}}}const o=new r,l=new s,c=new a,h=new WeakMap,u=new WeakMap;let f={},p={},g=new WeakMap,v=[],m=null,d=!1,M=null,_=null,y=null,A=null,C=null,U=null,F=null,x=!1,E=null,O=null,V=null,L=null,N=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,z=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(W)[1]),Q=z>=1):W.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Q=z>=2);let K=null,$={};const ge=i.getParameter(i.SCISSOR_BOX),pe=i.getParameter(i.VIEWPORT),X=new Ye().fromArray(ge),ee=new Ye().fromArray(pe);function ue(I,j,oe,ye){const Ae=new Uint8Array(4),Ze=i.createTexture();i.bindTexture(I,Ze),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<oe;qe++)n&&(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)?i.texImage3D(j,0,i.RGBA,1,1,ye,0,i.RGBA,i.UNSIGNED_BYTE,Ae):i.texImage2D(j+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ae);return Ze}const me={};me[i.TEXTURE_2D]=ue(i.TEXTURE_2D,i.TEXTURE_2D,1),me[i.TEXTURE_CUBE_MAP]=ue(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(me[i.TEXTURE_2D_ARRAY]=ue(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),me[i.TEXTURE_3D]=ue(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),P(i.DEPTH_TEST),l.setFunc(To),ce(!1),Te(ba),P(i.CULL_FACE),te(Tn);function P(I){f[I]!==!0&&(i.enable(I),f[I]=!0)}function Re(I){f[I]!==!1&&(i.disable(I),f[I]=!1)}function Pe(I,j){return p[I]!==j?(i.bindFramebuffer(I,j),p[I]=j,n&&(I===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=j),I===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=j)),!0):!1}function le(I,j){let oe=v,ye=!1;if(I)if(oe=g.get(j),oe===void 0&&(oe=[],g.set(j,oe)),I.isWebGLMultipleRenderTargets){const Ae=I.texture;if(oe.length!==Ae.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let Ze=0,qe=Ae.length;Ze<qe;Ze++)oe[Ze]=i.COLOR_ATTACHMENT0+Ze;oe.length=Ae.length,ye=!0}}else oe[0]!==i.COLOR_ATTACHMENT0&&(oe[0]=i.COLOR_ATTACHMENT0,ye=!0);else oe[0]!==i.BACK&&(oe[0]=i.BACK,ye=!0);ye&&(t.isWebGL2?i.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Se(I){return m!==I?(i.useProgram(I),m=I,!0):!1}const ne={[Ri]:i.FUNC_ADD,[Eu]:i.FUNC_SUBTRACT,[Au]:i.FUNC_REVERSE_SUBTRACT};if(n)ne[Ra]=i.MIN,ne[Pa]=i.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(ne[Ra]=I.MIN_EXT,ne[Pa]=I.MAX_EXT)}const Z={[bu]:i.ZERO,[wu]:i.ONE,[Tu]:i.SRC_COLOR,[Zc]:i.SRC_ALPHA,[Uu]:i.SRC_ALPHA_SATURATE,[Lu]:i.DST_COLOR,[Ru]:i.DST_ALPHA,[Cu]:i.ONE_MINUS_SRC_COLOR,[qc]:i.ONE_MINUS_SRC_ALPHA,[Iu]:i.ONE_MINUS_DST_COLOR,[Pu]:i.ONE_MINUS_DST_ALPHA};function te(I,j,oe,ye,Ae,Ze,qe,yt){if(I===Tn){d===!0&&(Re(i.BLEND),d=!1);return}if(d===!1&&(P(i.BLEND),d=!0),I!==Mu){if(I!==M||yt!==x){if((_!==Ri||C!==Ri)&&(i.blendEquation(i.FUNC_ADD),_=Ri,C=Ri),yt)switch(I){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wa:i.blendFunc(i.ONE,i.ONE);break;case Ta:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ca:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ta:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ca:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}y=null,A=null,U=null,F=null,M=I,x=yt}return}Ae=Ae||j,Ze=Ze||oe,qe=qe||ye,(j!==_||Ae!==C)&&(i.blendEquationSeparate(ne[j],ne[Ae]),_=j,C=Ae),(oe!==y||ye!==A||Ze!==U||qe!==F)&&(i.blendFuncSeparate(Z[oe],Z[ye],Z[Ze],Z[qe]),y=oe,A=ye,U=Ze,F=qe),M=I,x=!1}function _e(I,j){I.side===mn?Re(i.CULL_FACE):P(i.CULL_FACE);let oe=I.side===Et;j&&(oe=!oe),ce(oe),I.blending===Ui&&I.transparent===!1?te(Tn):te(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),o.setMask(I.colorWrite);const ye=I.stencilWrite;c.setTest(ye),ye&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),be(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?P(i.SAMPLE_ALPHA_TO_COVERAGE):Re(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(I){E!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),E=I)}function Te(I){I!==yu?(P(i.CULL_FACE),I!==O&&(I===ba?i.cullFace(i.BACK):I===xu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Re(i.CULL_FACE),O=I}function Ce(I){I!==V&&(Q&&i.lineWidth(I),V=I)}function be(I,j,oe){I?(P(i.POLYGON_OFFSET_FILL),(L!==j||N!==oe)&&(i.polygonOffset(j,oe),L=j,N=oe)):Re(i.POLYGON_OFFSET_FILL)}function Ne(I){I?P(i.SCISSOR_TEST):Re(i.SCISSOR_TEST)}function We(I){I===void 0&&(I=i.TEXTURE0+G-1),K!==I&&(i.activeTexture(I),K=I)}function w(I,j,oe){oe===void 0&&(K===null?oe=i.TEXTURE0+G-1:oe=K);let ye=$[oe];ye===void 0&&(ye={type:void 0,texture:void 0},$[oe]=ye),(ye.type!==I||ye.texture!==j)&&(K!==oe&&(i.activeTexture(oe),K=oe),i.bindTexture(I,j||me[I]),ye.type=I,ye.texture=j)}function S(){const I=$[K];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function k(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function re(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function se(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function R(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function H(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ee(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(I){X.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),X.copy(I))}function Me(I){ee.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),ee.copy(I))}function Ie(I,j){let oe=u.get(j);oe===void 0&&(oe=new WeakMap,u.set(j,oe));let ye=oe.get(I);ye===void 0&&(ye=i.getUniformBlockIndex(j,I.name),oe.set(I,ye))}function ze(I,j){const ye=u.get(j).get(I);h.get(j)!==ye&&(i.uniformBlockBinding(j,ye,I.__bindingPointIndex),h.set(j,ye))}function st(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},K=null,$={},p={},g=new WeakMap,v=[],m=null,d=!1,M=null,_=null,y=null,A=null,C=null,U=null,F=null,x=!1,E=null,O=null,V=null,L=null,N=null,X.set(0,0,i.canvas.width,i.canvas.height),ee.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:P,disable:Re,bindFramebuffer:Pe,drawBuffers:le,useProgram:Se,setBlending:te,setMaterial:_e,setFlipSided:ce,setCullFace:Te,setLineWidth:Ce,setPolygonOffset:be,setScissorTest:Ne,activeTexture:We,bindTexture:w,unbindTexture:S,compressedTexImage2D:k,compressedTexImage3D:re,texImage2D:xe,texImage3D:Ee,updateUBOMapping:Ie,uniformBlockBinding:ze,texStorage2D:H,texStorage3D:de,texSubImage2D:se,texSubImage3D:fe,compressedTexSubImage2D:R,compressedTexSubImage3D:J,scissor:ve,viewport:Me,reset:st}}function Sv(i,e,t,n,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,h=r.maxTextureSize,u=r.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let v;const m=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(w,S){return d?new OffscreenCanvas(w,S):yr("canvas")}function _(w,S,k,re){let se=1;if((w.width>re||w.height>re)&&(se=re/Math.max(w.width,w.height)),se<1||S===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const fe=S?eh:Math.floor,R=fe(se*w.width),J=fe(se*w.height);v===void 0&&(v=M(R,J));const H=k?M(R,J):v;return H.width=R,H.height=J,H.getContext("2d").drawImage(w,0,0,R,J),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+R+"x"+J+")."),H}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function y(w){return Do(w.width)&&Do(w.height)}function A(w){return o?!1:w.wrapS!==Xt||w.wrapT!==Xt||w.minFilter!==Rt&&w.minFilter!==Ft}function C(w,S){return w.generateMipmaps&&S&&w.minFilter!==Rt&&w.minFilter!==Ft}function U(w){i.generateMipmap(w)}function F(w,S,k,re,se=!1){if(o===!1)return S;if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let fe=S;return S===i.RED&&(k===i.FLOAT&&(fe=i.R32F),k===i.HALF_FLOAT&&(fe=i.R16F),k===i.UNSIGNED_BYTE&&(fe=i.R8)),S===i.RG&&(k===i.FLOAT&&(fe=i.RG32F),k===i.HALF_FLOAT&&(fe=i.RG16F),k===i.UNSIGNED_BYTE&&(fe=i.RG8)),S===i.RGBA&&(k===i.FLOAT&&(fe=i.RGBA32F),k===i.HALF_FLOAT&&(fe=i.RGBA16F),k===i.UNSIGNED_BYTE&&(fe=re===Oe&&se===!1?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(fe=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(fe=i.RGB5_A1)),(fe===i.R16F||fe===i.R32F||fe===i.RG16F||fe===i.RG32F||fe===i.RGBA16F||fe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function x(w,S,k){return C(w,k)===!0||w.isFramebufferTexture&&w.minFilter!==Rt&&w.minFilter!==Ft?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function E(w){return w===Rt||w===La||w===Fs?i.NEAREST:i.LINEAR}function O(w){const S=w.target;S.removeEventListener("dispose",O),L(S),S.isVideoTexture&&g.delete(S)}function V(w){const S=w.target;S.removeEventListener("dispose",V),G(S)}function L(w){const S=n.get(w);if(S.__webglInit===void 0)return;const k=w.source,re=m.get(k);if(re){const se=re[S.__cacheKey];se.usedTimes--,se.usedTimes===0&&N(w),Object.keys(re).length===0&&m.delete(k)}n.remove(w)}function N(w){const S=n.get(w);i.deleteTexture(S.__webglTexture);const k=w.source,re=m.get(k);delete re[S.__cacheKey],a.memory.textures--}function G(w){const S=w.texture,k=n.get(w),re=n.get(S);if(re.__webglTexture!==void 0&&(i.deleteTexture(re.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let se=0;se<6;se++)i.deleteFramebuffer(k.__webglFramebuffer[se]),k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer[se]);else{if(i.deleteFramebuffer(k.__webglFramebuffer),k.__webglDepthbuffer&&i.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&i.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let se=0;se<k.__webglColorRenderbuffer.length;se++)k.__webglColorRenderbuffer[se]&&i.deleteRenderbuffer(k.__webglColorRenderbuffer[se]);k.__webglDepthRenderbuffer&&i.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let se=0,fe=S.length;se<fe;se++){const R=n.get(S[se]);R.__webglTexture&&(i.deleteTexture(R.__webglTexture),a.memory.textures--),n.remove(S[se])}n.remove(S),n.remove(w)}let Q=0;function z(){Q=0}function W(){const w=Q;return w>=l&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+l),Q+=1,w}function K(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function $(w,S){const k=n.get(w);if(w.isVideoTexture&&Ne(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){const re=w.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Re(k,w,S);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+S)}function ge(w,S){const k=n.get(w);if(w.version>0&&k.__version!==w.version){Re(k,w,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+S)}function pe(w,S){const k=n.get(w);if(w.version>0&&k.__version!==w.version){Re(k,w,S);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+S)}function X(w,S){const k=n.get(w);if(w.version>0&&k.__version!==w.version){Pe(k,w,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+S)}const ee={[Po]:i.REPEAT,[Xt]:i.CLAMP_TO_EDGE,[Lo]:i.MIRRORED_REPEAT},ue={[Rt]:i.NEAREST,[La]:i.NEAREST_MIPMAP_NEAREST,[Fs]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[Zu]:i.LINEAR_MIPMAP_NEAREST,[gr]:i.LINEAR_MIPMAP_LINEAR};function me(w,S,k){if(k?(i.texParameteri(w,i.TEXTURE_WRAP_S,ee[S.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ee[S.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ee[S.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ue[S.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ue[S.minFilter])):(i.texParameteri(w,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(w,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(S.wrapS!==Xt||S.wrapT!==Xt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(w,i.TEXTURE_MAG_FILTER,E(S.magFilter)),i.texParameteri(w,i.TEXTURE_MIN_FILTER,E(S.minFilter)),S.minFilter!==Rt&&S.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const re=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Rt||S.minFilter!==Fs&&S.minFilter!==gr||S.type===Vn&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===vr&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(i.texParameterf(w,re.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function P(w,S){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",O));const re=S.source;let se=m.get(re);se===void 0&&(se={},m.set(re,se));const fe=K(S);if(fe!==w.__cacheKey){se[fe]===void 0&&(se[fe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),se[fe].usedTimes++;const R=se[w.__cacheKey];R!==void 0&&(se[w.__cacheKey].usedTimes--,R.usedTimes===0&&N(S)),w.__cacheKey=fe,w.__webglTexture=se[fe].texture}return k}function Re(w,S,k){let re=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(re=i.TEXTURE_3D);const se=P(w,S),fe=S.source;t.bindTexture(re,w.__webglTexture,i.TEXTURE0+k);const R=n.get(fe);if(fe.version!==R.__version||se===!0){t.activeTexture(i.TEXTURE0+k),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.NONE);const J=A(S)&&y(S.image)===!1;let H=_(S.image,J,!1,h);H=We(S,H);const de=y(H)||o,xe=s.convert(S.format,S.colorSpace);let Ee=s.convert(S.type),ve=F(S.internalFormat,xe,Ee,S.colorSpace);me(re,S,de);let Me;const Ie=S.mipmaps,ze=o&&S.isVideoTexture!==!0,st=R.__version===void 0||se===!0,I=x(S,H,de);if(S.isDepthTexture)ve=i.DEPTH_COMPONENT,o?S.type===Vn?ve=i.DEPTH_COMPONENT32F:S.type===Hn?ve=i.DEPTH_COMPONENT24:S.type===Di?ve=i.DEPTH24_STENCIL8:ve=i.DEPTH_COMPONENT16:S.type===Vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===kn&&ve===i.DEPTH_COMPONENT&&S.type!==Qc&&S.type!==Hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Hn,Ee=s.convert(S.type)),S.format===Gi&&ve===i.DEPTH_COMPONENT&&(ve=i.DEPTH_STENCIL,S.type!==Di&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Di,Ee=s.convert(S.type))),st&&(ze?t.texStorage2D(i.TEXTURE_2D,1,ve,H.width,H.height):t.texImage2D(i.TEXTURE_2D,0,ve,H.width,H.height,0,xe,Ee,null));else if(S.isDataTexture)if(Ie.length>0&&de){ze&&st&&t.texStorage2D(i.TEXTURE_2D,I,ve,Ie[0].width,Ie[0].height);for(let j=0,oe=Ie.length;j<oe;j++)Me=Ie[j],ze?t.texSubImage2D(i.TEXTURE_2D,j,0,0,Me.width,Me.height,xe,Ee,Me.data):t.texImage2D(i.TEXTURE_2D,j,ve,Me.width,Me.height,0,xe,Ee,Me.data);S.generateMipmaps=!1}else ze?(st&&t.texStorage2D(i.TEXTURE_2D,I,ve,H.width,H.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,H.width,H.height,xe,Ee,H.data)):t.texImage2D(i.TEXTURE_2D,0,ve,H.width,H.height,0,xe,Ee,H.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ze&&st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,I,ve,Ie[0].width,Ie[0].height,H.depth);for(let j=0,oe=Ie.length;j<oe;j++)Me=Ie[j],S.format!==jt?xe!==null?ze?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Me.width,Me.height,H.depth,xe,Me.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,j,ve,Me.width,Me.height,H.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage3D(i.TEXTURE_2D_ARRAY,j,0,0,0,Me.width,Me.height,H.depth,xe,Ee,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,j,ve,Me.width,Me.height,H.depth,0,xe,Ee,Me.data)}else{ze&&st&&t.texStorage2D(i.TEXTURE_2D,I,ve,Ie[0].width,Ie[0].height);for(let j=0,oe=Ie.length;j<oe;j++)Me=Ie[j],S.format!==jt?xe!==null?ze?t.compressedTexSubImage2D(i.TEXTURE_2D,j,0,0,Me.width,Me.height,xe,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,j,ve,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?t.texSubImage2D(i.TEXTURE_2D,j,0,0,Me.width,Me.height,xe,Ee,Me.data):t.texImage2D(i.TEXTURE_2D,j,ve,Me.width,Me.height,0,xe,Ee,Me.data)}else if(S.isDataArrayTexture)ze?(st&&t.texStorage3D(i.TEXTURE_2D_ARRAY,I,ve,H.width,H.height,H.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,H.width,H.height,H.depth,xe,Ee,H.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,H.width,H.height,H.depth,0,xe,Ee,H.data);else if(S.isData3DTexture)ze?(st&&t.texStorage3D(i.TEXTURE_3D,I,ve,H.width,H.height,H.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,H.width,H.height,H.depth,xe,Ee,H.data)):t.texImage3D(i.TEXTURE_3D,0,ve,H.width,H.height,H.depth,0,xe,Ee,H.data);else if(S.isFramebufferTexture){if(st)if(ze)t.texStorage2D(i.TEXTURE_2D,I,ve,H.width,H.height);else{let j=H.width,oe=H.height;for(let ye=0;ye<I;ye++)t.texImage2D(i.TEXTURE_2D,ye,ve,j,oe,0,xe,Ee,null),j>>=1,oe>>=1}}else if(Ie.length>0&&de){ze&&st&&t.texStorage2D(i.TEXTURE_2D,I,ve,Ie[0].width,Ie[0].height);for(let j=0,oe=Ie.length;j<oe;j++)Me=Ie[j],ze?t.texSubImage2D(i.TEXTURE_2D,j,0,0,xe,Ee,Me):t.texImage2D(i.TEXTURE_2D,j,ve,xe,Ee,Me);S.generateMipmaps=!1}else ze?(st&&t.texStorage2D(i.TEXTURE_2D,I,ve,H.width,H.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Ee,H)):t.texImage2D(i.TEXTURE_2D,0,ve,xe,Ee,H);C(S,de)&&U(re),R.__version=fe.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function Pe(w,S,k){if(S.image.length!==6)return;const re=P(w,S),se=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);const fe=n.get(se);if(se.version!==fe.__version||re===!0){t.activeTexture(i.TEXTURE0+k),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.NONE);const R=S.isCompressedTexture||S.image[0].isCompressedTexture,J=S.image[0]&&S.image[0].isDataTexture,H=[];for(let j=0;j<6;j++)!R&&!J?H[j]=_(S.image[j],!1,!0,c):H[j]=J?S.image[j].image:S.image[j],H[j]=We(S,H[j]);const de=H[0],xe=y(de)||o,Ee=s.convert(S.format,S.colorSpace),ve=s.convert(S.type),Me=F(S.internalFormat,Ee,ve,S.colorSpace),Ie=o&&S.isVideoTexture!==!0,ze=fe.__version===void 0||re===!0;let st=x(S,de,xe);me(i.TEXTURE_CUBE_MAP,S,xe);let I;if(R){Ie&&ze&&t.texStorage2D(i.TEXTURE_CUBE_MAP,st,Me,de.width,de.height);for(let j=0;j<6;j++){I=H[j].mipmaps;for(let oe=0;oe<I.length;oe++){const ye=I[oe];S.format!==jt?Ee!==null?Ie?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe,0,0,ye.width,ye.height,Ee,ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe,Me,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe,0,0,ye.width,ye.height,Ee,ve,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe,Me,ye.width,ye.height,0,Ee,ve,ye.data)}}}else{I=S.mipmaps,Ie&&ze&&(I.length>0&&st++,t.texStorage2D(i.TEXTURE_CUBE_MAP,st,Me,H[0].width,H[0].height));for(let j=0;j<6;j++)if(J){Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,H[j].width,H[j].height,Ee,ve,H[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Me,H[j].width,H[j].height,0,Ee,ve,H[j].data);for(let oe=0;oe<I.length;oe++){const Ae=I[oe].image[j].image;Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe+1,0,0,Ae.width,Ae.height,Ee,ve,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe+1,Me,Ae.width,Ae.height,0,Ee,ve,Ae.data)}}else{Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ee,ve,H[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Me,Ee,ve,H[j]);for(let oe=0;oe<I.length;oe++){const ye=I[oe];Ie?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe+1,0,0,Ee,ve,ye.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,oe+1,Me,Ee,ve,ye.image[j])}}}C(S,xe)&&U(i.TEXTURE_CUBE_MAP),fe.__version=se.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function le(w,S,k,re,se){const fe=s.convert(k.format,k.colorSpace),R=s.convert(k.type),J=F(k.internalFormat,fe,R,k.colorSpace);n.get(S).__hasExternalTextures||(se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,0,J,S.width,S.height,S.depth,0,fe,R,null):t.texImage2D(se,0,J,S.width,S.height,0,fe,R,null)),t.bindFramebuffer(i.FRAMEBUFFER,w),be(S)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,se,n.get(k).__webglTexture,0,Ce(S)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,se,n.get(k).__webglTexture,0),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Se(w,S,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),S.depthBuffer&&!S.stencilBuffer){let re=i.DEPTH_COMPONENT16;if(k||be(S)){const se=S.depthTexture;se&&se.isDepthTexture&&(se.type===Vn?re=i.DEPTH_COMPONENT32F:se.type===Hn&&(re=i.DEPTH_COMPONENT24));const fe=Ce(S);be(S)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe,re,S.width,S.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,re,S.width,S.height)}else i.renderbufferStorage(i.RENDERBUFFER,re,S.width,S.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,w)}else if(S.depthBuffer&&S.stencilBuffer){const re=Ce(S);k&&be(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,i.DEPTH24_STENCIL8,S.width,S.height):be(S)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,i.DEPTH24_STENCIL8,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,w)}else{const re=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let se=0;se<re.length;se++){const fe=re[se],R=s.convert(fe.format,fe.colorSpace),J=s.convert(fe.type),H=F(fe.internalFormat,R,J,fe.colorSpace),de=Ce(S);k&&be(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,de,H,S.width,S.height):be(S)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,de,H,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,H,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ne(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),$(S.depthTexture,0);const re=n.get(S.depthTexture).__webglTexture,se=Ce(S);if(S.depthTexture.format===kn)be(S)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,re,0);else if(S.depthTexture.format===Gi)be(S)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Z(w){const S=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");ne(S.__webglFramebuffer,w)}else if(k){S.__webglDepthbuffer=[];for(let re=0;re<6;re++)t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[re]),S.__webglDepthbuffer[re]=i.createRenderbuffer(),Se(S.__webglDepthbuffer[re],w,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),Se(S.__webglDepthbuffer,w,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function te(w,S,k){const re=n.get(w);S!==void 0&&le(re.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D),k!==void 0&&Z(w)}function _e(w){const S=w.texture,k=n.get(w),re=n.get(S);w.addEventListener("dispose",V),w.isWebGLMultipleRenderTargets!==!0&&(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=S.version,a.memory.textures++);const se=w.isWebGLCubeRenderTarget===!0,fe=w.isWebGLMultipleRenderTargets===!0,R=y(w)||o;if(se){k.__webglFramebuffer=[];for(let J=0;J<6;J++)k.__webglFramebuffer[J]=i.createFramebuffer()}else{if(k.__webglFramebuffer=i.createFramebuffer(),fe)if(r.drawBuffers){const J=w.texture;for(let H=0,de=J.length;H<de;H++){const xe=n.get(J[H]);xe.__webglTexture===void 0&&(xe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&be(w)===!1){const J=fe?S:[S];k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let H=0;H<J.length;H++){const de=J[H];k.__webglColorRenderbuffer[H]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[H]);const xe=s.convert(de.format,de.colorSpace),Ee=s.convert(de.type),ve=F(de.internalFormat,xe,Ee,de.colorSpace,w.isXRRenderTarget===!0),Me=Ce(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Me,ve,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,k.__webglColorRenderbuffer[H])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Se(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),me(i.TEXTURE_CUBE_MAP,S,R);for(let J=0;J<6;J++)le(k.__webglFramebuffer[J],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J);C(S,R)&&U(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){const J=w.texture;for(let H=0,de=J.length;H<de;H++){const xe=J[H],Ee=n.get(xe);t.bindTexture(i.TEXTURE_2D,Ee.__webglTexture),me(i.TEXTURE_2D,xe,R),le(k.__webglFramebuffer,w,xe,i.COLOR_ATTACHMENT0+H,i.TEXTURE_2D),C(xe,R)&&U(i.TEXTURE_2D)}t.unbindTexture()}else{let J=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?J=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(J,re.__webglTexture),me(J,S,R),le(k.__webglFramebuffer,w,S,i.COLOR_ATTACHMENT0,J),C(S,R)&&U(J),t.unbindTexture()}w.depthBuffer&&Z(w)}function ce(w){const S=y(w)||o,k=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let re=0,se=k.length;re<se;re++){const fe=k[re];if(C(fe,S)){const R=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,J=n.get(fe).__webglTexture;t.bindTexture(R,J),U(R),t.unbindTexture()}}}function Te(w){if(o&&w.samples>0&&be(w)===!1){const S=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],k=w.width,re=w.height;let se=i.COLOR_BUFFER_BIT;const fe=[],R=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=n.get(w),H=w.isWebGLMultipleRenderTargets===!0;if(H)for(let de=0;de<S.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,J.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,J.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglFramebuffer);for(let de=0;de<S.length;de++){fe.push(i.COLOR_ATTACHMENT0+de),w.depthBuffer&&fe.push(R);const xe=J.__ignoreDepthValues!==void 0?J.__ignoreDepthValues:!1;if(xe===!1&&(w.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),H&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,J.__webglColorRenderbuffer[de]),xe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[R]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])),H){const Ee=n.get(S[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ee,0)}i.blitFramebuffer(0,0,k,re,0,0,k,re,se,i.NEAREST),p&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),H)for(let de=0;de<S.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,J.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,J.__webglColorRenderbuffer[de]);const xe=n.get(S[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,J.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,J.__webglMultisampledFramebuffer)}}function Ce(w){return Math.min(u,w.samples)}function be(w){const S=n.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ne(w){const S=a.render.frame;g.get(w)!==S&&(g.set(w,S),w.update())}function We(w,S){const k=w.colorSpace,re=w.format,se=w.type;return w.isCompressedTexture===!0||w.format===Uo||k!==rn&&k!==Xn&&(k===Oe?o===!1?e.has("EXT_sRGB")===!0&&re===jt?(w.format=Uo,w.minFilter=Ft,w.generateMipmaps=!1):S=nh.sRGBToLinear(S):(re!==jt||se!==Zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}this.allocateTextureUnit=W,this.resetTextureUnits=z,this.setTexture2D=$,this.setTexture2DArray=ge,this.setTexture3D=pe,this.setTextureCube=X,this.rebindTextures=te,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=le,this.useMultisampledRTT=be}function Mv(i,e,t){const n=t.isWebGL2;function r(s,a=Xn){let o;if(s===Zn)return i.UNSIGNED_BYTE;if(s===Ku)return i.UNSIGNED_SHORT_4_4_4_4;if(s===$u)return i.UNSIGNED_SHORT_5_5_5_1;if(s===qu)return i.BYTE;if(s===Ju)return i.SHORT;if(s===Qc)return i.UNSIGNED_SHORT;if(s===Qu)return i.INT;if(s===Hn)return i.UNSIGNED_INT;if(s===Vn)return i.FLOAT;if(s===vr)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===ef)return i.ALPHA;if(s===jt)return i.RGBA;if(s===tf)return i.LUMINANCE;if(s===nf)return i.LUMINANCE_ALPHA;if(s===kn)return i.DEPTH_COMPONENT;if(s===Gi)return i.DEPTH_STENCIL;if(s===Uo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===rf)return i.RED;if(s===sf)return i.RED_INTEGER;if(s===of)return i.RG;if(s===af)return i.RG_INTEGER;if(s===lf)return i.RGBA_INTEGER;if(s===zs||s===Gs||s===Hs||s===Vs)if(a===Oe)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===zs)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Gs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Hs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Vs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===zs)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Gs)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Hs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Vs)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ia||s===Ua||s===Da||s===Na)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Ia)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ua)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Da)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Na)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===cf)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Oa||s===Ba)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Oa)return a===Oe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ba)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Fa||s===za||s===Ga||s===Ha||s===Va||s===ka||s===Wa||s===Xa||s===ja||s===Ya||s===Za||s===qa||s===Ja||s===Qa)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Fa)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===za)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ga)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ha)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Va)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ka)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Wa)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Xa)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ja)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ya)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Za)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===qa)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ja)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Qa)return a===Oe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ks)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ks)return a===Oe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===hf||s===Ka||s===$a||s===el)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ks)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Ka)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===$a)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===el)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Di?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class Ev extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ke extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Av={type:"move"};class uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Av)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class bv extends Pt{constructor(e,t,n,r,s,a,o,l,c,h){if(h=h!==void 0?h:kn,h!==kn&&h!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===kn&&(n=Hn),n===void 0&&h===Gi&&(n=Di),super(null,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Rt,this.minFilter=l!==void 0?l:Rt,this.flipY=!1,this.generateMipmaps=!1}}class wv extends ei{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const v=t.getContextAttributes();let m=null,d=null;const M=[],_=[],y=new Set,A=new Map,C=new Nt;C.layers.enable(1),C.viewport=new Ye;const U=new Nt;U.layers.enable(2),U.viewport=new Ye;const F=[C,U],x=new Ev;x.layers.enable(1),x.layers.enable(2);let E=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ee=M[X];return ee===void 0&&(ee=new uo,M[X]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(X){let ee=M[X];return ee===void 0&&(ee=new uo,M[X]=ee),ee.getGripSpace()},this.getHand=function(X){let ee=M[X];return ee===void 0&&(ee=new uo,M[X]=ee),ee.getHandSpace()};function V(X){const ee=_.indexOf(X.inputSource);if(ee===-1)return;const ue=M[ee];ue!==void 0&&(ue.update(X.inputSource,X.frame,c||a),ue.dispatchEvent({type:X.type,data:X.inputSource}))}function L(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",L),r.removeEventListener("inputsourceschange",N);for(let X=0;X<M.length;X++){const ee=_[X];ee!==null&&(_[X]=null,M[X].disconnect(ee))}E=null,O=null,e.setRenderTarget(m),p=null,f=null,u=null,r=null,d=null,pe.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",L),r.addEventListener("inputsourceschange",N),v.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ee={antialias:r.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ee),r.updateRenderState({baseLayer:p}),d=new qn(p.framebufferWidth,p.framebufferHeight,{format:jt,type:Zn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let ee=null,ue=null,me=null;v.depth&&(me=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=v.stencil?Gi:kn,ue=v.stencil?Di:Hn);const P={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:s};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(P),r.updateRenderState({layers:[f]}),d=new qn(f.textureWidth,f.textureHeight,{format:jt,type:Zn,depthTexture:new bv(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Re=e.properties.get(d);Re.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function N(X){for(let ee=0;ee<X.removed.length;ee++){const ue=X.removed[ee],me=_.indexOf(ue);me>=0&&(_[me]=null,M[me].disconnect(ue))}for(let ee=0;ee<X.added.length;ee++){const ue=X.added[ee];let me=_.indexOf(ue);if(me===-1){for(let Re=0;Re<M.length;Re++)if(Re>=_.length){_.push(ue),me=Re;break}else if(_[Re]===null){_[Re]=ue,me=Re;break}if(me===-1)break}const P=M[me];P&&P.connect(ue)}}const G=new T,Q=new T;function z(X,ee,ue){G.setFromMatrixPosition(ee.matrixWorld),Q.setFromMatrixPosition(ue.matrixWorld);const me=G.distanceTo(Q),P=ee.projectionMatrix.elements,Re=ue.projectionMatrix.elements,Pe=P[14]/(P[10]-1),le=P[14]/(P[10]+1),Se=(P[9]+1)/P[5],ne=(P[9]-1)/P[5],Z=(P[8]-1)/P[0],te=(Re[8]+1)/Re[0],_e=Pe*Z,ce=Pe*te,Te=me/(-Z+te),Ce=Te*-Z;ee.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ce),X.translateZ(Te),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const be=Pe+Te,Ne=le+Te,We=_e-Ce,w=ce+(me-Ce),S=Se*le/Ne*be,k=ne*le/Ne*be;X.projectionMatrix.makePerspective(We,w,S,k,be,Ne),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function W(X,ee){ee===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ee.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;x.near=U.near=C.near=X.near,x.far=U.far=C.far=X.far,(E!==x.near||O!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,O=x.far);const ee=X.parent,ue=x.cameras;W(x,ee);for(let me=0;me<ue.length;me++)W(ue[me],ee);ue.length===2?z(x,C,U):x.projectionMatrix.copy(C.projectionMatrix),K(X,x,ee)};function K(X,ee,ue){ue===null?X.matrix.copy(ee.matrixWorld):(X.matrix.copy(ue.matrixWorld),X.matrix.invert(),X.matrix.multiply(ee.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0);const me=X.children;for(let P=0,Re=me.length;P<Re;P++)me[P].updateMatrixWorld(!0);X.projectionMatrix.copy(ee.projectionMatrix),X.projectionMatrixInverse.copy(ee.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=_r*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.getPlanes=function(){return y};let $=null;function ge(X,ee){if(h=ee.getViewerPose(c||a),g=ee,h!==null){const ue=h.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let me=!1;ue.length!==x.cameras.length&&(x.cameras.length=0,me=!0);for(let P=0;P<ue.length;P++){const Re=ue[P];let Pe=null;if(p!==null)Pe=p.getViewport(Re);else{const Se=u.getViewSubImage(f,Re);Pe=Se.viewport,P===0&&(e.setRenderTargetTextures(d,Se.colorTexture,f.ignoreDepthValues?void 0:Se.depthStencilTexture),e.setRenderTarget(d))}let le=F[P];le===void 0&&(le=new Nt,le.layers.enable(P),le.viewport=new Ye,F[P]=le),le.matrix.fromArray(Re.transform.matrix),le.matrix.decompose(le.position,le.quaternion,le.scale),le.projectionMatrix.fromArray(Re.projectionMatrix),le.projectionMatrixInverse.copy(le.projectionMatrix).invert(),le.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),P===0&&(x.matrix.copy(le.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),me===!0&&x.cameras.push(le)}}for(let ue=0;ue<M.length;ue++){const me=_[ue],P=M[ue];me!==null&&P!==void 0&&P.update(me,ee,c||a)}if($&&$(X,ee),ee.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:ee.detectedPlanes});let ue=null;for(const me of y)ee.detectedPlanes.has(me)||(ue===null&&(ue=[]),ue.push(me));if(ue!==null)for(const me of ue)y.delete(me),A.delete(me),n.dispatchEvent({type:"planeremoved",data:me});for(const me of ee.detectedPlanes)if(!y.has(me))y.add(me),A.set(me,ee.lastChangedTime),n.dispatchEvent({type:"planeadded",data:me});else{const P=A.get(me);me.lastChangedTime>P&&(A.set(me,me.lastChangedTime),n.dispatchEvent({type:"planechanged",data:me}))}}g=null}const pe=new uh;pe.setAnimationLoop(ge),this.setAnimationLoop=function(X){$=X},this.dispose=function(){}}}function Tv(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,lh(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,M,_,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),u(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),v(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,M,_):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Et&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Et&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const M=e.get(d).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const _=i.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*_,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,M,_){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=_*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Et&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const M=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Cv(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,_){const y=_.program;n.uniformBlockBinding(M,y)}function c(M,_){let y=r[M.id];y===void 0&&(g(M),y=h(M),r[M.id]=y,M.addEventListener("dispose",m));const A=_.program;n.updateUBOMapping(M,A);const C=e.render.frame;s[M.id]!==C&&(f(M),s[M.id]=C)}function h(M){const _=u();M.__bindingPointIndex=_;const y=i.createBuffer(),A=M.__size,C=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,y),y}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const _=r[M.id],y=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let C=0,U=y.length;C<U;C++){const F=y[C];if(p(F,C,A)===!0){const x=F.__offset,E=Array.isArray(F.value)?F.value:[F.value];let O=0;for(let V=0;V<E.length;V++){const L=E[V],N=v(L);typeof L=="number"?(F.__data[0]=L,i.bufferSubData(i.UNIFORM_BUFFER,x+O,F.__data)):L.isMatrix3?(F.__data[0]=L.elements[0],F.__data[1]=L.elements[1],F.__data[2]=L.elements[2],F.__data[3]=L.elements[0],F.__data[4]=L.elements[3],F.__data[5]=L.elements[4],F.__data[6]=L.elements[5],F.__data[7]=L.elements[0],F.__data[8]=L.elements[6],F.__data[9]=L.elements[7],F.__data[10]=L.elements[8],F.__data[11]=L.elements[0]):(L.toArray(F.__data,O),O+=N.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,x,F.__data)}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,_,y){const A=M.value;if(y[_]===void 0){if(typeof A=="number")y[_]=A;else{const C=Array.isArray(A)?A:[A],U=[];for(let F=0;F<C.length;F++)U.push(C[F].clone());y[_]=U}return!0}else if(typeof A=="number"){if(y[_]!==A)return y[_]=A,!0}else{const C=Array.isArray(y[_])?y[_]:[y[_]],U=Array.isArray(A)?A:[A];for(let F=0;F<C.length;F++){const x=C[F];if(x.equals(U[F])===!1)return x.copy(U[F]),!0}}return!1}function g(M){const _=M.uniforms;let y=0;const A=16;let C=0;for(let U=0,F=_.length;U<F;U++){const x=_[U],E={boundary:0,storage:0},O=Array.isArray(x.value)?x.value:[x.value];for(let V=0,L=O.length;V<L;V++){const N=O[V],G=v(N);E.boundary+=G.boundary,E.storage+=G.storage}if(x.__data=new Float32Array(E.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=y,U>0){C=y%A;const V=A-C;C!==0&&V-E.boundary<0&&(y+=A-C,x.__offset=y)}y+=E.storage}return C=y%A,C>0&&(y+=A-C),M.__size=y,M.__cache={},this}function v(M){const _={boundary:0,storage:0};return typeof M=="number"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function d(){for(const M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}function Rv(){const i=yr("canvas");return i.style.display="block",i}class gh{constructor(e={}){const{canvas:t=Rv(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let p=null,g=null;const v=[],m=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputColorSpace=Oe,this.useLegacyLights=!0,this.toneMapping=vn,this.toneMappingExposure=1;const d=this;let M=!1,_=0,y=0,A=null,C=-1,U=null;const F=new Ye,x=new Ye;let E=null,O=t.width,V=t.height,L=1,N=null,G=null;const Q=new Ye(0,0,O,V),z=new Ye(0,0,O,V);let W=!1;const K=new na;let $=!1,ge=!1,pe=null;const X=new et,ee=new T,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function me(){return A===null?L:1}let P=n;function Re(b,B){for(let Y=0;Y<b.length;Y++){const D=b[Y],q=t.getContext(D,B);if(q!==null)return q}return null}try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ko}`),t.addEventListener("webglcontextlost",Me,!1),t.addEventListener("webglcontextrestored",Ie,!1),t.addEventListener("webglcontextcreationerror",ze,!1),P===null){const B=["webgl2","webgl","experimental-webgl"];if(d.isWebGL1Renderer===!0&&B.shift(),P=Re(B,b),P===null)throw Re(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Pe,le,Se,ne,Z,te,_e,ce,Te,Ce,be,Ne,We,w,S,k,re,se,fe,R,J,H,de,xe;function Ee(){Pe=new Gm(P),le=new Dm(P,Pe,e),Pe.init(le),H=new Mv(P,Pe,le),Se=new xv(P,Pe,le),ne=new km(P),Z=new ov,te=new Sv(P,Pe,Se,Z,le,H,ne),_e=new Om(d),ce=new zm(d),Te=new td(P,le),de=new Im(P,Pe,Te,le),Ce=new Hm(P,Te,ne,de),be=new Ym(P,Ce,Te,ne),fe=new jm(P,le,te),k=new Nm(Z),Ne=new sv(d,_e,ce,Pe,le,de,k),We=new Tv(d,Z),w=new lv,S=new pv(Pe,le),se=new Lm(d,_e,ce,Se,be,f,l),re=new yv(d,be,le),xe=new Cv(P,ne,le,Se),R=new Um(P,Pe,ne,le),J=new Vm(P,Pe,ne,le),ne.programs=Ne.programs,d.capabilities=le,d.extensions=Pe,d.properties=Z,d.renderLists=w,d.shadowMap=re,d.state=Se,d.info=ne}Ee();const ve=new wv(d,P);this.xr=ve,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=Pe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Pe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return L},this.setPixelRatio=function(b){b!==void 0&&(L=b,this.setSize(O,V,!1))},this.getSize=function(b){return b.set(O,V)},this.setSize=function(b,B,Y=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=b,V=B,t.width=Math.floor(b*L),t.height=Math.floor(B*L),Y===!0&&(t.style.width=b+"px",t.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(O*L,V*L).floor()},this.setDrawingBufferSize=function(b,B,Y){O=b,V=B,L=Y,t.width=Math.floor(b*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(F)},this.getViewport=function(b){return b.copy(Q)},this.setViewport=function(b,B,Y,D){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,B,Y,D),Se.viewport(F.copy(Q).multiplyScalar(L).floor())},this.getScissor=function(b){return b.copy(z)},this.setScissor=function(b,B,Y,D){b.isVector4?z.set(b.x,b.y,b.z,b.w):z.set(b,B,Y,D),Se.scissor(x.copy(z).multiplyScalar(L).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(b){Se.setScissorTest(W=b)},this.setOpaqueSort=function(b){N=b},this.setTransparentSort=function(b){G=b},this.getClearColor=function(b){return b.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(b=!0,B=!0,Y=!0){let D=0;b&&(D|=P.COLOR_BUFFER_BIT),B&&(D|=P.DEPTH_BUFFER_BIT),Y&&(D|=P.STENCIL_BUFFER_BIT),P.clear(D)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Me,!1),t.removeEventListener("webglcontextrestored",Ie,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),w.dispose(),S.dispose(),Z.dispose(),_e.dispose(),ce.dispose(),be.dispose(),de.dispose(),xe.dispose(),Ne.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",Ae),ve.removeEventListener("sessionend",Ze),pe&&(pe.dispose(),pe=null),qe.stop()};function Me(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Ie(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const b=ne.autoReset,B=re.enabled,Y=re.autoUpdate,D=re.needsUpdate,q=re.type;Ee(),ne.autoReset=b,re.enabled=B,re.autoUpdate=Y,re.needsUpdate=D,re.type=q}function ze(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function st(b){const B=b.target;B.removeEventListener("dispose",st),I(B)}function I(b){j(b),Z.remove(b)}function j(b){const B=Z.get(b).programs;B!==void 0&&(B.forEach(function(Y){Ne.releaseProgram(Y)}),b.isShaderMaterial&&Ne.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,Y,D,q,we){B===null&&(B=ue);const Le=q.isMesh&&q.matrixWorld.determinant()<0,Ue=du(b,B,Y,D,q);Se.setMaterial(D,Le);let Be=Y.index,Ge=1;D.wireframe===!0&&(Be=Ce.getWireframeAttribute(Y),Ge=2);const He=Y.drawRange,Ve=Y.attributes.position;let je=He.start*Ge,At=(He.start+He.count)*Ge;we!==null&&(je=Math.max(je,we.start*Ge),At=Math.min(At,(we.start+we.count)*Ge)),Be!==null?(je=Math.max(je,0),At=Math.min(At,Be.count)):Ve!=null&&(je=Math.max(je,0),At=Math.min(At,Ve.count));const Gt=At-je;if(Gt<0||Gt===1/0)return;de.setup(q,D,Ue,Y,Be);let Ln,lt=R;if(Be!==null&&(Ln=Te.get(Be),lt=J,lt.setIndex(Ln)),q.isMesh)D.wireframe===!0?(Se.setLineWidth(D.wireframeLinewidth*me()),lt.setMode(P.LINES)):lt.setMode(P.TRIANGLES);else if(q.isLine){let Xe=D.linewidth;Xe===void 0&&(Xe=1),Se.setLineWidth(Xe*me()),q.isLineSegments?lt.setMode(P.LINES):q.isLineLoop?lt.setMode(P.LINE_LOOP):lt.setMode(P.LINE_STRIP)}else q.isPoints?lt.setMode(P.POINTS):q.isSprite&&lt.setMode(P.TRIANGLES);if(q.isInstancedMesh)lt.renderInstances(je,Gt,q.count);else if(Y.isInstancedBufferGeometry){const Xe=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ds=Math.min(Y.instanceCount,Xe);lt.renderInstances(je,Gt,Ds)}else lt.render(je,Gt)},this.compile=function(b,B){function Y(D,q,we){D.transparent===!0&&D.side===mn&&D.forceSinglePass===!1?(D.side=Et,D.needsUpdate=!0,Lr(D,q,we),D.side=Cn,D.needsUpdate=!0,Lr(D,q,we),D.side=mn):Lr(D,q,we)}g=S.get(b),g.init(),m.push(g),b.traverseVisible(function(D){D.isLight&&D.layers.test(B.layers)&&(g.pushLight(D),D.castShadow&&g.pushShadow(D))}),g.setupLights(d.useLegacyLights),b.traverse(function(D){const q=D.material;if(q)if(Array.isArray(q))for(let we=0;we<q.length;we++){const Le=q[we];Y(Le,b,D)}else Y(q,b,D)}),m.pop(),g=null};let oe=null;function ye(b){oe&&oe(b)}function Ae(){qe.stop()}function Ze(){qe.start()}const qe=new uh;qe.setAnimationLoop(ye),typeof self<"u"&&qe.setContext(self),this.setAnimationLoop=function(b){oe=b,ve.setAnimationLoop(b),b===null?qe.stop():qe.start()},ve.addEventListener("sessionstart",Ae),ve.addEventListener("sessionend",Ze),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(B),B=ve.getCamera()),b.isScene===!0&&b.onBeforeRender(d,b,B,A),g=S.get(b,m.length),g.init(),m.push(g),X.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),K.setFromProjectionMatrix(X),ge=this.localClippingEnabled,$=k.init(this.clippingPlanes,ge),p=w.get(b,v.length),p.init(),v.push(p),yt(b,B,0,d.sortObjects),p.finish(),d.sortObjects===!0&&p.sort(N,G),$===!0&&k.beginShadows();const Y=g.state.shadowsArray;if(re.render(Y,b,B),$===!0&&k.endShadows(),this.info.autoReset===!0&&this.info.reset(),se.render(p,b),g.setupLights(d.useLegacyLights),B.isArrayCamera){const D=B.cameras;for(let q=0,we=D.length;q<we;q++){const Le=D[q];Mn(p,b,Le,Le.viewport)}}else Mn(p,b,B);A!==null&&(te.updateMultisampleRenderTarget(A),te.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(d,b,B),de.resetDefaultState(),C=-1,U=null,m.pop(),m.length>0?g=m[m.length-1]:g=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function yt(b,B,Y,D){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)g.pushLight(b),b.castShadow&&g.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||K.intersectsSprite(b)){D&&ee.setFromMatrixPosition(b.matrixWorld).applyMatrix4(X);const Le=be.update(b),Ue=b.material;Ue.visible&&p.push(b,Le,Ue,Y,ee.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||K.intersectsObject(b))){b.isSkinnedMesh&&b.skeleton.frame!==ne.render.frame&&(b.skeleton.update(),b.skeleton.frame=ne.render.frame);const Le=be.update(b),Ue=b.material;if(D&&(Le.boundingSphere===null&&Le.computeBoundingSphere(),ee.copy(Le.boundingSphere.center).applyMatrix4(b.matrixWorld).applyMatrix4(X)),Array.isArray(Ue)){const Be=Le.groups;for(let Ge=0,He=Be.length;Ge<He;Ge++){const Ve=Be[Ge],je=Ue[Ve.materialIndex];je&&je.visible&&p.push(b,Le,je,Y,ee.z,Ve)}}else Ue.visible&&p.push(b,Le,Ue,Y,ee.z,null)}}const we=b.children;for(let Le=0,Ue=we.length;Le<Ue;Le++)yt(we[Le],B,Y,D)}function Mn(b,B,Y,D){const q=b.opaque,we=b.transmissive,Le=b.transparent;g.setupLightsView(Y),$===!0&&k.setGlobalState(d.clippingPlanes,Y),we.length>0&&ot(q,we,B,Y),D&&Se.viewport(F.copy(D)),q.length>0&&Ot(q,B,Y),we.length>0&&Ot(we,B,Y),Le.length>0&&Ot(Le,B,Y),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function ot(b,B,Y,D){if(pe===null){const Ue=le.isWebGL2;pe=new qn(1024,1024,{generateMipmaps:!0,type:Pe.has("EXT_color_buffer_half_float")?vr:Zn,minFilter:gr,samples:Ue&&o===!0?4:0})}const q=d.getRenderTarget();d.setRenderTarget(pe),d.clear();const we=d.toneMapping;d.toneMapping=vn,Ot(b,Y,D),te.updateMultisampleRenderTarget(pe),te.updateRenderTargetMipmap(pe);let Le=!1;for(let Ue=0,Be=B.length;Ue<Be;Ue++){const Ge=B[Ue],He=Ge.object,Ve=Ge.geometry,je=Ge.material,At=Ge.group;if(je.side===mn&&He.layers.test(D.layers)){const Gt=je.side;je.side=Et,je.needsUpdate=!0,Jt(He,Y,D,Ve,je,At),je.side=Gt,je.needsUpdate=!0,Le=!0}}Le===!0&&(te.updateMultisampleRenderTarget(pe),te.updateRenderTargetMipmap(pe)),d.setRenderTarget(q),d.toneMapping=we}function Ot(b,B,Y){const D=B.isScene===!0?B.overrideMaterial:null;for(let q=0,we=b.length;q<we;q++){const Le=b[q],Ue=Le.object,Be=Le.geometry,Ge=D===null?Le.material:D,He=Le.group;Ue.layers.test(Y.layers)&&Jt(Ue,B,Y,Be,Ge,He)}}function Jt(b,B,Y,D,q,we){b.onBeforeRender(d,B,Y,D,q,we),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(d,B,Y,D,b,we),q.transparent===!0&&q.side===mn&&q.forceSinglePass===!1?(q.side=Et,q.needsUpdate=!0,d.renderBufferDirect(Y,B,D,q,b,we),q.side=Cn,q.needsUpdate=!0,d.renderBufferDirect(Y,B,D,q,b,we),q.side=mn):d.renderBufferDirect(Y,B,D,q,b,we),b.onAfterRender(d,B,Y,D,q,we)}function Lr(b,B,Y){B.isScene!==!0&&(B=ue);const D=Z.get(b),q=g.state.lights,we=g.state.shadowsArray,Le=q.state.version,Ue=Ne.getParameters(b,q.state,we,B,Y),Be=Ne.getProgramCacheKey(Ue);let Ge=D.programs;D.environment=b.isMeshStandardMaterial?B.environment:null,D.fog=B.fog,D.envMap=(b.isMeshStandardMaterial?ce:_e).get(b.envMap||D.environment),Ge===void 0&&(b.addEventListener("dispose",st),Ge=new Map,D.programs=Ge);let He=Ge.get(Be);if(He!==void 0){if(D.currentProgram===He&&D.lightsStateVersion===Le)return Ma(b,Ue),He}else Ue.uniforms=Ne.getUniforms(b),b.onBuild(Y,Ue,d),b.onBeforeCompile(Ue,d),He=Ne.acquireProgram(Ue,Be),Ge.set(Be,He),D.uniforms=Ue.uniforms;const Ve=D.uniforms;(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ve.clippingPlanes=k.uniform),Ma(b,Ue),D.needsLights=mu(b),D.lightsStateVersion=Le,D.needsLights&&(Ve.ambientLightColor.value=q.state.ambient,Ve.lightProbe.value=q.state.probe,Ve.directionalLights.value=q.state.directional,Ve.directionalLightShadows.value=q.state.directionalShadow,Ve.spotLights.value=q.state.spot,Ve.spotLightShadows.value=q.state.spotShadow,Ve.rectAreaLights.value=q.state.rectArea,Ve.ltc_1.value=q.state.rectAreaLTC1,Ve.ltc_2.value=q.state.rectAreaLTC2,Ve.pointLights.value=q.state.point,Ve.pointLightShadows.value=q.state.pointShadow,Ve.hemisphereLights.value=q.state.hemi,Ve.directionalShadowMap.value=q.state.directionalShadowMap,Ve.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ve.spotShadowMap.value=q.state.spotShadowMap,Ve.spotLightMatrix.value=q.state.spotLightMatrix,Ve.spotLightMap.value=q.state.spotLightMap,Ve.pointShadowMap.value=q.state.pointShadowMap,Ve.pointShadowMatrix.value=q.state.pointShadowMatrix);const je=He.getUniforms(),At=ms.seqWithValue(je.seq,Ve);return D.currentProgram=He,D.uniformsList=At,He}function Ma(b,B){const Y=Z.get(b);Y.outputColorSpace=B.outputColorSpace,Y.instancing=B.instancing,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function du(b,B,Y,D,q){B.isScene!==!0&&(B=ue),te.resetTextureUnits();const we=B.fog,Le=D.isMeshStandardMaterial?B.environment:null,Ue=A===null?d.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:rn,Be=(D.isMeshStandardMaterial?ce:_e).get(D.envMap||Le),Ge=D.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,He=!!D.normalMap&&!!Y.attributes.tangent,Ve=!!Y.morphAttributes.position,je=!!Y.morphAttributes.normal,At=!!Y.morphAttributes.color,Gt=D.toneMapped?d.toneMapping:vn,Ln=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,lt=Ln!==void 0?Ln.length:0,Xe=Z.get(D),Ds=g.state.lights;if($===!0&&(ge===!0||b!==U)){const It=b===U&&D.id===C;k.setState(D,b,It)}let pt=!1;D.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Ds.state.version||Xe.outputColorSpace!==Ue||q.isInstancedMesh&&Xe.instancing===!1||!q.isInstancedMesh&&Xe.instancing===!0||q.isSkinnedMesh&&Xe.skinning===!1||!q.isSkinnedMesh&&Xe.skinning===!0||Xe.envMap!==Be||D.fog===!0&&Xe.fog!==we||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==k.numPlanes||Xe.numIntersection!==k.numIntersection)||Xe.vertexAlphas!==Ge||Xe.vertexTangents!==He||Xe.morphTargets!==Ve||Xe.morphNormals!==je||Xe.morphColors!==At||Xe.toneMapping!==Gt||le.isWebGL2===!0&&Xe.morphTargetsCount!==lt)&&(pt=!0):(pt=!0,Xe.__version=D.version);let In=Xe.currentProgram;pt===!0&&(In=Lr(D,B,q));let Ea=!1,Ji=!1,Ns=!1;const bt=In.getUniforms(),Un=Xe.uniforms;if(Se.useProgram(In.program)&&(Ea=!0,Ji=!0,Ns=!0),D.id!==C&&(C=D.id,Ji=!0),Ea||U!==b){if(bt.setValue(P,"projectionMatrix",b.projectionMatrix),le.logarithmicDepthBuffer&&bt.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),U!==b&&(U=b,Ji=!0,Ns=!0),D.isShaderMaterial||D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshStandardMaterial||D.envMap){const It=bt.map.cameraPosition;It!==void 0&&It.setValue(P,ee.setFromMatrixPosition(b.matrixWorld))}(D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshLambertMaterial||D.isMeshBasicMaterial||D.isMeshStandardMaterial||D.isShaderMaterial)&&bt.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),(D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshLambertMaterial||D.isMeshBasicMaterial||D.isMeshStandardMaterial||D.isShaderMaterial||D.isShadowMaterial||q.isSkinnedMesh)&&bt.setValue(P,"viewMatrix",b.matrixWorldInverse)}if(q.isSkinnedMesh){bt.setOptional(P,q,"bindMatrix"),bt.setOptional(P,q,"bindMatrixInverse");const It=q.skeleton;It&&(le.floatVertexTextures?(It.boneTexture===null&&It.computeBoneTexture(),bt.setValue(P,"boneTexture",It.boneTexture,te),bt.setValue(P,"boneTextureSize",It.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Os=Y.morphAttributes;if((Os.position!==void 0||Os.normal!==void 0||Os.color!==void 0&&le.isWebGL2===!0)&&fe.update(q,Y,In),(Ji||Xe.receiveShadow!==q.receiveShadow)&&(Xe.receiveShadow=q.receiveShadow,bt.setValue(P,"receiveShadow",q.receiveShadow)),D.isMeshGouraudMaterial&&D.envMap!==null&&(Un.envMap.value=Be,Un.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Ji&&(bt.setValue(P,"toneMappingExposure",d.toneMappingExposure),Xe.needsLights&&pu(Un,Ns),we&&D.fog===!0&&We.refreshFogUniforms(Un,we),We.refreshMaterialUniforms(Un,D,L,V,pe),ms.upload(P,Xe.uniformsList,Un,te)),D.isShaderMaterial&&D.uniformsNeedUpdate===!0&&(ms.upload(P,Xe.uniformsList,Un,te),D.uniformsNeedUpdate=!1),D.isSpriteMaterial&&bt.setValue(P,"center",q.center),bt.setValue(P,"modelViewMatrix",q.modelViewMatrix),bt.setValue(P,"normalMatrix",q.normalMatrix),bt.setValue(P,"modelMatrix",q.matrixWorld),D.isShaderMaterial||D.isRawShaderMaterial){const It=D.uniformsGroups;for(let Bs=0,gu=It.length;Bs<gu;Bs++)if(le.isWebGL2){const Aa=It[Bs];xe.update(Aa,In),xe.bind(Aa,In)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return In}function pu(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function mu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,B,Y){Z.get(b.texture).__webglTexture=B,Z.get(b.depthTexture).__webglTexture=Y;const D=Z.get(b);D.__hasExternalTextures=!0,D.__hasExternalTextures&&(D.__autoAllocateDepthBuffer=Y===void 0,D.__autoAllocateDepthBuffer||Pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),D.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,B){const Y=Z.get(b);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,Y=0){A=b,_=B,y=Y;let D=!0,q=null,we=!1,Le=!1;if(b){const Be=Z.get(b);Be.__useDefaultFramebuffer!==void 0?(Se.bindFramebuffer(P.FRAMEBUFFER,null),D=!1):Be.__webglFramebuffer===void 0?te.setupRenderTarget(b):Be.__hasExternalTextures&&te.rebindTextures(b,Z.get(b.texture).__webglTexture,Z.get(b.depthTexture).__webglTexture);const Ge=b.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Le=!0);const He=Z.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(q=He[B],we=!0):le.isWebGL2&&b.samples>0&&te.useMultisampledRTT(b)===!1?q=Z.get(b).__webglMultisampledFramebuffer:q=He,F.copy(b.viewport),x.copy(b.scissor),E=b.scissorTest}else F.copy(Q).multiplyScalar(L).floor(),x.copy(z).multiplyScalar(L).floor(),E=W;if(Se.bindFramebuffer(P.FRAMEBUFFER,q)&&le.drawBuffers&&D&&Se.drawBuffers(b,q),Se.viewport(F),Se.scissor(x),Se.setScissorTest(E),we){const Be=Z.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+B,Be.__webglTexture,Y)}else if(Le){const Be=Z.get(b.texture),Ge=B||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Be.__webglTexture,Y||0,Ge)}C=-1},this.readRenderTargetPixels=function(b,B,Y,D,q,we,Le){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Z.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue){Se.bindFramebuffer(P.FRAMEBUFFER,Ue);try{const Be=b.texture,Ge=Be.format,He=Be.type;if(Ge!==jt&&H.convert(Ge)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=He===vr&&(Pe.has("EXT_color_buffer_half_float")||le.isWebGL2&&Pe.has("EXT_color_buffer_float"));if(He!==Zn&&H.convert(He)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(He===Vn&&(le.isWebGL2||Pe.has("OES_texture_float")||Pe.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-D&&Y>=0&&Y<=b.height-q&&P.readPixels(B,Y,D,q,H.convert(Ge),H.convert(He),we)}finally{const Be=A!==null?Z.get(A).__webglFramebuffer:null;Se.bindFramebuffer(P.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(b,B,Y=0){const D=Math.pow(2,-Y),q=Math.floor(B.image.width*D),we=Math.floor(B.image.height*D);te.setTexture2D(B,0),P.copyTexSubImage2D(P.TEXTURE_2D,Y,0,0,b.x,b.y,q,we),Se.unbindTexture()},this.copyTextureToTexture=function(b,B,Y,D=0){const q=B.image.width,we=B.image.height,Le=H.convert(Y.format),Ue=H.convert(Y.type);te.setTexture2D(Y,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,Y.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,Y.unpackAlignment),B.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,D,b.x,b.y,q,we,Le,Ue,B.image.data):B.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,D,b.x,b.y,B.mipmaps[0].width,B.mipmaps[0].height,Le,B.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,D,b.x,b.y,Le,Ue,B.image),D===0&&Y.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Se.unbindTexture()},this.copyTextureToTexture3D=function(b,B,Y,D,q=0){if(d.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const we=b.max.x-b.min.x+1,Le=b.max.y-b.min.y+1,Ue=b.max.z-b.min.z+1,Be=H.convert(D.format),Ge=H.convert(D.type);let He;if(D.isData3DTexture)te.setTexture3D(D,0),He=P.TEXTURE_3D;else if(D.isDataArrayTexture)te.setTexture2DArray(D,0),He=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const Ve=P.getParameter(P.UNPACK_ROW_LENGTH),je=P.getParameter(P.UNPACK_IMAGE_HEIGHT),At=P.getParameter(P.UNPACK_SKIP_PIXELS),Gt=P.getParameter(P.UNPACK_SKIP_ROWS),Ln=P.getParameter(P.UNPACK_SKIP_IMAGES),lt=Y.isCompressedTexture?Y.mipmaps[0]:Y.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,lt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,lt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,b.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,b.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,b.min.z),Y.isDataTexture||Y.isData3DTexture?P.texSubImage3D(He,q,B.x,B.y,B.z,we,Le,Ue,Be,Ge,lt.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(He,q,B.x,B.y,B.z,we,Le,Ue,Be,lt.data)):P.texSubImage3D(He,q,B.x,B.y,B.z,we,Le,Ue,Be,Ge,lt),P.pixelStorei(P.UNPACK_ROW_LENGTH,Ve),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,je),P.pixelStorei(P.UNPACK_SKIP_PIXELS,At),P.pixelStorei(P.UNPACK_SKIP_ROWS,Gt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ln),q===0&&D.generateMipmaps&&P.generateMipmap(He),Se.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?te.setTextureCube(b,0):b.isData3DTexture?te.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?te.setTexture2DArray(b,0):te.setTexture2D(b,0),Se.unbindTexture()},this.resetState=function(){_=0,y=0,A=null,Se.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Oe?Wn:Kc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Wn?Oe:rn}}class Pv extends gh{}Pv.prototype.isWebGL1Renderer=!0;class Lv extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class vh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Io,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=nn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=nn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new T;class tn{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),r=Je(r,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new rt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new tn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ts extends qt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ai;const tr=new T,bi=new T,wi=new T,Ti=new ae,nr=new ae,_h=new et,Kr=new T,ir=new T,$r=new T,Gl=new ae,fo=new ae,Hl=new ae;class Oi extends ut{constructor(e){if(super(),this.isSprite=!0,this.type="Sprite",Ai===void 0){Ai=new tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vh(t,5);Ai.setIndex([0,1,2,0,2,3]),Ai.setAttribute("position",new tn(n,3,0,!1)),Ai.setAttribute("uv",new tn(n,2,3,!1))}this.geometry=Ai,this.material=e!==void 0?e:new Ts,this.center=new ae(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bi.setFromMatrixScale(this.matrixWorld),_h.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bi.multiplyScalar(-wi.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const a=this.center;es(Kr.set(-.5,-.5,0),wi,a,bi,r,s),es(ir.set(.5,-.5,0),wi,a,bi,r,s),es($r.set(.5,.5,0),wi,a,bi,r,s),Gl.set(0,0),fo.set(1,0),Hl.set(1,1);let o=e.ray.intersectTriangle(Kr,ir,$r,!1,tr);if(o===null&&(es(ir.set(-.5,.5,0),wi,a,bi,r,s),fo.set(0,1),o=e.ray.intersectTriangle(Kr,$r,ir,!1,tr),o===null))return;const l=e.ray.origin.distanceTo(tr);l<e.near||l>e.far||t.push({distance:l,point:tr.clone(),uv:zt.getInterpolation(tr,Kr,ir,$r,Gl,fo,Hl,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function es(i,e,t,n,r,s){Ti.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(nr.x=s*Ti.x-r*Ti.y,nr.y=r*Ti.x+s*Ti.y):nr.copy(Ti),i.copy(e),i.x+=nr.x,i.y+=nr.y,i.applyMatrix4(_h)}class ji extends qt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Vl=new T,kl=new T,Wl=new et,po=new As,ts=new ti;class Jn extends ut{constructor(e=new tt,t=new ji){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Vl.fromBufferAttribute(t,r-1),kl.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Vl.distanceTo(kl);e.setAttribute("lineDistance",new at(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,e.ray.intersectsSphere(ts)===!1)return;Wl.copy(r).invert(),po.copy(e.ray).applyMatrix4(Wl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new T,h=new T,u=new T,f=new T,p=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const d=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let _=d,y=M-1;_<y;_+=p){const A=g.getX(_),C=g.getX(_+1);if(c.fromBufferAttribute(m,A),h.fromBufferAttribute(m,C),po.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(f);F<e.near||F>e.far||t.push({distance:F,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let _=d,y=M-1;_<y;_+=p){if(c.fromBufferAttribute(m,_),h.fromBufferAttribute(m,_+1),po.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(f);C<e.near||C>e.far||t.push({distance:C,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Xl=new T,jl=new T;class Iv extends Jn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Xl.fromBufferAttribute(t,r),jl.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Xl.distanceTo(jl);e.setAttribute("lineDistance",new at(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yh extends Jn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Cs extends qt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Yl=new et,Oo=new As,ns=new ti,is=new T;class sa extends ut{constructor(e=new tt,t=new Cs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(r),ns.radius+=s,e.ray.intersectsSphere(ns)===!1)return;Yl.copy(r).invert(),Oo.copy(e.ray).applyMatrix4(Yl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,v=p;g<v;g++){const m=c.getX(g);is.fromBufferAttribute(u,m),Zl(is,m,l,r,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,v=p;g<v;g++)is.fromBufferAttribute(u,g),Zl(is,g,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Zl(i,e,t,n,r,s,a){const o=Oo.distanceSqToPoint(i);if(o<t){const l=new T;Oo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Uv extends Pt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class on{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const h=n[r],f=n[r+1]-h,p=(a-h)/f;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new ae:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new T,r=[],s=[],a=[],o=new T,l=new et;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new T)}s[0]=new T,a[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ht(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(ht(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class oa extends on{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const n=t||new ae,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class _s extends oa{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function aa(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let f=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,p*=h,r(a,o,f,p)},calc:function(s){const a=s*s,o=a*s;return i+e*s+t*a+n*o}}}const rs=new T,mo=new aa,go=new aa,vo=new aa;class la extends on{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new T){const n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(rs.subVectors(r[0],r[1]).add(r[0]),c=rs);const u=r[o%s],f=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(rs.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=rs),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),mo.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,v,m),go.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,v,m),vo.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(mo.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),go.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),vo.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(mo.calc(l),go.calc(l),vo.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new T().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ql(i,e,t,n,r){const s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function Dv(i,e){const t=1-i;return t*t*e}function Nv(i,e){return 2*(1-i)*i*e}function Ov(i,e){return i*i*e}function fr(i,e,t,n){return Dv(i,e)+Nv(i,t)+Ov(i,n)}function Bv(i,e){const t=1-i;return t*t*t*e}function Fv(i,e){const t=1-i;return 3*t*t*i*e}function zv(i,e){return 3*(1-i)*i*i*e}function Gv(i,e){return i*i*i*e}function dr(i,e,t,n,r){return Bv(i,e)+Fv(i,t)+zv(i,n)+Gv(i,r)}class xh extends on{constructor(e=new ae,t=new ae,n=new ae,r=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ae){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,r.x,s.x,a.x,o.x),dr(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Hv extends on{constructor(e=new T,t=new T,n=new T,r=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new T){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(dr(e,r.x,s.x,a.x,o.x),dr(e,r.y,s.y,a.y,o.y),dr(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ca extends on{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vv extends on{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Sh extends on{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(fr(e,r.x,s.x,a.x),fr(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mh extends on{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(fr(e,r.x,s.x,a.x),fr(e,r.y,s.y,a.y),fr(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Eh extends on{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){const n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ql(o,l.x,c.x,h.x,u.x),ql(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ae().fromArray(r))}return this}}var Ah=Object.freeze({__proto__:null,ArcCurve:_s,CatmullRomCurve3:la,CubicBezierCurve:xh,CubicBezierCurve3:Hv,EllipseCurve:oa,LineCurve:ca,LineCurve3:Vv,QuadraticBezierCurve:Sh,QuadraticBezierCurve3:Mh,SplineCurve:Eh});class kv extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new ca(t,e))}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new Ah[r.type]().fromJSON(r))}return this}}class Jl extends kv{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new ca(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Sh(this.currentPoint.clone(),new ae(e,t),new ae(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,a){const o=new xh(this.currentPoint.clone(),new ae(e,t),new ae(n,r),new ae(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Eh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,r,s,a),this}absarc(e,t,n,r,s,a){return this.absellipse(e,t,n,n,r,s,a),this}ellipse(e,t,n,r,s,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,r,s,a,o,l),this}absellipse(e,t,n,r,s,a,o,l){const c=new oa(e,t,n,r,s,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class bh extends Jl{constructor(e){super(e),this.uuid=nn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Jl().fromJSON(r))}return this}}const Wv={triangulate:function(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=wh(i,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,f,p;if(n&&(s=qv(i,e,s,t)),i.length>80*t){o=c=i[0],l=h=i[1];for(let g=t;g<r;g+=t)u=i[g],f=i[g+1],u<o&&(o=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return xr(s,a,t,o,l,p,0),a}};function wh(i,e,t,n,r){let s,a;if(r===o_(i,e,t,n)>0)for(s=e;s<t;s+=n)a=Ql(s,i[s],i[s+1],a);else for(s=t-n;s>=e;s-=n)a=Ql(s,i[s],i[s+1],a);return a&&Rs(a,a.next)&&(Mr(a),a=a.next),a}function Qn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Rs(t,t.next)||nt(t.prev,t,t.next)===0)){if(Mr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function xr(i,e,t,n,r,s,a){if(!i)return;!a&&s&&e_(i,n,r,s);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?jv(i,n,r,s):Xv(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),Mr(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Yv(Qn(i),e,t),xr(i,e,t,n,r,s,2)):a===2&&Zv(i,e,t,n,r,s):xr(Qn(i),e,t,n,r,s,1);break}}}function Xv(i){const e=i.prev,t=i,n=i.next;if(nt(e,t,n)>=0)return!1;const r=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=r<s?r<a?r:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,f=r>s?r>a?r:a:s>a?s:a,p=o>l?o>c?o:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&Li(r,o,s,l,a,c,g.x,g.y)&&nt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function jv(i,e,t,n){const r=i.prev,s=i,a=i.next;if(nt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,h=r.y,u=s.y,f=a.y,p=o<l?o<c?o:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,v=o>l?o>c?o:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,d=Bo(p,g,e,t,n),M=Bo(v,m,e,t,n);let _=i.prevZ,y=i.nextZ;for(;_&&_.z>=d&&y&&y.z<=M;){if(_.x>=p&&_.x<=v&&_.y>=g&&_.y<=m&&_!==r&&_!==a&&Li(o,h,l,u,c,f,_.x,_.y)&&nt(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=p&&y.x<=v&&y.y>=g&&y.y<=m&&y!==r&&y!==a&&Li(o,h,l,u,c,f,y.x,y.y)&&nt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=d;){if(_.x>=p&&_.x<=v&&_.y>=g&&_.y<=m&&_!==r&&_!==a&&Li(o,h,l,u,c,f,_.x,_.y)&&nt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=M;){if(y.x>=p&&y.x<=v&&y.y>=g&&y.y<=m&&y!==r&&y!==a&&Li(o,h,l,u,c,f,y.x,y.y)&&nt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Yv(i,e,t){let n=i;do{const r=n.prev,s=n.next.next;!Rs(r,s)&&Th(r,n,n.next,s)&&Sr(r,s)&&Sr(s,r)&&(e.push(r.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Mr(n),Mr(n.next),n=i=s),n=n.next}while(n!==i);return Qn(n)}function Zv(i,e,t,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&i_(a,o)){let l=Ch(a,o);a=Qn(a,a.next),l=Qn(l,l.next),xr(a,e,t,n,r,s,0),xr(l,e,t,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function qv(i,e,t,n){const r=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*n,l=s<a-1?e[s+1]*n:i.length,c=wh(i,o,l,n,!1),c===c.next&&(c.steiner=!0),r.push(n_(c));for(r.sort(Jv),s=0;s<r.length;s++)t=Qv(r[s],t);return t}function Jv(i,e){return i.x-e.x}function Qv(i,e){const t=Kv(i,e);if(!t)return e;const n=Ch(t,i);return Qn(n,n.next),Qn(t,t.next)}function Kv(i,e){let t=e,n=-1/0,r;const s=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const f=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=s&&f>n&&(n=f,r=t.x<t.next.x?t:t.next,f===s))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let h=1/0,u;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&Li(a<c?s:n,a,l,c,a<c?n:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),Sr(t,i)&&(u<h||u===h&&(t.x>r.x||t.x===r.x&&$v(r,t)))&&(r=t,h=u)),t=t.next;while(t!==o);return r}function $v(i,e){return nt(i.prev,i,e.prev)<0&&nt(e.next,i,i.next)<0}function e_(i,e,t,n){let r=i;do r.z===0&&(r.z=Bo(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,t_(r)}function t_(i){let e,t,n,r,s,a,o,l,c=1;do{for(t=i,i=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<c&&(o++,n=n.nextZ,!!n);e++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||t.z<=n.z)?(r=t,t=t.nextZ,o--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;t=n}s.nextZ=null,c*=2}while(a>1);return i}function Bo(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function n_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Li(i,e,t,n,r,s,a,o){return(r-a)*(e-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(n-o)}function i_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!r_(i,e)&&(Sr(i,e)&&Sr(e,i)&&s_(i,e)&&(nt(i.prev,i,e.prev)||nt(i,e.prev,e))||Rs(i,e)&&nt(i.prev,i,i.next)>0&&nt(e.prev,e,e.next)>0)}function nt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Rs(i,e){return i.x===e.x&&i.y===e.y}function Th(i,e,t,n){const r=os(nt(i,e,t)),s=os(nt(i,e,n)),a=os(nt(t,n,i)),o=os(nt(t,n,e));return!!(r!==s&&a!==o||r===0&&ss(i,t,e)||s===0&&ss(i,n,e)||a===0&&ss(t,i,n)||o===0&&ss(t,e,n))}function ss(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function os(i){return i>0?1:i<0?-1:0}function r_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Th(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Sr(i,e){return nt(i.prev,i,i.next)<0?nt(i,e,i.next)>=0&&nt(i,i.prev,e)>=0:nt(i,e,i.prev)<0||nt(i,i.next,e)<0}function s_(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ch(i,e){const t=new Fo(i.i,i.x,i.y),n=new Fo(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Ql(i,e,t,n){const r=new Fo(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Mr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fo(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function o_(i,e,t,n){let r=0;for(let s=e,a=t-n;s<t;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class pr{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return pr.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];Kl(e),$l(n,e);let a=e.length;t.forEach(Kl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,$l(n,t[l]);const o=Wv.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Kl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function $l(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ha extends tt{constructor(e=new bh([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new at(r,3)),this.setAttribute("uv",new at(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:a_;let _,y=!1,A,C,U,F;d&&(_=d.getSpacedPoints(h),y=!0,f=!1,A=d.computeFrenetFrames(h,!1),C=new T,U=new T,F=new T),f||(m=0,p=0,g=0,v=0);const x=o.extractPoints(c);let E=x.shape;const O=x.holes;if(!pr.isClockWise(E)){E=E.reverse();for(let ne=0,Z=O.length;ne<Z;ne++){const te=O[ne];pr.isClockWise(te)&&(O[ne]=te.reverse())}}const L=pr.triangulateShape(E,O),N=E;for(let ne=0,Z=O.length;ne<Z;ne++){const te=O[ne];E=E.concat(te)}function G(ne,Z,te){return Z||console.error("THREE.ExtrudeGeometry: vec does not exist"),ne.clone().addScaledVector(Z,te)}const Q=E.length,z=L.length;function W(ne,Z,te){let _e,ce,Te;const Ce=ne.x-Z.x,be=ne.y-Z.y,Ne=te.x-ne.x,We=te.y-ne.y,w=Ce*Ce+be*be,S=Ce*We-be*Ne;if(Math.abs(S)>Number.EPSILON){const k=Math.sqrt(w),re=Math.sqrt(Ne*Ne+We*We),se=Z.x-be/k,fe=Z.y+Ce/k,R=te.x-We/re,J=te.y+Ne/re,H=((R-se)*We-(J-fe)*Ne)/(Ce*We-be*Ne);_e=se+Ce*H-ne.x,ce=fe+be*H-ne.y;const de=_e*_e+ce*ce;if(de<=2)return new ae(_e,ce);Te=Math.sqrt(de/2)}else{let k=!1;Ce>Number.EPSILON?Ne>Number.EPSILON&&(k=!0):Ce<-Number.EPSILON?Ne<-Number.EPSILON&&(k=!0):Math.sign(be)===Math.sign(We)&&(k=!0),k?(_e=-be,ce=Ce,Te=Math.sqrt(w)):(_e=Ce,ce=be,Te=Math.sqrt(w/2))}return new ae(_e/Te,ce/Te)}const K=[];for(let ne=0,Z=N.length,te=Z-1,_e=ne+1;ne<Z;ne++,te++,_e++)te===Z&&(te=0),_e===Z&&(_e=0),K[ne]=W(N[ne],N[te],N[_e]);const $=[];let ge,pe=K.concat();for(let ne=0,Z=O.length;ne<Z;ne++){const te=O[ne];ge=[];for(let _e=0,ce=te.length,Te=ce-1,Ce=_e+1;_e<ce;_e++,Te++,Ce++)Te===ce&&(Te=0),Ce===ce&&(Ce=0),ge[_e]=W(te[_e],te[Te],te[Ce]);$.push(ge),pe=pe.concat(ge)}for(let ne=0;ne<m;ne++){const Z=ne/m,te=p*Math.cos(Z*Math.PI/2),_e=g*Math.sin(Z*Math.PI/2)+v;for(let ce=0,Te=N.length;ce<Te;ce++){const Ce=G(N[ce],K[ce],_e);P(Ce.x,Ce.y,-te)}for(let ce=0,Te=O.length;ce<Te;ce++){const Ce=O[ce];ge=$[ce];for(let be=0,Ne=Ce.length;be<Ne;be++){const We=G(Ce[be],ge[be],_e);P(We.x,We.y,-te)}}}const X=g+v;for(let ne=0;ne<Q;ne++){const Z=f?G(E[ne],pe[ne],X):E[ne];y?(U.copy(A.normals[0]).multiplyScalar(Z.x),C.copy(A.binormals[0]).multiplyScalar(Z.y),F.copy(_[0]).add(U).add(C),P(F.x,F.y,F.z)):P(Z.x,Z.y,0)}for(let ne=1;ne<=h;ne++)for(let Z=0;Z<Q;Z++){const te=f?G(E[Z],pe[Z],X):E[Z];y?(U.copy(A.normals[ne]).multiplyScalar(te.x),C.copy(A.binormals[ne]).multiplyScalar(te.y),F.copy(_[ne]).add(U).add(C),P(F.x,F.y,F.z)):P(te.x,te.y,u/h*ne)}for(let ne=m-1;ne>=0;ne--){const Z=ne/m,te=p*Math.cos(Z*Math.PI/2),_e=g*Math.sin(Z*Math.PI/2)+v;for(let ce=0,Te=N.length;ce<Te;ce++){const Ce=G(N[ce],K[ce],_e);P(Ce.x,Ce.y,u+te)}for(let ce=0,Te=O.length;ce<Te;ce++){const Ce=O[ce];ge=$[ce];for(let be=0,Ne=Ce.length;be<Ne;be++){const We=G(Ce[be],ge[be],_e);y?P(We.x,We.y+_[h-1].y,_[h-1].x+te):P(We.x,We.y,u+te)}}}ee(),ue();function ee(){const ne=r.length/3;if(f){let Z=0,te=Q*Z;for(let _e=0;_e<z;_e++){const ce=L[_e];Re(ce[2]+te,ce[1]+te,ce[0]+te)}Z=h+m*2,te=Q*Z;for(let _e=0;_e<z;_e++){const ce=L[_e];Re(ce[0]+te,ce[1]+te,ce[2]+te)}}else{for(let Z=0;Z<z;Z++){const te=L[Z];Re(te[2],te[1],te[0])}for(let Z=0;Z<z;Z++){const te=L[Z];Re(te[0]+Q*h,te[1]+Q*h,te[2]+Q*h)}}n.addGroup(ne,r.length/3-ne,0)}function ue(){const ne=r.length/3;let Z=0;me(N,Z),Z+=N.length;for(let te=0,_e=O.length;te<_e;te++){const ce=O[te];me(ce,Z),Z+=ce.length}n.addGroup(ne,r.length/3-ne,1)}function me(ne,Z){let te=ne.length;for(;--te>=0;){const _e=te;let ce=te-1;ce<0&&(ce=ne.length-1);for(let Te=0,Ce=h+m*2;Te<Ce;Te++){const be=Q*Te,Ne=Q*(Te+1),We=Z+_e+be,w=Z+ce+be,S=Z+ce+Ne,k=Z+_e+Ne;Pe(We,w,S,k)}}}function P(ne,Z,te){l.push(ne),l.push(Z),l.push(te)}function Re(ne,Z,te){le(ne),le(Z),le(te);const _e=r.length/3,ce=M.generateTopUV(n,r,_e-3,_e-2,_e-1);Se(ce[0]),Se(ce[1]),Se(ce[2])}function Pe(ne,Z,te,_e){le(ne),le(Z),le(_e),le(Z),le(te),le(_e);const ce=r.length/3,Te=M.generateSideWallUV(n,r,ce-6,ce-3,ce-2,ce-1);Se(Te[0]),Se(Te[1]),Se(Te[3]),Se(Te[1]),Se(Te[2]),Se(Te[3])}function le(ne){r.push(l[ne*3+0]),r.push(l[ne*3+1]),r.push(l[ne*3+2])}function Se(ne){s.push(ne.x),s.push(ne.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return l_(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Ah[r.type]().fromJSON(r)),new ha(n,e.options)}}const a_={generateTopUV:function(i,e,t,n,r){const s=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[r*3],h=e[r*3+1];return[new ae(s,a),new ae(o,l),new ae(c,h)]},generateSideWallUV:function(i,e,t,n,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[r*3],p=e[r*3+1],g=e[r*3+2],v=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ae(a,1-l),new ae(c,1-u),new ae(f,1-g),new ae(v,1-d)]:[new ae(o,1-l),new ae(h,1-u),new ae(p,1-g),new ae(m,1-d)]}};function l_(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ys extends tt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new T,f=new T,p=[],g=[],v=[],m=[];for(let d=0;d<=n;d++){const M=[],_=d/n;let y=0;d===0&&a===0?y=.5/t:d===n&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const C=A/t;u.x=-e*Math.cos(r+C*s)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+C*s)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),m.push(C+y,1-_),M.push(c++)}h.push(M)}for(let d=0;d<n;d++)for(let M=0;M<t;M++){const _=h[d][M+1],y=h[d][M],A=h[d+1][M],C=h[d+1][M+1];(d!==0||a>0)&&p.push(_,y,C),(d!==n-1||l<Math.PI)&&p.push(y,A,C)}this.setIndex(p),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ys(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class c_ extends tt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],n=new Set,r=new T,s=new T;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){const u=l[c],f=u.start,p=u.count;for(let g=f,v=f+p;g<v;g+=3)for(let m=0;m<3;m++){const d=o.getX(g+m),M=o.getX(g+(m+1)%3);r.fromBufferAttribute(a,d),s.fromBufferAttribute(a,M),ec(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const h=3*o+c,u=3*o+(c+1)%3;r.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),ec(r,s,n)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new at(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function ec(i,e,t){const n=`${i.x},${i.y},${i.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${i.x},${i.y},${i.z}`;return t.has(n)===!0||t.has(r)===!0?!1:(t.add(n),t.add(r),!0)}class Er extends qt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new De(16777215),this.specular=new De(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ms,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rh extends qt{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class xs extends qt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ms,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ua extends qt{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new De(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tr,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}}const tc={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class h_{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const u_=new h_;class Ph{constructor(e){this.manager=e!==void 0?e:u_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}class f_ extends Ph{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=tc.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=yr("img");function l(){h(),tc.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Yi extends Ph{constructor(e){super(e)}load(e,t,n,r){const s=new Pt,a=new f_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class fa extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const _o=new et,nc=new T,ic=new T;class Lh{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new na,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;nc.setFromMatrixPosition(e.matrixWorld),t.position.copy(nc),ic.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ic),t.updateMatrixWorld(),_o.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_o),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_o)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const rc=new et,rr=new T,yo=new T;class d_ extends Lh{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ae(4,2),this._viewportCount=6,this._viewports=[new Ye(2,1,1,1),new Ye(0,1,1,1),new Ye(3,1,1,1),new Ye(1,1,1,1),new Ye(3,0,1,1),new Ye(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),rr.setFromMatrixPosition(e.matrixWorld),n.position.copy(rr),yo.copy(n.position),yo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(yo),n.updateMatrixWorld(),r.makeTranslation(-rr.x,-rr.y,-rr.z),rc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rc)}}class p_ extends fa{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new d_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class m_ extends Lh{constructor(){super(new ia(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sc extends fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new m_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class g_ extends fa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class v_ extends tt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class __{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=oc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=oc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function oc(){return(typeof performance>"u"?Date:performance).now()}class zo extends vh{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){const t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){const t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}}class Ih{constructor(e,t,n=0,r=1/0){this.ray=new As(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ea,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Go(e,this,n,t),n.sort(ac),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Go(e[r],this,n,t);return n.sort(ac),n}}function ac(i,e){return i.distance-e.distance}function Go(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const r=i.children;for(let s=0,a=r.length;s<a;s++)Go(r[s],e,t,!0)}}class lc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const cc=new T,as=new T;class y_{constructor(e=new T,t=new T){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){cc.subVectors(e,this.start),as.subVectors(this.end,this.start);const n=as.dot(as);let s=as.dot(cc)/n;return t&&(s=ht(s,0,1)),s}closestPointToPoint(e,t,n){const r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class x_ extends Iv{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],r=new tt;r.setAttribute("position",new at(t,3)),r.setAttribute("color",new at(n,3));const s=new ji({vertexColors:!0,toneMapped:!1});super(r,s),this.type="AxesHelper"}setColors(e,t,n){const r=new De,s=this.geometry.attributes.color.array;return r.set(e),r.toArray(s,0),r.toArray(s,3),r.set(t),r.toArray(s,6),r.toArray(s,9),r.set(n),r.toArray(s,12),r.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ko}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ko);const hc={type:"change"},xo={type:"start"},uc={type:"end"};class S_ extends ei{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new T,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:oi.ROTATE,MIDDLE:oi.DOLLY,RIGHT:oi.PAN},this.touches={ONE:ai.ROTATE,TWO:ai.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Ne),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ne),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(hc),n.update(),s=r.NONE},this.update=(function(){const R=new T,J=new yn().setFromUnitVectors(e.up,new T(0,1,0)),H=J.clone().invert(),de=new T,xe=new yn,Ee=2*Math.PI;return function(){const Me=n.object.position;R.copy(Me).sub(n.target),R.applyQuaternion(J),o.setFromVector3(R),n.autoRotate&&s===r.NONE&&x(U()),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Ie=n.minAzimuthAngle,ze=n.maxAzimuthAngle;return isFinite(Ie)&&isFinite(ze)&&(Ie<-Math.PI?Ie+=Ee:Ie>Math.PI&&(Ie-=Ee),ze<-Math.PI?ze+=Ee:ze>Math.PI&&(ze-=Ee),Ie<=ze?o.theta=Math.max(Ie,Math.min(ze,o.theta)):o.theta=o.theta>(Ie+ze)/2?Math.max(Ie,o.theta):Math.min(ze,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(n.minDistance,Math.min(n.maxDistance,o.radius)),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),R.setFromSpherical(o),R.applyQuaternion(H),Me.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),c=1,u||de.distanceToSquared(n.object.position)>a||8*(1-xe.dot(n.object.quaternion))>a?(n.dispatchEvent(hc),de.copy(n.object.position),xe.copy(n.object.quaternion),u=!1,!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",S),n.domElement.removeEventListener("pointerdown",te),n.domElement.removeEventListener("pointercancel",ce),n.domElement.removeEventListener("wheel",be),n.domElement.removeEventListener("pointermove",_e),n.domElement.removeEventListener("pointerup",ce),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ne),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new lc,l=new lc;let c=1;const h=new T;let u=!1;const f=new ae,p=new ae,g=new ae,v=new ae,m=new ae,d=new ae,M=new ae,_=new ae,y=new ae,A=[],C={};function U(){return 2*Math.PI/60/60*n.autoRotateSpeed}function F(){return Math.pow(.95,n.zoomSpeed)}function x(R){l.theta-=R}function E(R){l.phi-=R}const O=(function(){const R=new T;return function(H,de){R.setFromMatrixColumn(de,0),R.multiplyScalar(-H),h.add(R)}})(),V=(function(){const R=new T;return function(H,de){n.screenSpacePanning===!0?R.setFromMatrixColumn(de,1):(R.setFromMatrixColumn(de,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(H),h.add(R)}})(),L=(function(){const R=new T;return function(H,de){const xe=n.domElement;if(n.object.isPerspectiveCamera){const Ee=n.object.position;R.copy(Ee).sub(n.target);let ve=R.length();ve*=Math.tan(n.object.fov/2*Math.PI/180),O(2*H*ve/xe.clientHeight,n.object.matrix),V(2*de*ve/xe.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(O(H*(n.object.right-n.object.left)/n.object.zoom/xe.clientWidth,n.object.matrix),V(de*(n.object.top-n.object.bottom)/n.object.zoom/xe.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function N(R){n.object.isPerspectiveCamera?c/=R:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*R)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function G(R){n.object.isPerspectiveCamera?c*=R:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/R)),n.object.updateProjectionMatrix(),u=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Q(R){f.set(R.clientX,R.clientY)}function z(R){M.set(R.clientX,R.clientY)}function W(R){v.set(R.clientX,R.clientY)}function K(R){p.set(R.clientX,R.clientY),g.subVectors(p,f).multiplyScalar(n.rotateSpeed);const J=n.domElement;x(2*Math.PI*g.x/J.clientHeight),E(2*Math.PI*g.y/J.clientHeight),f.copy(p),n.update()}function $(R){_.set(R.clientX,R.clientY),y.subVectors(_,M),y.y>0?N(F()):y.y<0&&G(F()),M.copy(_),n.update()}function ge(R){m.set(R.clientX,R.clientY),d.subVectors(m,v).multiplyScalar(n.panSpeed),L(d.x,d.y),v.copy(m),n.update()}function pe(R){R.deltaY<0?G(F()):R.deltaY>0&&N(F()),n.update()}function X(R){let J=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?E(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):L(0,n.keyPanSpeed),J=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?E(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):L(0,-n.keyPanSpeed),J=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?x(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):L(n.keyPanSpeed,0),J=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?x(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):L(-n.keyPanSpeed,0),J=!0;break}J&&(R.preventDefault(),n.update())}function ee(){if(A.length===1)f.set(A[0].pageX,A[0].pageY);else{const R=.5*(A[0].pageX+A[1].pageX),J=.5*(A[0].pageY+A[1].pageY);f.set(R,J)}}function ue(){if(A.length===1)v.set(A[0].pageX,A[0].pageY);else{const R=.5*(A[0].pageX+A[1].pageX),J=.5*(A[0].pageY+A[1].pageY);v.set(R,J)}}function me(){const R=A[0].pageX-A[1].pageX,J=A[0].pageY-A[1].pageY,H=Math.sqrt(R*R+J*J);M.set(0,H)}function P(){n.enableZoom&&me(),n.enablePan&&ue()}function Re(){n.enableZoom&&me(),n.enableRotate&&ee()}function Pe(R){if(A.length==1)p.set(R.pageX,R.pageY);else{const H=fe(R),de=.5*(R.pageX+H.x),xe=.5*(R.pageY+H.y);p.set(de,xe)}g.subVectors(p,f).multiplyScalar(n.rotateSpeed);const J=n.domElement;x(2*Math.PI*g.x/J.clientHeight),E(2*Math.PI*g.y/J.clientHeight),f.copy(p)}function le(R){if(A.length===1)m.set(R.pageX,R.pageY);else{const J=fe(R),H=.5*(R.pageX+J.x),de=.5*(R.pageY+J.y);m.set(H,de)}d.subVectors(m,v).multiplyScalar(n.panSpeed),L(d.x,d.y),v.copy(m)}function Se(R){const J=fe(R),H=R.pageX-J.x,de=R.pageY-J.y,xe=Math.sqrt(H*H+de*de);_.set(0,xe),y.set(0,Math.pow(_.y/M.y,n.zoomSpeed)),N(y.y),M.copy(_)}function ne(R){n.enableZoom&&Se(R),n.enablePan&&le(R)}function Z(R){n.enableZoom&&Se(R),n.enableRotate&&Pe(R)}function te(R){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",_e),n.domElement.addEventListener("pointerup",ce)),k(R),R.pointerType==="touch"?We(R):Te(R))}function _e(R){n.enabled!==!1&&(R.pointerType==="touch"?w(R):Ce(R))}function ce(R){re(R),A.length===0&&(n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",_e),n.domElement.removeEventListener("pointerup",ce)),n.dispatchEvent(uc),s=r.NONE}function Te(R){let J;switch(R.button){case 0:J=n.mouseButtons.LEFT;break;case 1:J=n.mouseButtons.MIDDLE;break;case 2:J=n.mouseButtons.RIGHT;break;default:J=-1}switch(J){case oi.DOLLY:if(n.enableZoom===!1)return;z(R),s=r.DOLLY;break;case oi.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;W(R),s=r.PAN}else{if(n.enableRotate===!1)return;Q(R),s=r.ROTATE}break;case oi.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;Q(R),s=r.ROTATE}else{if(n.enablePan===!1)return;W(R),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(xo)}function Ce(R){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;K(R);break;case r.DOLLY:if(n.enableZoom===!1)return;$(R);break;case r.PAN:if(n.enablePan===!1)return;ge(R);break}}function be(R){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(R.preventDefault(),n.dispatchEvent(xo),pe(R),n.dispatchEvent(uc))}function Ne(R){n.enabled===!1||n.enablePan===!1||X(R)}function We(R){switch(se(R),A.length){case 1:switch(n.touches.ONE){case ai.ROTATE:if(n.enableRotate===!1)return;ee(),s=r.TOUCH_ROTATE;break;case ai.PAN:if(n.enablePan===!1)return;ue(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case ai.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;P(),s=r.TOUCH_DOLLY_PAN;break;case ai.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Re(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(xo)}function w(R){switch(se(R),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;Pe(R),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;le(R),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ne(R),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Z(R),n.update();break;default:s=r.NONE}}function S(R){n.enabled!==!1&&R.preventDefault()}function k(R){A.push(R)}function re(R){delete C[R.pointerId];for(let J=0;J<A.length;J++)if(A[J].pointerId==R.pointerId){A.splice(J,1);return}}function se(R){let J=C[R.pointerId];J===void 0&&(J=new ae,C[R.pointerId]=J),J.set(R.pageX,R.pageY)}function fe(R){const J=R.pointerId===A[0].pointerId?A[1]:A[0];return C[J.pointerId]}n.domElement.addEventListener("contextmenu",S),n.domElement.addEventListener("pointerdown",te),n.domElement.addEventListener("pointercancel",ce),n.domElement.addEventListener("wheel",be,{passive:!1}),this.update()}}const fc=new Rn,ls=new T;class Uh extends v_{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new at(e,3)),this.setAttribute("uv",new at(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new zo(t,6,1);return this.setAttribute("instanceStart",new tn(n,3,0)),this.setAttribute("instanceEnd",new tn(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const n=new zo(t,6,1);return this.setAttribute("instanceColorStart",new tn(n,3,0)),this.setAttribute("instanceColorEnd",new tn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new c_(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),fc.setFromBufferAttribute(t),this.boundingBox.union(fc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)ls.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(ls)),ls.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(ls));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class Dh extends Uh{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e){const t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setColors(n),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}he.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ae(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Lt.line={uniforms:ta.merge([he.common,he.fog,he.line]),vertexShader:`
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

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

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

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

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

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

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

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

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

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class da extends xn{constructor(e){super({type:"LineMaterial",uniforms:ta.clone(Lt.line.uniforms),vertexShader:Lt.line.vertexShader,fragmentShader:Lt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const dc=new T,pc=new T,gt=new Ye,vt=new Ye,Kt=new Ye,So=new T,Mo=new et,_t=new y_,mc=new T,cs=new Rn,hs=new ti,$t=new Ye;let en,Yn;function gc(i,e,t){return $t.set(0,0,-e,1).applyMatrix4(i.projectionMatrix),$t.multiplyScalar(1/$t.w),$t.x=Yn/t.width,$t.y=Yn/t.height,$t.applyMatrix4(i.projectionMatrixInverse),$t.multiplyScalar(1/$t.w),Math.abs(Math.max($t.x,$t.y))}function M_(i,e){const t=i.matrixWorld,n=i.geometry,r=n.attributes.instanceStart,s=n.attributes.instanceEnd,a=Math.min(n.instanceCount,r.count);for(let o=0,l=a;o<l;o++){_t.start.fromBufferAttribute(r,o),_t.end.fromBufferAttribute(s,o),_t.applyMatrix4(t);const c=new T,h=new T;en.distanceSqToSegment(_t.start,_t.end,h,c),h.distanceTo(c)<Yn*.5&&e.push({point:h,pointOnLine:c,distance:en.origin.distanceTo(h),object:i,face:null,faceIndex:o,uv:null,uv1:null})}}function E_(i,e,t){const n=e.projectionMatrix,s=i.material.resolution,a=i.matrixWorld,o=i.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),u=-e.near;en.at(1,Kt),Kt.w=1,Kt.applyMatrix4(e.matrixWorldInverse),Kt.applyMatrix4(n),Kt.multiplyScalar(1/Kt.w),Kt.x*=s.x/2,Kt.y*=s.y/2,Kt.z=0,So.copy(Kt),Mo.multiplyMatrices(e.matrixWorldInverse,a);for(let f=0,p=h;f<p;f++){if(gt.fromBufferAttribute(l,f),vt.fromBufferAttribute(c,f),gt.w=1,vt.w=1,gt.applyMatrix4(Mo),vt.applyMatrix4(Mo),gt.z>u&&vt.z>u)continue;if(gt.z>u){const _=gt.z-vt.z,y=(gt.z-u)/_;gt.lerp(vt,y)}else if(vt.z>u){const _=vt.z-gt.z,y=(vt.z-u)/_;vt.lerp(gt,y)}gt.applyMatrix4(n),vt.applyMatrix4(n),gt.multiplyScalar(1/gt.w),vt.multiplyScalar(1/vt.w),gt.x*=s.x/2,gt.y*=s.y/2,vt.x*=s.x/2,vt.y*=s.y/2,_t.start.copy(gt),_t.start.z=0,_t.end.copy(vt),_t.end.z=0;const v=_t.closestPointToPointParameter(So,!0);_t.at(v,mc);const m=Rf.lerp(gt.z,vt.z,v),d=m>=-1&&m<=1,M=So.distanceTo(mc)<Yn*.5;if(d&&M){_t.start.fromBufferAttribute(l,f),_t.end.fromBufferAttribute(c,f),_t.start.applyMatrix4(a),_t.end.applyMatrix4(a);const _=new T,y=new T;en.distanceSqToSegment(_t.start,_t.end,y,_),t.push({point:y,pointOnLine:_,distance:en.origin.distanceTo(y),object:i,face:null,faceIndex:f,uv:null,uv1:null})}}}class A_ extends it{constructor(e=new Uh,t=new da({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)dc.fromBufferAttribute(t,a),pc.fromBufferAttribute(n,a),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+dc.distanceTo(pc);const s=new zo(r,2,1);return e.setAttribute("instanceDistanceStart",new tn(s,1,0)),e.setAttribute("instanceDistanceEnd",new tn(s,1,1)),this}raycast(e,t){const n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;en=e.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Yn=l.linewidth+s,o.boundingSphere===null&&o.computeBoundingSphere(),hs.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=Yn*.5;else{const u=Math.max(r.near,hs.distanceToPoint(en.origin));c=gc(r,u,l.resolution)}if(hs.radius+=c,en.intersectsSphere(hs)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),cs.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=Yn*.5;else{const u=Math.max(r.near,cs.distanceToPoint(en.origin));h=gc(r,u,l.resolution)}cs.expandByScalar(h),en.intersectsBox(cs)!==!1&&(n?M_(this,t):E_(this,r,t))}}class b_ extends A_{constructor(e=new Dh,t=new da({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Zt=(i,e,t,n=1)=>{let r=e*Math.PI/180,s=t*Math.PI/180;r=-r;const a=i*n*Math.cos(s)*Math.cos(r),o=i*n*Math.sin(s),l=i*n*Math.cos(s)*Math.sin(r);return{x:a,y:o,z:l}},Nh=(i,e)=>{const t=new T(0,0,0),n=i.clone().sub(t),r=e.clone().sub(t),s=new T().crossVectors(n,r).normalize(),a=new yn().setFromUnitVectors(s,new T(0,0,1)),o=i.clone().applyQuaternion(a),l=e.clone().applyQuaternion(a),c=new T().addVectors(o,l).multiplyScalar(.5).normalize(),h=new yn().setFromUnitVectors(c,new T(0,1,0)),u=o.clone().applyQuaternion(h),f=l.clone().applyQuaternion(h);return{quaternion:a.clone().invert().multiply(h.clone().invert()),startPoint3D:u,endPoint3D:f}},Ho=(i,e,t)=>{const n=i.clone().sub(t).normalize(),r=e.clone().sub(t).normalize(),s=n.clone().dot(r);return Math.acos(s)},w_=(i,e,t)=>{const n=i.lengthSq(),r=e.lengthSq(),s=t.lengthSq(),a=i.x,o=i.y,l=e.x,c=e.y,h=t.x,u=t.y,f=a*c+l*u+h*o-a*u-l*o-h*c,p=(r*u+n*c+s*o-r*o-s*c-n*u)/f/2,g=(s*l+r*a+n*h-n*l-r*h-s*a)/f/2;return new T(p,g,0)};function T_(i,e){const t=(e.y-i.y)/(e.x-i.x);i.y-t*i.x;const n=-1/t,r=(e.x+i.x)/2,s=(e.y+i.y)/2,a=r-n*s,o=i.distanceTo(e);return C_(r,s,n,a,o/5)}function C_(i,e,t,n,r){const s=r/Math.sqrt(1+Math.pow(t,2)),a=r*t/Math.sqrt(1+Math.pow(t,2));return new T(i+s,e+a,0)}function R_(){let i=[];const e="0123456789abcdef";for(let t=0;t<36;t++)i[t]=e.substring(Math.floor(Math.random()*16),1);return i[14]="4",i[19]=e.substring(i[19]&3|8,1),i[8]=i[13]=i[18]=i[23]="-",i.join("")}var Bi=Object.freeze({Linear:Object.freeze({None:function(i){return i},In:function(i){return this.None(i)},Out:function(i){return this.None(i)},InOut:function(i){return this.None(i)}}),Quadratic:Object.freeze({In:function(i){return i*i},Out:function(i){return i*(2-i)},InOut:function(i){return(i*=2)<1?.5*i*i:-.5*(--i*(i-2)-1)}}),Cubic:Object.freeze({In:function(i){return i*i*i},Out:function(i){return--i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i:.5*((i-=2)*i*i+2)}}),Quartic:Object.freeze({In:function(i){return i*i*i*i},Out:function(i){return 1- --i*i*i*i},InOut:function(i){return(i*=2)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2)}}),Quintic:Object.freeze({In:function(i){return i*i*i*i*i},Out:function(i){return--i*i*i*i*i+1},InOut:function(i){return(i*=2)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2)}}),Sinusoidal:Object.freeze({In:function(i){return 1-Math.sin((1-i)*Math.PI/2)},Out:function(i){return Math.sin(i*Math.PI/2)},InOut:function(i){return .5*(1-Math.sin(Math.PI*(.5-i)))}}),Exponential:Object.freeze({In:function(i){return i===0?0:Math.pow(1024,i-1)},Out:function(i){return i===1?1:1-Math.pow(2,-10*i)},InOut:function(i){return i===0?0:i===1?1:(i*=2)<1?.5*Math.pow(1024,i-1):.5*(-Math.pow(2,-10*(i-1))+2)}}),Circular:Object.freeze({In:function(i){return 1-Math.sqrt(1-i*i)},Out:function(i){return Math.sqrt(1- --i*i)},InOut:function(i){return(i*=2)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1)}}),Elastic:Object.freeze({In:function(i){return i===0?0:i===1?1:-Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI)},Out:function(i){return i===0?0:i===1?1:Math.pow(2,-10*i)*Math.sin((i-.1)*5*Math.PI)+1},InOut:function(i){return i===0?0:i===1?1:(i*=2,i<1?-.5*Math.pow(2,10*(i-1))*Math.sin((i-1.1)*5*Math.PI):.5*Math.pow(2,-10*(i-1))*Math.sin((i-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(i){var e=1.70158;return i===1?1:i*i*((e+1)*i-e)},Out:function(i){var e=1.70158;return i===0?0:--i*i*((e+1)*i+e)+1},InOut:function(i){var e=2.5949095;return(i*=2)<1?.5*(i*i*((e+1)*i-e)):.5*((i-=2)*i*((e+1)*i+e)+2)}}),Bounce:Object.freeze({In:function(i){return 1-Bi.Bounce.Out(1-i)},Out:function(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},InOut:function(i){return i<.5?Bi.Bounce.In(i*2)*.5:Bi.Bounce.Out(i*2-1)*.5+.5}}),generatePow:function(i){return i===void 0&&(i=4),i=i<Number.EPSILON?Number.EPSILON:i,i=i>1e4?1e4:i,{In:function(e){return Math.pow(e,i)},Out:function(e){return 1-Math.pow(1-e,i)},InOut:function(e){return e<.5?Math.pow(e*2,i)/2:(1-Math.pow(2-e*2,i))/2+.5}}}}),lr=function(){return performance.now()},P_=(function(){function i(){this._tweens={},this._tweensAddedDuringUpdate={}}return i.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},i.prototype.removeAll=function(){this._tweens={}},i.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},i.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},i.prototype.update=function(e,t){e===void 0&&(e=lr()),t===void 0&&(t=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<n.length;r++){var s=this._tweens[n[r]],a=!t;s&&s.update(e,a)===!1&&!t&&delete this._tweens[n[r]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},i})(),Vo={Linear:function(i,e){var t=i.length-1,n=t*e,r=Math.floor(n),s=Vo.Utils.Linear;return e<0?s(i[0],i[1],n):e>1?s(i[t],i[t-1],t-n):s(i[r],i[r+1>t?t:r+1],n-r)},Utils:{Linear:function(i,e,t){return(e-i)*t+i}}},Oh=(function(){function i(){}return i.nextId=function(){return i._nextId++},i._nextId=0,i})(),ko=new P_,L_=(function(){function i(e,t){t===void 0&&(t=ko),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Bi.Linear.None,this._interpolationFunction=Vo.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Oh.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return i.prototype.getId=function(){return this._id},i.prototype.isPlaying=function(){return this._isPlaying},i.prototype.isPaused=function(){return this._isPaused},i.prototype.to=function(e,t){if(t===void 0&&(t=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=t,this},i.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e,this},i.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},i.prototype.start=function(e,t){if(e===void 0&&(e=lr()),t===void 0&&(t=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||t){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var s in this._valuesEnd)r[s]=this._valuesEnd[s];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,t)}return this},i.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},i.prototype._setupProperties=function(e,t,n,r,s){for(var a in n){var o=e[a],l=Array.isArray(o),c=l?"array":typeof o,h=!l&&Array.isArray(n[a]);if(!(c==="undefined"||c==="function")){if(h){var u=n[a];if(u.length===0)continue;for(var f=[o],p=0,g=u.length;p<g;p+=1){var v=this._handleRelativeValue(o,u[p]);if(isNaN(v)){h=!1,console.warn("Found invalid interpolation list. Skipping.");break}f.push(v)}h&&(n[a]=f)}if((c==="object"||l)&&o&&!h){t[a]=l?[]:{};var m=o;for(var d in m)t[a][d]=m[d];r[a]=l?[]:{};var u=n[a];if(!this._isDynamic){var M={};for(var d in u)M[d]=u[d];n[a]=u=M}this._setupProperties(m,t[a],u,r[a],s)}else(typeof t[a]>"u"||s)&&(t[a]=o),l||(t[a]*=1),h?r[a]=n[a].slice().reverse():r[a]=t[a]||0}}},i.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},i.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},i.prototype.pause=function(e){return e===void 0&&(e=lr()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},i.prototype.resume=function(e){return e===void 0&&(e=lr()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},i.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},i.prototype.group=function(e){return e===void 0&&(e=ko),this._group=e,this},i.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},i.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},i.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},i.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},i.prototype.easing=function(e){return e===void 0&&(e=Bi.Linear.None),this._easingFunction=e,this},i.prototype.interpolation=function(e){return e===void 0&&(e=Vo.Linear),this._interpolationFunction=e,this},i.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},i.prototype.onStart=function(e){return this._onStartCallback=e,this},i.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},i.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},i.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},i.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},i.prototype.onStop=function(e){return this._onStopCallback=e,this},i.prototype.update=function(e,t){if(e===void 0&&(e=lr()),t===void 0&&(t=!0),this._isPaused)return!0;var n,r,s=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>s)return!1;t&&this.start(e,!0)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0),r=(e-this._startTime)/this._duration,r=this._duration===0||r>1?1:r;var a=this._easingFunction(r);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,a),this._onUpdateCallback&&this._onUpdateCallback(this._object,r),r===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(n in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[n]=="string"&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,l=this._chainedTweens.length;o<l;o++)this._chainedTweens[o].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},i.prototype._updateProperties=function(e,t,n,r){for(var s in n)if(t[s]!==void 0){var a=t[s]||0,o=n[s],l=Array.isArray(e[s]),c=Array.isArray(o),h=!l&&c;h?e[s]=this._interpolationFunction(o,r):typeof o=="object"&&o?this._updateProperties(e[s],a,o,r):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[s]=a+(o-a)*r))}},i.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},i.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],n=this._valuesEnd[e];typeof n=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(n):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},i})();Oh.nextId;var sn=ko;sn.getAll.bind(sn);sn.removeAll.bind(sn);sn.add.bind(sn);sn.remove.bind(sn);var I_=sn.update.bind(sn),U_=typeof global=="object"&&global&&global.Object===Object&&global;const Bh=U_;var D_=typeof self=="object"&&self&&self.Object===Object&&self,N_=Bh||D_||Function("return this")();const an=N_;var O_=an.Symbol;const Vi=O_;var Fh=Object.prototype,B_=Fh.hasOwnProperty,F_=Fh.toString,sr=Vi?Vi.toStringTag:void 0;function z_(i){var e=B_.call(i,sr),t=i[sr];try{i[sr]=void 0;var n=!0}catch{}var r=F_.call(i);return n&&(e?i[sr]=t:delete i[sr]),r}var G_=Object.prototype,H_=G_.toString;function V_(i){return H_.call(i)}var k_="[object Null]",W_="[object Undefined]",vc=Vi?Vi.toStringTag:void 0;function Zi(i){return i==null?i===void 0?W_:k_:vc&&vc in Object(i)?z_(i):V_(i)}function ni(i){return i!=null&&typeof i=="object"}var X_=Array.isArray;const Ar=X_;function Pn(i){var e=typeof i;return i!=null&&(e=="object"||e=="function")}function zh(i){return i}var j_="[object AsyncFunction]",Y_="[object Function]",Z_="[object GeneratorFunction]",q_="[object Proxy]";function pa(i){if(!Pn(i))return!1;var e=Zi(i);return e==Y_||e==Z_||e==j_||e==q_}var J_=an["__core-js_shared__"];const Eo=J_;var _c=(function(){var i=/[^.]+$/.exec(Eo&&Eo.keys&&Eo.keys.IE_PROTO||"");return i?"Symbol(src)_1."+i:""})();function Q_(i){return!!_c&&_c in i}var K_=Function.prototype,$_=K_.toString;function ii(i){if(i!=null){try{return $_.call(i)}catch{}try{return i+""}catch{}}return""}var ey=/[\\^$.*+?()[\]{}|]/g,ty=/^\[object .+?Constructor\]$/,ny=Function.prototype,iy=Object.prototype,ry=ny.toString,sy=iy.hasOwnProperty,oy=RegExp("^"+ry.call(sy).replace(ey,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function ay(i){if(!Pn(i)||Q_(i))return!1;var e=pa(i)?oy:ty;return e.test(ii(i))}function ly(i,e){return i?.[e]}function ri(i,e){var t=ly(i,e);return ay(t)?t:void 0}var cy=ri(an,"WeakMap");const Wo=cy;var yc=Object.create,hy=(function(){function i(){}return function(e){if(!Pn(e))return{};if(yc)return yc(e);i.prototype=e;var t=new i;return i.prototype=void 0,t}})();const uy=hy;function fy(i,e,t){switch(t.length){case 0:return i.call(e);case 1:return i.call(e,t[0]);case 2:return i.call(e,t[0],t[1]);case 3:return i.call(e,t[0],t[1],t[2])}return i.apply(e,t)}function dy(i,e){var t=-1,n=i.length;for(e||(e=Array(n));++t<n;)e[t]=i[t];return e}var py=800,my=16,gy=Date.now;function vy(i){var e=0,t=0;return function(){var n=gy(),r=my-(n-t);if(t=n,r>0){if(++e>=py)return arguments[0]}else e=0;return i.apply(void 0,arguments)}}function _y(i){return function(){return i}}var yy=(function(){try{var i=ri(Object,"defineProperty");return i({},"",{}),i}catch{}})();const Ss=yy;var xy=Ss?function(i,e){return Ss(i,"toString",{configurable:!0,enumerable:!1,value:_y(e),writable:!0})}:zh;const Sy=xy;var My=vy(Sy);const Ey=My;function Ay(i,e){for(var t=-1,n=i==null?0:i.length;++t<n&&e(i[t],t,i)!==!1;);return i}var by=9007199254740991,wy=/^(?:0|[1-9]\d*)$/;function Gh(i,e){var t=typeof i;return e=e??by,!!e&&(t=="number"||t!="symbol"&&wy.test(i))&&i>-1&&i%1==0&&i<e}function ma(i,e,t){e=="__proto__"&&Ss?Ss(i,e,{configurable:!0,enumerable:!0,value:t,writable:!0}):i[e]=t}function Ps(i,e){return i===e||i!==i&&e!==e}var Ty=Object.prototype,Cy=Ty.hasOwnProperty;function Hh(i,e,t){var n=i[e];(!(Cy.call(i,e)&&Ps(n,t))||t===void 0&&!(e in i))&&ma(i,e,t)}function Ry(i,e,t,n){var r=!t;t||(t={});for(var s=-1,a=e.length;++s<a;){var o=e[s],l=void 0;l===void 0&&(l=i[o]),r?ma(t,o,l):Hh(t,o,l)}return t}var xc=Math.max;function Py(i,e,t){return e=xc(e===void 0?i.length-1:e,0),function(){for(var n=arguments,r=-1,s=xc(n.length-e,0),a=Array(s);++r<s;)a[r]=n[e+r];r=-1;for(var o=Array(e+1);++r<e;)o[r]=n[r];return o[e]=t(a),fy(i,this,o)}}function Ly(i,e){return Ey(Py(i,e,zh),i+"")}var Iy=9007199254740991;function Vh(i){return typeof i=="number"&&i>-1&&i%1==0&&i<=Iy}function Ls(i){return i!=null&&Vh(i.length)&&!pa(i)}function Uy(i,e,t){if(!Pn(t))return!1;var n=typeof e;return(n=="number"?Ls(t)&&Gh(e,t.length):n=="string"&&e in t)?Ps(t[e],i):!1}function Dy(i){return Ly(function(e,t){var n=-1,r=t.length,s=r>1?t[r-1]:void 0,a=r>2?t[2]:void 0;for(s=i.length>3&&typeof s=="function"?(r--,s):void 0,a&&Uy(t[0],t[1],a)&&(s=r<3?void 0:s,r=1),e=Object(e);++n<r;){var o=t[n];o&&i(e,o,n,s)}return e})}var Ny=Object.prototype;function ga(i){var e=i&&i.constructor,t=typeof e=="function"&&e.prototype||Ny;return i===t}function Oy(i,e){for(var t=-1,n=Array(i);++t<i;)n[t]=e(t);return n}var By="[object Arguments]";function Sc(i){return ni(i)&&Zi(i)==By}var kh=Object.prototype,Fy=kh.hasOwnProperty,zy=kh.propertyIsEnumerable,Gy=Sc((function(){return arguments})())?Sc:function(i){return ni(i)&&Fy.call(i,"callee")&&!zy.call(i,"callee")};const Xo=Gy;function Hy(){return!1}var Wh=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Mc=Wh&&typeof module=="object"&&module&&!module.nodeType&&module,Vy=Mc&&Mc.exports===Wh,Ec=Vy?an.Buffer:void 0,ky=Ec?Ec.isBuffer:void 0,Wy=ky||Hy;const va=Wy;var Xy="[object Arguments]",jy="[object Array]",Yy="[object Boolean]",Zy="[object Date]",qy="[object Error]",Jy="[object Function]",Qy="[object Map]",Ky="[object Number]",$y="[object Object]",e0="[object RegExp]",t0="[object Set]",n0="[object String]",i0="[object WeakMap]",r0="[object ArrayBuffer]",s0="[object DataView]",o0="[object Float32Array]",a0="[object Float64Array]",l0="[object Int8Array]",c0="[object Int16Array]",h0="[object Int32Array]",u0="[object Uint8Array]",f0="[object Uint8ClampedArray]",d0="[object Uint16Array]",p0="[object Uint32Array]",$e={};$e[o0]=$e[a0]=$e[l0]=$e[c0]=$e[h0]=$e[u0]=$e[f0]=$e[d0]=$e[p0]=!0;$e[Xy]=$e[jy]=$e[r0]=$e[Yy]=$e[s0]=$e[Zy]=$e[qy]=$e[Jy]=$e[Qy]=$e[Ky]=$e[$y]=$e[e0]=$e[t0]=$e[n0]=$e[i0]=!1;function m0(i){return ni(i)&&Vh(i.length)&&!!$e[Zi(i)]}function _a(i){return function(e){return i(e)}}var Xh=typeof exports=="object"&&exports&&!exports.nodeType&&exports,mr=Xh&&typeof module=="object"&&module&&!module.nodeType&&module,g0=mr&&mr.exports===Xh,Ao=g0&&Bh.process,v0=(function(){try{var i=mr&&mr.require&&mr.require("util").types;return i||Ao&&Ao.binding&&Ao.binding("util")}catch{}})();const ki=v0;var Ac=ki&&ki.isTypedArray,_0=Ac?_a(Ac):m0;const jh=_0;var y0=Object.prototype,x0=y0.hasOwnProperty;function Yh(i,e){var t=Ar(i),n=!t&&Xo(i),r=!t&&!n&&va(i),s=!t&&!n&&!r&&jh(i),a=t||n||r||s,o=a?Oy(i.length,String):[],l=o.length;for(var c in i)(e||x0.call(i,c))&&!(a&&(c=="length"||r&&(c=="offset"||c=="parent")||s&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||Gh(c,l)))&&o.push(c);return o}function Zh(i,e){return function(t){return i(e(t))}}var S0=Zh(Object.keys,Object);const M0=S0;var E0=Object.prototype,A0=E0.hasOwnProperty;function b0(i){if(!ga(i))return M0(i);var e=[];for(var t in Object(i))A0.call(i,t)&&t!="constructor"&&e.push(t);return e}function w0(i){return Ls(i)?Yh(i):b0(i)}function T0(i){var e=[];if(i!=null)for(var t in Object(i))e.push(t);return e}var C0=Object.prototype,R0=C0.hasOwnProperty;function P0(i){if(!Pn(i))return T0(i);var e=ga(i),t=[];for(var n in i)n=="constructor"&&(e||!R0.call(i,n))||t.push(n);return t}function qh(i){return Ls(i)?Yh(i,!0):P0(i)}var L0=ri(Object,"create");const br=L0;function I0(){this.__data__=br?br(null):{},this.size=0}function U0(i){var e=this.has(i)&&delete this.__data__[i];return this.size-=e?1:0,e}var D0="__lodash_hash_undefined__",N0=Object.prototype,O0=N0.hasOwnProperty;function B0(i){var e=this.__data__;if(br){var t=e[i];return t===D0?void 0:t}return O0.call(e,i)?e[i]:void 0}var F0=Object.prototype,z0=F0.hasOwnProperty;function G0(i){var e=this.__data__;return br?e[i]!==void 0:z0.call(e,i)}var H0="__lodash_hash_undefined__";function V0(i,e){var t=this.__data__;return this.size+=this.has(i)?0:1,t[i]=br&&e===void 0?H0:e,this}function Kn(i){var e=-1,t=i==null?0:i.length;for(this.clear();++e<t;){var n=i[e];this.set(n[0],n[1])}}Kn.prototype.clear=I0;Kn.prototype.delete=U0;Kn.prototype.get=B0;Kn.prototype.has=G0;Kn.prototype.set=V0;function k0(){this.__data__=[],this.size=0}function Is(i,e){for(var t=i.length;t--;)if(Ps(i[t][0],e))return t;return-1}var W0=Array.prototype,X0=W0.splice;function j0(i){var e=this.__data__,t=Is(e,i);if(t<0)return!1;var n=e.length-1;return t==n?e.pop():X0.call(e,t,1),--this.size,!0}function Y0(i){var e=this.__data__,t=Is(e,i);return t<0?void 0:e[t][1]}function Z0(i){return Is(this.__data__,i)>-1}function q0(i,e){var t=this.__data__,n=Is(t,i);return n<0?(++this.size,t.push([i,e])):t[n][1]=e,this}function Sn(i){var e=-1,t=i==null?0:i.length;for(this.clear();++e<t;){var n=i[e];this.set(n[0],n[1])}}Sn.prototype.clear=k0;Sn.prototype.delete=j0;Sn.prototype.get=Y0;Sn.prototype.has=Z0;Sn.prototype.set=q0;var J0=ri(an,"Map");const wr=J0;function Q0(){this.size=0,this.__data__={hash:new Kn,map:new(wr||Sn),string:new Kn}}function K0(i){var e=typeof i;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?i!=="__proto__":i===null}function Us(i,e){var t=i.__data__;return K0(e)?t[typeof e=="string"?"string":"hash"]:t.map}function $0(i){var e=Us(this,i).delete(i);return this.size-=e?1:0,e}function ex(i){return Us(this,i).get(i)}function tx(i){return Us(this,i).has(i)}function nx(i,e){var t=Us(this,i),n=t.size;return t.set(i,e),this.size+=t.size==n?0:1,this}function qi(i){var e=-1,t=i==null?0:i.length;for(this.clear();++e<t;){var n=i[e];this.set(n[0],n[1])}}qi.prototype.clear=Q0;qi.prototype.delete=$0;qi.prototype.get=ex;qi.prototype.has=tx;qi.prototype.set=nx;function ix(i,e){for(var t=-1,n=e.length,r=i.length;++t<n;)i[r+t]=e[t];return i}var rx=Zh(Object.getPrototypeOf,Object);const Jh=rx;var sx="[object Object]",ox=Function.prototype,ax=Object.prototype,Qh=ox.toString,lx=ax.hasOwnProperty,cx=Qh.call(Object);function hx(i){if(!ni(i)||Zi(i)!=sx)return!1;var e=Jh(i);if(e===null)return!0;var t=lx.call(e,"constructor")&&e.constructor;return typeof t=="function"&&t instanceof t&&Qh.call(t)==cx}function ux(){this.__data__=new Sn,this.size=0}function fx(i){var e=this.__data__,t=e.delete(i);return this.size=e.size,t}function dx(i){return this.__data__.get(i)}function px(i){return this.__data__.has(i)}var mx=200;function gx(i,e){var t=this.__data__;if(t instanceof Sn){var n=t.__data__;if(!wr||n.length<mx-1)return n.push([i,e]),this.size=++t.size,this;t=this.__data__=new qi(n)}return t.set(i,e),this.size=t.size,this}function si(i){var e=this.__data__=new Sn(i);this.size=e.size}si.prototype.clear=ux;si.prototype.delete=fx;si.prototype.get=dx;si.prototype.has=px;si.prototype.set=gx;var Kh=typeof exports=="object"&&exports&&!exports.nodeType&&exports,bc=Kh&&typeof module=="object"&&module&&!module.nodeType&&module,vx=bc&&bc.exports===Kh,wc=vx?an.Buffer:void 0,Tc=wc?wc.allocUnsafe:void 0;function $h(i,e){if(e)return i.slice();var t=i.length,n=Tc?Tc(t):new i.constructor(t);return i.copy(n),n}function _x(i,e){for(var t=-1,n=i==null?0:i.length,r=0,s=[];++t<n;){var a=i[t];e(a,t,i)&&(s[r++]=a)}return s}function yx(){return[]}var xx=Object.prototype,Sx=xx.propertyIsEnumerable,Cc=Object.getOwnPropertySymbols,Mx=Cc?function(i){return i==null?[]:(i=Object(i),_x(Cc(i),function(e){return Sx.call(i,e)}))}:yx;const Ex=Mx;function Ax(i,e,t){var n=e(i);return Ar(i)?n:ix(n,t(i))}function bx(i){return Ax(i,w0,Ex)}var wx=ri(an,"DataView");const jo=wx;var Tx=ri(an,"Promise");const Yo=Tx;var Cx=ri(an,"Set");const Zo=Cx;var Rc="[object Map]",Rx="[object Object]",Pc="[object Promise]",Lc="[object Set]",Ic="[object WeakMap]",Uc="[object DataView]",Px=ii(jo),Lx=ii(wr),Ix=ii(Yo),Ux=ii(Zo),Dx=ii(Wo),zn=Zi;(jo&&zn(new jo(new ArrayBuffer(1)))!=Uc||wr&&zn(new wr)!=Rc||Yo&&zn(Yo.resolve())!=Pc||Zo&&zn(new Zo)!=Lc||Wo&&zn(new Wo)!=Ic)&&(zn=function(i){var e=Zi(i),t=e==Rx?i.constructor:void 0,n=t?ii(t):"";if(n)switch(n){case Px:return Uc;case Lx:return Rc;case Ix:return Pc;case Ux:return Lc;case Dx:return Ic}return e});const ya=zn;var Nx=Object.prototype,Ox=Nx.hasOwnProperty;function Bx(i){var e=i.length,t=new i.constructor(e);return e&&typeof i[0]=="string"&&Ox.call(i,"index")&&(t.index=i.index,t.input=i.input),t}var Fx=an.Uint8Array;const Dc=Fx;function xa(i){var e=new i.constructor(i.byteLength);return new Dc(e).set(new Dc(i)),e}function zx(i,e){var t=xa(i.buffer);return new i.constructor(t,i.byteOffset,i.byteLength)}var Gx=/\w*$/;function Hx(i){var e=new i.constructor(i.source,Gx.exec(i));return e.lastIndex=i.lastIndex,e}var Nc=Vi?Vi.prototype:void 0,Oc=Nc?Nc.valueOf:void 0;function Vx(i){return Oc?Object(Oc.call(i)):{}}function eu(i,e){var t=e?xa(i.buffer):i.buffer;return new i.constructor(t,i.byteOffset,i.length)}var kx="[object Boolean]",Wx="[object Date]",Xx="[object Map]",jx="[object Number]",Yx="[object RegExp]",Zx="[object Set]",qx="[object String]",Jx="[object Symbol]",Qx="[object ArrayBuffer]",Kx="[object DataView]",$x="[object Float32Array]",eS="[object Float64Array]",tS="[object Int8Array]",nS="[object Int16Array]",iS="[object Int32Array]",rS="[object Uint8Array]",sS="[object Uint8ClampedArray]",oS="[object Uint16Array]",aS="[object Uint32Array]";function lS(i,e,t){var n=i.constructor;switch(e){case Qx:return xa(i);case kx:case Wx:return new n(+i);case Kx:return zx(i);case $x:case eS:case tS:case nS:case iS:case rS:case sS:case oS:case aS:return eu(i,t);case Xx:return new n;case jx:case qx:return new n(i);case Yx:return Hx(i);case Zx:return new n;case Jx:return Vx(i)}}function tu(i){return typeof i.constructor=="function"&&!ga(i)?uy(Jh(i)):{}}var cS="[object Map]";function hS(i){return ni(i)&&ya(i)==cS}var Bc=ki&&ki.isMap,uS=Bc?_a(Bc):hS;const fS=uS;var dS="[object Set]";function pS(i){return ni(i)&&ya(i)==dS}var Fc=ki&&ki.isSet,mS=Fc?_a(Fc):pS;const gS=mS;var vS=1,nu="[object Arguments]",_S="[object Array]",yS="[object Boolean]",xS="[object Date]",SS="[object Error]",iu="[object Function]",MS="[object GeneratorFunction]",ES="[object Map]",AS="[object Number]",ru="[object Object]",bS="[object RegExp]",wS="[object Set]",TS="[object String]",CS="[object Symbol]",RS="[object WeakMap]",PS="[object ArrayBuffer]",LS="[object DataView]",IS="[object Float32Array]",US="[object Float64Array]",DS="[object Int8Array]",NS="[object Int16Array]",OS="[object Int32Array]",BS="[object Uint8Array]",FS="[object Uint8ClampedArray]",zS="[object Uint16Array]",GS="[object Uint32Array]",Qe={};Qe[nu]=Qe[_S]=Qe[PS]=Qe[LS]=Qe[yS]=Qe[xS]=Qe[IS]=Qe[US]=Qe[DS]=Qe[NS]=Qe[OS]=Qe[ES]=Qe[AS]=Qe[ru]=Qe[bS]=Qe[wS]=Qe[TS]=Qe[CS]=Qe[BS]=Qe[FS]=Qe[zS]=Qe[GS]=!0;Qe[SS]=Qe[iu]=Qe[RS]=!1;function gs(i,e,t,n,r,s){var a,o=e&vS;if(a!==void 0)return a;if(!Pn(i))return i;var l=Ar(i);if(l)a=Bx(i);else{var c=ya(i),h=c==iu||c==MS;if(va(i))return $h(i,o);if(c==ru||c==nu||h&&!r)a=h?{}:tu(i);else{if(!Qe[c])return r?i:{};a=lS(i,c,o)}}s||(s=new si);var u=s.get(i);if(u)return u;s.set(i,a),gS(i)?i.forEach(function(g){a.add(gs(g,e,t,g,i,s))}):fS(i)&&i.forEach(function(g,v){a.set(v,gs(g,e,t,v,i,s))});var f=bx,p=l?void 0:f(i);return Ay(p||i,function(g,v){p&&(v=g,g=i[v]),Hh(a,v,gs(g,e,t,v,i,s))}),a}var HS=1,VS=4;function Cr(i){return gs(i,HS|VS)}function kS(i){return function(e,t,n){for(var r=-1,s=Object(e),a=n(e),o=a.length;o--;){var l=a[++r];if(t(s[l],l,s)===!1)break}return e}}var WS=kS();const XS=WS;function qo(i,e,t){(t!==void 0&&!Ps(i[e],t)||t===void 0&&!(e in i))&&ma(i,e,t)}function jS(i){return ni(i)&&Ls(i)}function Jo(i,e){if(!(e==="constructor"&&typeof i[e]=="function")&&e!="__proto__")return i[e]}function YS(i){return Ry(i,qh(i))}function ZS(i,e,t,n,r,s,a){var o=Jo(i,t),l=Jo(e,t),c=a.get(l);if(c){qo(i,t,c);return}var h=s?s(o,l,t+"",i,e,a):void 0,u=h===void 0;if(u){var f=Ar(l),p=!f&&va(l),g=!f&&!p&&jh(l);h=l,f||p||g?Ar(o)?h=o:jS(o)?h=dy(o):p?(u=!1,h=$h(l,!0)):g?(u=!1,h=eu(l,!0)):h=[]:hx(l)||Xo(l)?(h=o,Xo(o)?h=YS(o):(!Pn(o)||pa(o))&&(h=tu(l))):u=!1}u&&(a.set(l,h),r(h,l,n,s,a),a.delete(l)),qo(i,t,h)}function su(i,e,t,n,r){i!==e&&XS(e,function(s,a){if(r||(r=new si),Pn(s))ZS(i,e,a,t,su,n,r);else{var o=n?n(Jo(i,a),s,a+"",i,e,r):void 0;o===void 0&&(o=s),qo(i,a,o)}},qh)}var qS=Dy(function(i,e,t){su(i,e,t)});const Rr=qS;function $n(i,e,t,n){const r={duration:2e3,delay:0,repeat:1/0};Rr(r,n);const s=new L_(i);return s.to(e,r.duration),s.delay(r.delay),s.easing(Bi.Linear.None),s.onUpdate(function(a){t(a)}),s.start(),s.repeat(r.repeat),n&&n.onComplete&&s.onComplete(()=>{n.onComplete(n.data)}),s}function ou(i,e){i.userData={...i.userData,...e}}const us=i=>{if(typeof i=="string"){const e=i.match(/rgba\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)/i);if(e){const t=Number(e[1]),n=Number(e[2]),r=Number(e[3]),s=Math.max(0,Math.min(1,Number(e[4])));return{color:new De(`rgb(${t}, ${n}, ${r})`),opacity:s}}}return{color:new De(i),opacity:1}};class JS{constructor(e,t){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentData"),ie(this,"_currentConfig"),ie(this,"textureLoader",new Yi),ie(this,"createPathLine",(n,r,s,a)=>{const l=new _s(n.x,n.y,r,s,a,!1).getSpacedPoints(200),c=new Dh;c.setPositions(l.map(g=>[g.x,g.y,0]).flat());const{color:h,opacity:u}=us(this._currentConfig.pathStyle.color),f=new da({color:h.getHex(),linewidth:(this._currentConfig.pathStyle.size||1)/1e3,vertexColors:!1,dashed:!1,alphaToCoverage:!1,transparent:u<1,opacity:u}),p=new b_(c,f);return p.name="pathLine",ou(p,this._currentData),p}),ie(this,"createShader",(n,r,s)=>{const a=new _s(0,0,n,r,s,!1).getSpacedPoints(200),o=new tt,l=a,c=[];for(let d=0;d<l.length;d++)c.push(d/l.length);const h=[],{color:u,opacity:f}=us(this._currentConfig.pathStyle.color),{color:p,opacity:g}=us(this._currentConfig.flyLineStyle.color);for(let d=0;d<l.length;d++){const M=u.clone().lerp(p,d/l.length);h.push(M.r,M.g,M.b)}o.setFromPoints(l),o.attributes.percent=new rt(new Float32Array(c),1),o.attributes.color=new rt(new Float32Array(h),3);const v=new Cs({vertexColors:!0,size:this._currentConfig.flyLineStyle.size||3,transparent:Math.min(f,g)<1,opacity:Math.min(f,g)}),m=new sa(o,v);return v.onBeforeCompile=function(d){d.vertexShader=d.vertexShader.replace("void main() {",["attribute float percent;","void main() {"].join(`
`)),d.vertexShader=d.vertexShader.replace("gl_PointSize = size;",["gl_PointSize = percent * size;"].join(`
`))},m.name="tadpolePointsMesh",m}),this._store=e,this._config=e.getConfig(),this._currentConfig=Cr({flyLineStyle:this._config.flyLineStyle,pathStyle:this._config.pathStyle}),this._currentData=t,t.style&&Rr(this._currentConfig,t.style)}createMesh(e){var t;const n=new Ke,[r,s]=e,o=new T().addVectors(r,s).clone().multiplyScalar(.5).clone().normalize(),l=(t=this._config.flyLineRFactor)!=null?t:.2,c=Ho(r,s,new T(0,0,0)),h=o.multiplyScalar(this._config.R+c*this._config.R*l),u=w_(r,s,h),f=h.clone().sub(u).length(),p=Ho(r,new T(0,-1,0),u),g=-Math.PI/2+p,v=Math.PI-g,m=this.createPathLine(u,f,g,v),d=(v-g)/7;if(this._currentConfig.flyLineStyle.img){const M=this.createImg(f,g,g+d);M.position.y=u.y,$n({z:0},{z:v-g},_=>{M.rotation.z=_.z},{...this._currentConfig.flyLineStyle,data:this._currentData}),n.add(M)}else{const M=this.createShader(f,g,g+d);M.position.y=u.y,M.name="tadpolePointsMesh",$n({z:0},{z:v-g},_=>{M.rotation.z=_.z},{...this._currentConfig.flyLineStyle,data:this._currentData}),n.add(M)}return this._currentConfig.pathStyle.show!==!1&&n.add(m),n.name="flyLine",n}createImg(e,t,n){const r=new Ke,s=this.textureLoader.load(this._currentConfig.flyLineStyle.img),{color:a,opacity:o}=us(this._currentConfig.flyLineStyle.color),l=new Ts({map:s,color:a,transparent:o<1,opacity:o,depthTest:!0}),c=new Oi(l),h=e*Math.cos(t),u=e*Math.sin(t);c.position.set(h,u,0);const f=this._currentConfig.flyLineStyle.size||3;return c.scale.set(f,f,1),r.add(c),c.name="flyLineSprite",r}create(e,t){const{quaternion:n,startPoint3D:r,endPoint3D:s}=Nh(e,t),a=this.createMesh([r,s]);return a.quaternion.multiply(n),a}}const QS="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAABCtJREFUWIXVmU1oXFUUx3/zSptF4qYliNAUJB8tUnRhXSiSWhcmEekiXVi1C20Ximm7li5EsFDUrYsuBVeNCCroIgXF2iKtCRioIp1shIC1I0g7TUIS7d/FPTfz+vLu+5i8GewfLjP33vPxf3fu3HfuOTVJbAG9wLPAQeAxYAR4GOiz+bvAn8AN4FfgEvADsNS2R0llW03SuKQLkpZVHsumO262SvmvlVzhSeBd4Anr3wNmgW+BOVvJxdgK9gK7gWHgAHAIeAqIbH4eeA/4ouoVHpQ0E1ulRUlnJO1p4xfaY7qLMXsz5iNXv4iDlyXdNsMNSScl9bRBNNl6zFbDbN+WdHQrhGuSzsZW4TNJuyogmmy7zLbHWWXs7SyyH5uBfySd6gDRZDspad18ng+RDimfM8VlSYe7QNa3lyQtme9zRQkfja1sEbI1SaOSPpB0WdJNSavWbtrYhyZT5Bg7bL4l6ZU8woNq/cFO5xiOJB2XVFdx1E0nyrF92uTvKHF6JAX90TWdY/BRSddKEE3imtnI8jFtsjMhwpMm8Jek/gxDz6l1FG0FDbltEvKzU9Itk51MEq5J+tkmpzKMvCC3N6vCqqSxDH9vmdy8cdwgPGYTv0vaHlDeK7enqkbTbKf53G6cJBd7bLzT37DP88B6yht8G/Ap8FDhd35x9JntbSlz68YJ4HUAJPVKWpH0r6SBwJMe78DKJnEi4HvAuK1I6o1vh6sBhZrKHV3toq7wOX3VZMYiXPANLkRMwygwVNkGCGPIfKXBczsYAfutMxcQfrFKVjkI+fLc9ke44Brgt4DwM5VSysbTgXHPbTgC+q3zR0B4ODDeCYwExj23/pqkVWAH0AOspQj7+W5gzXgkscN4rEUpk/9rREDTvodeCn93iUuWL8+tGQEN6zwSEK5XSikbNwLjnlsjokVob0D4x0opZSPky3OrR8B16zwZEP66UkrZ+CYwfsA+r0e49BHA8wHhS8BClawCWMClsdJwaIOLigU/J7oQSxQKfiJcWulL3IlxLPCEn+BSUp3CnPlIwzEct6+AJf8U4/aUWQH8Prlgu2o0zXZeAD+hxBVp3ibeDihjSlVfkSYy/L1pcpuuSGUuoROqZqWbOWTjl9AjfjwpVPSav0/S7BbIziq8DXy7YLIX4+NJoUG1Lpp5+TSfSFkoQXRBxRIpp0z+jqShLMKofKoqkssvfCTpijanqq7Y3GgBoqhkqsq3ByoZiB7AdKsnHU9oT6szCe2dauXRpDYT2vH2qu4vGUypupLBlO4vGbyWp1fU+JDc8eKxKOkdtVeUGTDdeFHmohKnQaiVLXsdwZW9Hrf+PeAn4DtcrOHLXndtvg9X9hohXPZ6H/i8MIM2VsgXFqflIqiyWDHdrhQWk+jDlW5HcQmZYTaXbm/hVv4X4HvgMq1foDT+A+dj9DaZa2PgAAAAAElFTkSuQmCC",KS="data:image/png;base64,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",au=new Yi,$S=au.load(QS),eM=au.load(KS);class zc{constructor(e){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentStyle"),ie(this,"_currentData"),ie(this,"createScatterMesh",t=>{const{geometry:n,material:r}=this.createScatter(),{mesh:s,size:a}=this.setMeshAttr(n,r,t);return s.name="scatter",$n({size:a*1.5,opacity:0},{size:[a*2.8,a*3.5],opacity:[1,.1]},function(o){s.scale.set(o.size,o.size,o.size),s.material.opacity=o.opacity},{...this._currentStyle,data:this._currentData}),s}),ie(this,"createPointMesh",t=>{const{geometry:n,material:r}=this.createPoint(),{mesh:s}=this.setMeshAttr(n,r,t);return s.name="point",s}),ie(this,"createCustomMesh",t=>{var n,r;const{geometry:s,material:a}=this.createCustom(),{mesh:o,size:l}=this.setMeshAttr(s,a,t);o.name="scatter",(n=this._currentStyle.customFigure)!=null&&n.rotate&&(o.rotation.z=this._currentStyle.customFigure.rotate*(Math.PI/180));const c=(r=this._currentStyle.customFigure)==null?void 0:r.animate;return c&&$n(c.from,c.to,function(h){const{size:u,opacity:f}=h;u&&o.scale.set(u,u,u),f&&(o.material.opacity=f)},{...this._currentStyle,data:this._currentData}),o}),this._config=e.getConfig(),this._store=e,this._currentStyle=this._config.scatterStyle}setMeshAttr(e,t,{lon:n,lat:r,...s}){const a=new it(e,t),o=t.name==="scatter"?this._config.R*1.001:this._config.R*1.002,l=this._currentStyle.size||this._config.scatterStyle.size||this._config.R*.05;if(a.scale.set(l*1.3,l*1.3,l*1.3),this._store.mode==="3d"){const{x:c,y:h,z:u}=Zt(o,n,r);a.position.set(c,h,u);const f=new T(0,0,1),p=new T(c,h,u).normalize();a.quaternion.setFromUnitVectors(f,p)}else a.position.set(n,r,.1);return a.userData=s,{mesh:a,size:l}}createScatter(){const e=new jn(1,1),t=new Yt({map:eM,transparent:!0,color:this._currentStyle.color,opacity:1,depthWrite:!1});return t.name="scatter",{geometry:e,material:t}}createPoint(){const e=new jn(1,1),t=new Yt({map:$S,transparent:!0,color:this._currentStyle.color});return t.name="point",{geometry:e,material:t}}createCustom(){var e;const t=new jn(1,1),n=new Yi().load((e=this._currentStyle.customFigure)==null?void 0:e.texture),r=new Yt({map:n,transparent:!0,color:this._currentStyle.color,opacity:1,depthWrite:!1});return r.name="scatter",{geometry:t,material:r}}create(e){var t,n,r;e.style&&(this._currentStyle=Cr(e.style));const s=(n=(t=this._currentStyle.show)!=null?t:this._config.scatterStyle.show)!=null?n:!0,a=new Ke;if(!s)return a.name="pointScatter",a;if((r=this._currentStyle.customFigure)!=null&&r.texture){const o=this.createCustomMesh(e);o.userData={...e},a.add(o)}else{const o=this.createPointMesh(e),l=this.createScatterMesh(e);o.userData={...e},l.userData={...e},a.add(o,l)}return a.name="pointScatter",a}}const fs=i=>{if(typeof i=="string"){const e=i.match(/rgba\s*\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)\s*\)/i);if(e){const t=Number(e[1]),n=Number(e[2]),r=Number(e[3]),s=Math.max(0,Math.min(1,Number(e[4])));return{color:new De(`rgb(${t}, ${n}, ${r})`),opacity:s}}}return{color:new De(i),opacity:1}};class tM{constructor(e,t){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentData"),ie(this,"_currentConfig"),ie(this,"createPathLine",n=>{const r=new tt().setFromPoints(n),{color:s,opacity:a}=fs(this._currentConfig.pathStyle.color),o=new ji({color:s,transparent:a<1,opacity:a}),l=new Jn(r,o);return l.name="pathLine",ou(l,this._currentData),l}),ie(this,"createShader",(n,r)=>{const s=new tt,a=n.slice(0,r),o=[];for(let v=0;v<a.length;v++)o.push(v/a.length);const l=[],{color:c,opacity:h}=fs(this._currentConfig.pathStyle.color),{color:u,opacity:f}=fs(this._currentConfig.flyLineStyle.color);for(let v=0;v<a.length;v++){const m=c.clone().lerp(u,v/a.length);l.push(m.r,m.g,m.b)}s.setFromPoints(a),s.attributes.percent=new rt(new Float32Array(o),1),s.attributes.color=new rt(new Float32Array(l),3);const p=new Cs({vertexColors:!0,size:3,transparent:Math.min(h,f)<1,opacity:Math.min(h,f)}),g=new sa(s,p);return p.onBeforeCompile=function(v){v.vertexShader=v.vertexShader.replace("void main() {",["attribute float percent;","void main() {"].join(`
`)),v.vertexShader=v.vertexShader.replace("gl_PointSize = size;",["gl_PointSize = percent * size;"].join(`
`))},g.name="tadpolePointsMesh",g}),this._store=e,this._config=e.getConfig(),this._currentData=t,this._currentConfig=Cr({flyLineStyle:this._config.flyLineStyle,pathStyle:this._config.pathStyle}),t.style&&Object.assign(this._currentConfig,t.style)}createMesh(e){const t=new Ke,[n,r]=e,s=T_(n,r),o=new Mh(n,s,r).getSpacedPoints(200),l=this.createPathLine(o),c=40,h=this.createShader(o,c);return t.add(l,h),t.name="flyLine",$n({index:0},{index:o.length-c},u=>{h.geometry.setFromPoints(o.slice(u.index,u.index+c))},{...this._currentConfig.flyLineStyle,data:this._currentData}),t}createImg(e,t,n){const r=new Ke,a=new Yi().load(this._currentConfig.flyLineStyle.img),{color:o,opacity:l}=fs(this._currentConfig.flyLineStyle.color),c=new Ts({map:a,color:o,transparent:l<1,opacity:l,depthTest:!0}),h=new Oi(c),u=e*Math.cos(t),f=e*Math.sin(t);h.position.set(u,f,0);const p=this._currentConfig.flyLineStyle.size||3;return h.scale.set(p,p,1),r.add(h),h.name="flyLineSprite",r}create(e,t){return this.createMesh([e,t])}}class nM{constructor(e,t){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentData"),ie(this,"_currentConfig"),ie(this,"tadpolePointsMesh"),ie(this,"points",[]),ie(this,"tadpoleSize",40),ie(this,"calculateRoadPath",n=>{const r=new Ke;return n.forEach((s,a,o)=>{a<o.length-1&&(this._store.mode==="2d"?this.calculateRoadPath2D([s,o[a+1]]):this.calculateArcPath([s,o[a+1]]))}),r.add(this.createPath(this.points)),this.tadpolePointsMesh=this.createShader(this.points),r.add(this.tadpolePointsMesh),r}),ie(this,"calculateRoadPath2D",n=>{const s=new la(n).getPoints(200);this.points=[...this.points,...s]}),ie(this,"calculateArcPath",n=>{const[r,s]=n,{quaternion:a,startPoint3D:o}=Nh(r,s),l=new T(0,0,0),c=Ho(o,new T(0,-1,0),l),h=-Math.PI/2+c,u=Math.PI-h,f=this.roadPathLine3D(h,u),p=this.generateLinePoints(f,a);this.points=[...this.points,...p]}),ie(this,"createShader",n=>{const r=new tt,s=n.slice(0,this.tadpoleSize),a=[];for(let f=0;f<s.length;f++)a.push(f/s.length);const o=[],l=new De(this._currentConfig.flyLineStyle.color),c=new De(this._currentConfig.flyLineStyle.color);for(let f=0;f<s.length;f++){const p=l.lerp(c,f/s.length);o.push(p.r,p.g,p.b)}r.setFromPoints(s),r.attributes.percent=new rt(new Float32Array(a),1),r.attributes.color=new rt(new Float32Array(o),3);const h=new Cs({vertexColors:!0,size:3}),u=new sa(r,h);return h.onBeforeCompile=function(f){f.vertexShader=f.vertexShader.replace("void main() {",["attribute float percent;","void main() {"].join(`
`)),f.vertexShader=f.vertexShader.replace("gl_PointSize = size;",["gl_PointSize = percent * size;"].join(`
`))},u.name="RoadTadpolePointsMesh",u}),ie(this,"generateLinePoints",(n,r)=>n.map(function(s){const a=new T(s.x,s.y,0);return a.applyQuaternion(r),a})),ie(this,"createPath",n=>{const r=new tt().setFromPoints(n),s=new ji({color:this._currentConfig.pathStyle.color}),a=new Jn(r,s);return a.name="roadPathLine",a}),ie(this,"roadPathLine3D",(n,r)=>new _s(0,0,this._config.R,n,r,!1).getSpacedPoints(200)),ie(this,"roadPathLine2D",(n,r)=>{}),this._store=e,this._config=e.getConfig(),this._currentData=t,this._currentConfig=Cr({flyLineStyle:this._config.roadStyle.flyLineStyle,pathStyle:this._config.roadStyle.pathStyle}),t.style&&Rr(this._currentConfig,t.style)}createMesh(e){let t;return this._store.mode==="2d"?t=this.calculateRoadPath(e):t=this.calculateRoadPath(e),t.name="roadLine",$n({index:0},{index:this.points.length-this.tadpoleSize},n=>{this.tadpolePointsMesh.geometry.setFromPoints(this.points.slice(n.index,n.index+this.tadpoleSize))},{...this._currentConfig.flyLineStyle,data:this._currentData}),t}create(e){return this.createMesh(e)}}function iM(i){return!!i&&typeof i=="object"&&"type"in i&&i.type==="FeatureCollection"}function rM(i){return!!i&&typeof i=="object"&&"type"in i&&i.type==="Feature"}function sM(i){const e=i?.type;return!!i&&typeof i=="object"&&typeof e=="string"&&e!=="Feature"&&e!=="FeatureCollection"}function Qo(i,e){i.length>1&&e.push(i)}function lu(i,e){i.forEach(t=>Qo(t,e))}function oM(i,e){i.forEach(t=>lu(t,e))}function aM(i,e){i.geometries.forEach(t=>vs(t,e))}function vs(i,e){if(i)switch(i.type){case"LineString":Qo(i.coordinates,e);return;case"MultiLineString":i.coordinates.forEach(t=>Qo(t,e));return;case"Polygon":lu(i.coordinates,e);return;case"MultiPolygon":oM(i.coordinates,e);return;case"GeometryCollection":aM(i,e);return;default:return}}function lM(i){return typeof i!="string"?i:JSON.parse(i)}function cu(i){const e=lM(i);if(Array.isArray(e))return e;const t=[];return iM(e)?(e.features.forEach(n=>vs(n.geometry,t)),t):rM(e)?(vs(e.geometry,t),t):(sM(e)&&vs(e,t),t)}class cM{constructor(e){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentStyle"),this._config=e.getConfig(),this._store=e,this._currentStyle={...this._config.wallStyle}}createShape(e,t){const n=new bh;n.moveTo(0,0),n.lineTo(0,this._currentStyle.height),n.lineTo(.05,this._currentStyle.width),n.lineTo(.05,0),n.closePath();const s={steps:150,bevelEnabled:!1,extrudePath:new la(e,t)},a=new ha(n,s),o=new Yt({color:this._currentStyle.color,transparent:!0,opacity:this._currentStyle.opacity});return new it(a,o)}create(e){this.getCurrentStyle(e.style);const t=new Ke,n=cu(e.data);return this._store.mode==="3d"?n.forEach(r=>{if(r.length<2)return;let s=[];r.forEach(o=>{const{x:l,y:c,z:h}=Zt(this._config.R,o[0],o[1],1.01);s.push(new T(l,c,h))});const a=this.isClosedLine(r);t.add(this.createShape(s,a))}):n.forEach(r=>{if(r.length<2)return;let s=[];r.forEach(o=>{s.push(new T(o[0],o[1],1))});const a=this.isClosedLine(r);t.add(this.createShape(s,a))}),t.children.length?t:void 0}getCurrentStyle(e){e&&(this._currentStyle={...this._currentStyle,...e})}isClosedLine(e){const t=e[0],n=e[e.length-1];return!t||!n?!1:t[0]===n[0]&&t[1]===n[1]}}const Gc={fontSize:20,color:"#fff"};class hu{constructor(e){ie(this,"_store"),this._store=e}create(e){var t,n;const r=this._store.getConfig(),s=this.mergeStyle((t=r.textMark)==null?void 0:t.style,e.style),{texture:a,width:o,height:l}=this.createTexture(e.text,s),c=r.R*.2,h=c*(o/100),u=c*(l/100),f=new jn(h,u),p=new Yt({map:a,transparent:!0,depthWrite:!1}),g=new it(f,p),v=this.toVector3(r.R,e.position),{x:m,y:d,z:M}=v;this._store.mode==="3d"?(g.position.set(m,d,M*1.01),this.alignToSurface(g,v)):g.position.set(m,d,M),g.userData={...e,style:s,type:"text"};const _=new Ke;_.add(g);const y=(n=e.id)!=null?n:`${e.position.lon}-${e.position.lat}-${e.text}`;return _.name=y.toString(),_.userData.figureType="textMark",_}mergeStyle(e,t){var n,r,s,a;return{fontSize:(r=(n=t?.fontSize)!=null?n:e?.fontSize)!=null?r:Gc.fontSize,color:(a=(s=t?.color)!=null?s:e?.color)!=null?a:Gc.color}}createTexture(e,t){const n=document.createElement("canvas"),r=n.getContext("2d");r.font=`${t.fontSize}px Arial`;const a=r.measureText(e).width,o=t.fontSize*1.5;return n.width=Math.ceil(a+20),n.height=Math.ceil(o+10),r.font=`${t.fontSize}px Arial`,r.fillStyle=t.color,r.textAlign="center",r.textBaseline="middle",r.clearRect(0,0,n.width,n.height),r.fillText(e,n.width/2,n.height/2),{texture:new Uv(n),width:n.width,height:n.height}}toVector3(e,t){if(this._store.mode==="3d"){const{x:n,y:r,z:s}=Zt(e,t.lon,t.lat,1.01);return new T(n,r,s)}return new T(t.lon,t.lat,.1)}alignToSurface(e,t){const n=new T(0,0,1),r=t.clone().normalize();e.quaternion.setFromUnitVectors(n,r);const s=t.clone().normalize();e.lookAt(s),e.rotateY(Math.PI)}}var hM=`varying vec2 vUv;
attribute float percent;
uniform float u_time;
uniform float number;
uniform float speed;
uniform float length;
varying float opacity;
uniform float size;
void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float l = clamp(1.0 - length, 0.0, 1.0);
    gl_PointSize = clamp(fract(percent * number + l - u_time * number * speed) - l, 0.0, 1.0) * size * (1.0 / length);
    opacity = gl_PointSize / size;
    gl_Position = projectionMatrix * mvPosition;
}`,uM=`#ifdef GL_ES
precision mediump float;
#endif
varying float opacity;
uniform vec3 color;
void main() {
    if (opacity <= 0.2) {
        discard;
    }
    gl_FragColor = vec4(color, 1.0);
}`;class fM{constructor(e){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentStyle"),ie(this,"singleUniforms"),this._config=e.getConfig(),this._store=e,this._currentStyle={...this._config.mapStreamStyle}}createFlowingLight(e){const t=[],n=[],r=e.length;e.forEach((o,l)=>{t.push(o.x,o.y,o.z),n.push(l/r)});const s=new tt;s.setAttribute("position",new at(t,3)),s.setAttribute("percent",new at(n,1));const a=new xn({vertexShader:hM,fragmentShader:uM,uniforms:this.singleUniforms,transparent:!0});return new Jn(s,a)}createStaticLine(e){const t=new tt().setFromPoints(e),n=new ji({color:this._currentStyle.color,transparent:!0,opacity:this._currentStyle.opacity});return new Jn(t,n)}create(e){this.getCurrentStyle(e.style);const t=this._currentStyle.speed>0;t&&this.startAnimation();const n=new Ke,r=cu(e.data);return this._store.mode==="3d"?r.forEach(s=>{if(s.length<2)return;let a=[];s.forEach(o=>{const{x:l,y:c,z:h}=Zt(this._config.R,o[0],o[1],1.001);a.push(new T(l,c,h))}),n.add(t?this.createFlowingLight(a):this.createStaticLine(a))}):r.forEach(s=>{if(s.length<2)return;let a=[];s.forEach(o=>{a.push(new T(o[0],o[1],1))}),n.add(t?this.createFlowingLight(a):this.createStaticLine(a))}),n.children.length?n:void 0}getCurrentStyle(e){e&&(this._currentStyle={...this._currentStyle,...e}),this.singleUniforms={u_time:{value:1},number:{type:"f",value:this._currentStyle.splitLine},speed:{type:"f",value:this._currentStyle.speed},length:{type:"f",value:2.2},size:{type:"f",value:10},color:{type:"v3",value:new De(this._currentStyle.color)}}}startAnimation(){$n({u_time:0},{u_time:1},e=>{this.singleUniforms.u_time.value=e.u_time},{...this._currentStyle,duration:1e4})}}function uu(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},a={},o=i[0].morphTargetsRelative,l=new tt;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0;const u=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in s){const u=Hc(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let v=0;v<a[h].length;++v)p.push(a[h][v][f]);const g=Hc(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Hc(i){let e,t,n,r=0;for(let o=0;o<i.length;++o){const l=i[o];if(l.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=l.array.constructor),e!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=l.itemSize),t!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=l.normalized),n!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;r+=l.array.length}const s=new e(r);let a=0;for(let o=0;o<i.length;++o)s.set(i[o].array,a),a+=i[o].array.length;return new rt(s,t,n)}class dM{constructor(e){ie(this,"_config"),ie(this,"_store"),ie(this,"_currentData"),ie(this,"_commonStyle"),ie(this,"createMesh",t=>{const n=[];t.forEach(a=>{const o=a.value,l=a.position,c=this.getCurrentStyle(a),h=new Wi(c.width,c.height,o),u=new De(c.color),f=[],p=h.attributes.position;for(let g=0;g<p.count;g++)f.push(u.r,u.g,u.b);if(h.attributes.color=new rt(new Float32Array(f),3),this._store.mode==="2d")h.translate(l.lon,l.lat,o/2);else{h.translate(0,0,this._config.R+o/2);const g=Zt(this._config.R,l.lon,l.lat);h.lookAt(new T(g.x,g.y,g.z))}n.push(h)});const r=uu(n),s=new ua({vertexColors:!0});return new it(r,s)}),ie(this,"getCurrentStyle",t=>{const{style:n={}}=t;return{...this._commonStyle,...n}}),this._store=e,this._config=e.getConfig(),this._commonStyle=Cr(this._config.barStyle)}create(e){return this.createMesh(e)}}class pM{constructor(e){ie(this,"_store"),ie(this,"addData",(t,n)=>{const r=[],s=this._store.getConfig();if(t==="flyLine")n.forEach(a=>{const{from:o,to:l}=a;let c;if(o.id&&l.id?c=`${o.id}-${l.id}`:c=`${o.lon}${o.lat}-${l.lon}${l.lat}`,this._store.flyLineMap[c])return;const h=new Ke;this._store.flyLineMap[c]=!0;const u=new zc(this._store);if(this._store.mode==="3d"){const f=Zt(s.R,o.lon,o.lat),p=Zt(s.R,l.lon,l.lat);h.add(u.create(o),u.create(l));const g=new JS(this._store,a);h.add(g.create(new T(f.x,f.y,f.z),new T(p.x,p.y,p.z)))}else{const f=new tM(this._store,a);h.add(f.create(new T(o.lon,o.lat,1),new T(l.lon,l.lat,1))),h.add(u.create(o),u.create(l))}h.name=c,h.userData.figureType="flyLine",r.push(h)});else if(t==="point")n.forEach(a=>{let o=a.id||`${a.lon}-${a.lat}`;if(this._store.flyLineMap[o])return;const l=new Ke;this._store.flyLineMap[o]=!0;const c=new zc(this._store);l.add(c.create(a)),l.name=o.toString(),l.userData.figureType="point",r.push(l)});else if(t==="road")n.forEach(a=>{let o=a.id||R_();const l=a.path.map(({lon:u,lat:f},p)=>{if(this._store.mode==="2d")return new T(u,f,0);{const g=Zt(s.R*1.1,u,f);return new T(g.x,g.y,g.z)}}),h=new nM(this._store,{path:l,style:a.style}).create(l);h.name=o.toString(),h.userData.figureType="road",r.push(h)});else if(t==="wall"){const a=new Ke;a.userData.figureType="wall";const l=new cM(this._store).create(n);l&&a.add(l),r.push(a)}else if(t==="mapStreamLine"){const a=new Ke;a.userData.figureType="mapStreamLine";const l=new fM(this._store).create(n);l&&a.add(l),r.push(a)}else if(t==="bar"){const a=new Ke,l=new dM(this._store).create(n);a.add(l),a.userData.figureType="bar",a.name="bar",r.push(a)}else if(t==="textMark"){const a=new hu(this._store);n.forEach(o=>{const l=a.create(o);l.userData.figureType="textMark",r.push(l)})}return Promise.resolve(r)}),ie(this,"setData",(t,n)=>this.addData(t,n)),this._store=e}remove(e,t,n){if(e.children.length!==0)for(let r=e.children.length-1;r>=0;r--){let s=e.children[r];s instanceof Ke&&s.name!=="mapGroup"&&s.userData.figureType===t&&(n==="removeAll"?(this._store.flyLineMap[s.name]&&delete this._store.flyLineMap[s.name],this.disposeGroup(s),e.remove(s)):n.includes(s.name)&&(this._store.flyLineMap[s.name]&&delete this._store.flyLineMap[s.name],this.disposeGroup(s),e.remove(s)))}}disposeGroup(e){e.traverse(t=>{t instanceof Ke||t.geometry.dispose()})}}class mM{constructor(e){ie(this,"materialMap",{MeshPhongMaterial:t=>new Er({...this._config.earth,map:t}),MeshBasicMaterial:t=>new Yt({...this._config.earth,map:t}),MeshLambertMaterial:t=>new xs({...this._config.earth,map:t}),MeshMatcapMaterial:()=>new ua({...this._config.earth}),MeshNormalMaterial:()=>new Rh,default:t=>new Er({...this._config.earth,map:t})}),ie(this,"_config"),ie(this,"_store"),this._config=e.getConfig(),this._store=e,this._config.earth.material=this.normalizeMaterialKey(this._config.earth.material)}normalizeMaterialKey(e){if(!e)return"MeshPhongMaterial";const t=e.toLowerCase();return t.includes("basic")?"MeshBasicMaterial":t.includes("lambert")?"MeshLambertMaterial":t.includes("matcap")?"MeshMatcapMaterial":t.includes("normal")?"MeshNormalMaterial":"MeshPhongMaterial"}createSphereMesh(){const e=new ys(this._config.R-1,39,39),t=this.normalizeMaterialKey(this._config.earth.material);this._config.earth.material=t;const r=(this.materialMap[t]||this.materialMap.default)(),s=new it(e,r);return s.castShadow=!0,s.name="earthMesh",s}createTextureSphereMesh(){var e;const t={map:new Yi().load((e=this._config.texture)==null?void 0:e.path)};t.map.colorSpace="srgb";const n=new ys(this._config.R-1,39,39),r=this.normalizeMaterialKey(this._config.earth.material);this._config.earth.material=r;const a=(this.materialMap[r]||this.materialMap.default)(t.map),o=new it(n,a);return o.castShadow=!0,o.name="earthMesh",o}create(){var e;const t=new Ke;return(e=this._config.texture)!=null&&e.path?t.add(this.createTextureSphereMesh()):t.add(this.createSphereMesh()),t.name="mapGroup",t}}const _n=11102230246251565e-32,Mt=134217729,gM=(3+8*_n)*_n;function bo(i,e,t,n,r){let s,a,o,l,c=e[0],h=n[0],u=0,f=0;h>c==h>-c?(s=c,c=e[++u]):(s=h,h=n[++f]);let p=0;if(u<i&&f<t)for(h>c==h>-c?(a=c+s,o=s-(a-c),c=e[++u]):(a=h+s,o=s-(a-h),h=n[++f]),s=a,o!==0&&(r[p++]=o);u<i&&f<t;)h>c==h>-c?(a=s+c,l=a-s,o=s-(a-l)+(c-l),c=e[++u]):(a=s+h,l=a-s,o=s-(a-l)+(h-l),h=n[++f]),s=a,o!==0&&(r[p++]=o);for(;u<i;)a=s+c,l=a-s,o=s-(a-l)+(c-l),c=e[++u],s=a,o!==0&&(r[p++]=o);for(;f<t;)a=s+h,l=a-s,o=s-(a-l)+(h-l),h=n[++f],s=a,o!==0&&(r[p++]=o);return(s!==0||p===0)&&(r[p++]=s),p}function vM(i,e){let t=e[0];for(let n=1;n<i;n++)t+=e[n];return t}function Pr(i){return new Float64Array(i)}const _M=(3+16*_n)*_n,yM=(2+12*_n)*_n,xM=(9+64*_n)*_n*_n,Ci=Pr(4),Vc=Pr(8),kc=Pr(12),Wc=Pr(16),Tt=Pr(4);function SM(i,e,t,n,r,s,a){let o,l,c,h,u,f,p,g,v,m,d,M,_,y,A,C,U,F;const x=i-r,E=t-r,O=e-s,V=n-s;y=x*V,f=Mt*x,p=f-(f-x),g=x-p,f=Mt*V,v=f-(f-V),m=V-v,A=g*m-(y-p*v-g*v-p*m),C=O*E,f=Mt*O,p=f-(f-O),g=O-p,f=Mt*E,v=f-(f-E),m=E-v,U=g*m-(C-p*v-g*v-p*m),d=A-U,u=A-d,Ci[0]=A-(d+u)+(u-U),M=y+d,u=M-y,_=y-(M-u)+(d-u),d=_-C,u=_-d,Ci[1]=_-(d+u)+(u-C),F=M+d,u=F-M,Ci[2]=M-(F-u)+(d-u),Ci[3]=F;let L=vM(4,Ci),N=yM*a;if(L>=N||-L>=N||(u=i-x,o=i-(x+u)+(u-r),u=t-E,c=t-(E+u)+(u-r),u=e-O,l=e-(O+u)+(u-s),u=n-V,h=n-(V+u)+(u-s),o===0&&l===0&&c===0&&h===0)||(N=xM*a+gM*Math.abs(L),L+=x*h+V*o-(O*c+E*l),L>=N||-L>=N))return L;y=o*V,f=Mt*o,p=f-(f-o),g=o-p,f=Mt*V,v=f-(f-V),m=V-v,A=g*m-(y-p*v-g*v-p*m),C=l*E,f=Mt*l,p=f-(f-l),g=l-p,f=Mt*E,v=f-(f-E),m=E-v,U=g*m-(C-p*v-g*v-p*m),d=A-U,u=A-d,Tt[0]=A-(d+u)+(u-U),M=y+d,u=M-y,_=y-(M-u)+(d-u),d=_-C,u=_-d,Tt[1]=_-(d+u)+(u-C),F=M+d,u=F-M,Tt[2]=M-(F-u)+(d-u),Tt[3]=F;const G=bo(4,Ci,4,Tt,Vc);y=x*h,f=Mt*x,p=f-(f-x),g=x-p,f=Mt*h,v=f-(f-h),m=h-v,A=g*m-(y-p*v-g*v-p*m),C=O*c,f=Mt*O,p=f-(f-O),g=O-p,f=Mt*c,v=f-(f-c),m=c-v,U=g*m-(C-p*v-g*v-p*m),d=A-U,u=A-d,Tt[0]=A-(d+u)+(u-U),M=y+d,u=M-y,_=y-(M-u)+(d-u),d=_-C,u=_-d,Tt[1]=_-(d+u)+(u-C),F=M+d,u=F-M,Tt[2]=M-(F-u)+(d-u),Tt[3]=F;const Q=bo(G,Vc,4,Tt,kc);y=o*h,f=Mt*o,p=f-(f-o),g=o-p,f=Mt*h,v=f-(f-h),m=h-v,A=g*m-(y-p*v-g*v-p*m),C=l*c,f=Mt*l,p=f-(f-l),g=l-p,f=Mt*c,v=f-(f-c),m=c-v,U=g*m-(C-p*v-g*v-p*m),d=A-U,u=A-d,Tt[0]=A-(d+u)+(u-U),M=y+d,u=M-y,_=y-(M-u)+(d-u),d=_-C,u=_-d,Tt[1]=_-(d+u)+(u-C),F=M+d,u=F-M,Tt[2]=M-(F-u)+(d-u),Tt[3]=F;const z=bo(Q,kc,4,Tt,Wc);return Wc[z-1]}function ds(i,e,t,n,r,s){const a=(e-s)*(t-r),o=(i-r)*(n-s),l=a-o,c=Math.abs(a+o);return Math.abs(l)>=_M*c?l:-SM(i,e,t,n,r,s,c)}const Xc=Math.pow(2,-52),ps=new Uint32Array(512);class Sa{static from(e,t=wM,n=TM){const r=e.length,s=new Float64Array(r*2);for(let a=0;a<r;a++){const o=e[a];s[2*a]=t(o),s[2*a+1]=n(o)}return new Sa(s)}constructor(e){const t=e.length>>1;if(t>0&&typeof e[0]!="number")throw new Error("Expected coords to contain numbers.");this.coords=e;const n=Math.max(2*t-5,0);this._triangles=new Uint32Array(n*3),this._halfedges=new Int32Array(n*3),this._hashSize=Math.ceil(Math.sqrt(t)),this._hullPrev=new Uint32Array(t),this._hullNext=new Uint32Array(t),this._hullTri=new Uint32Array(t),this._hullHash=new Int32Array(this._hashSize).fill(-1),this._ids=new Uint32Array(t),this._dists=new Float64Array(t),this.update()}update(){const{coords:e,_hullPrev:t,_hullNext:n,_hullTri:r,_hullHash:s}=this,a=e.length>>1;let o=1/0,l=1/0,c=-1/0,h=-1/0;for(let E=0;E<a;E++){const O=e[2*E],V=e[2*E+1];O<o&&(o=O),V<l&&(l=V),O>c&&(c=O),V>h&&(h=V),this._ids[E]=E}const u=(o+c)/2,f=(l+h)/2;let p=1/0,g,v,m;for(let E=0;E<a;E++){const O=wo(u,f,e[2*E],e[2*E+1]);O<p&&(g=E,p=O)}const d=e[2*g],M=e[2*g+1];p=1/0;for(let E=0;E<a;E++){if(E===g)continue;const O=wo(d,M,e[2*E],e[2*E+1]);O<p&&O>0&&(v=E,p=O)}let _=e[2*v],y=e[2*v+1],A=1/0;for(let E=0;E<a;E++){if(E===g||E===v)continue;const O=AM(d,M,_,y,e[2*E],e[2*E+1]);O<A&&(m=E,A=O)}let C=e[2*m],U=e[2*m+1];if(A===1/0){for(let V=0;V<a;V++)this._dists[V]=e[2*V]-e[0]||e[2*V+1]-e[1];Ii(this._ids,this._dists,0,a-1);const E=new Uint32Array(a);let O=0;for(let V=0,L=-1/0;V<a;V++){const N=this._ids[V];this._dists[N]>L&&(E[O++]=N,L=this._dists[N])}this.hull=E.subarray(0,O),this.triangles=new Uint32Array(0),this.halfedges=new Uint32Array(0);return}if(ds(d,M,_,y,C,U)<0){const E=v,O=_,V=y;v=m,_=C,y=U,m=E,C=O,U=V}const F=bM(d,M,_,y,C,U);this._cx=F.x,this._cy=F.y;for(let E=0;E<a;E++)this._dists[E]=wo(e[2*E],e[2*E+1],F.x,F.y);Ii(this._ids,this._dists,0,a-1),this._hullStart=g;let x=3;n[g]=t[m]=v,n[v]=t[g]=m,n[m]=t[v]=g,r[g]=0,r[v]=1,r[m]=2,s.fill(-1),s[this._hashKey(d,M)]=g,s[this._hashKey(_,y)]=v,s[this._hashKey(C,U)]=m,this.trianglesLen=0,this._addTriangle(g,v,m,-1,-1,-1);for(let E=0,O,V;E<this._ids.length;E++){const L=this._ids[E],N=e[2*L],G=e[2*L+1];if(E>0&&Math.abs(N-O)<=Xc&&Math.abs(G-V)<=Xc||(O=N,V=G,L===g||L===v||L===m))continue;let Q=0;for(let ge=0,pe=this._hashKey(N,G);ge<this._hashSize&&(Q=s[(pe+ge)%this._hashSize],!(Q!==-1&&Q!==n[Q]));ge++);Q=t[Q];let z=Q,W;for(;W=n[z],ds(N,G,e[2*z],e[2*z+1],e[2*W],e[2*W+1])>=0;)if(z=W,z===Q){z=-1;break}if(z===-1)continue;let K=this._addTriangle(z,L,n[z],-1,-1,r[z]);r[L]=this._legalize(K+2),r[z]=K,x++;let $=n[z];for(;W=n[$],ds(N,G,e[2*$],e[2*$+1],e[2*W],e[2*W+1])<0;)K=this._addTriangle($,L,W,r[L],-1,r[$]),r[L]=this._legalize(K+2),n[$]=$,x--,$=W;if(z===Q)for(;W=t[z],ds(N,G,e[2*W],e[2*W+1],e[2*z],e[2*z+1])<0;)K=this._addTriangle(W,L,z,-1,r[z],r[W]),this._legalize(K+2),r[W]=K,n[z]=z,x--,z=W;this._hullStart=t[L]=z,n[z]=t[$]=L,n[L]=$,s[this._hashKey(N,G)]=L,s[this._hashKey(e[2*z],e[2*z+1])]=z}this.hull=new Uint32Array(x);for(let E=0,O=this._hullStart;E<x;E++)this.hull[E]=O,O=n[O];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(e,t){return Math.floor(MM(e-this._cx,t-this._cy)*this._hashSize)%this._hashSize}_legalize(e){const{_triangles:t,_halfedges:n,coords:r}=this;let s=0,a=0;for(;;){const o=n[e],l=e-e%3;if(a=l+(e+2)%3,o===-1){if(s===0)break;e=ps[--s];continue}const c=o-o%3,h=l+(e+1)%3,u=c+(o+2)%3,f=t[a],p=t[e],g=t[h],v=t[u];if(EM(r[2*f],r[2*f+1],r[2*p],r[2*p+1],r[2*g],r[2*g+1],r[2*v],r[2*v+1])){t[e]=v,t[o]=f;const d=n[u];if(d===-1){let _=this._hullStart;do{if(this._hullTri[_]===u){this._hullTri[_]=e;break}_=this._hullPrev[_]}while(_!==this._hullStart)}this._link(e,d),this._link(o,n[a]),this._link(a,u);const M=c+(o+1)%3;s<ps.length&&(ps[s++]=M)}else{if(s===0)break;e=ps[--s]}}return a}_link(e,t){this._halfedges[e]=t,t!==-1&&(this._halfedges[t]=e)}_addTriangle(e,t,n,r,s,a){const o=this.trianglesLen;return this._triangles[o]=e,this._triangles[o+1]=t,this._triangles[o+2]=n,this._link(o,r),this._link(o+1,s),this._link(o+2,a),this.trianglesLen+=3,o}}function MM(i,e){const t=i/(Math.abs(i)+Math.abs(e));return(e>0?3-t:1+t)/4}function wo(i,e,t,n){const r=i-t,s=e-n;return r*r+s*s}function EM(i,e,t,n,r,s,a,o){const l=i-a,c=e-o,h=t-a,u=n-o,f=r-a,p=s-o,g=l*l+c*c,v=h*h+u*u,m=f*f+p*p;return l*(u*m-v*p)-c*(h*m-v*f)+g*(h*p-u*f)<0}function AM(i,e,t,n,r,s){const a=t-i,o=n-e,l=r-i,c=s-e,h=a*a+o*o,u=l*l+c*c,f=.5/(a*c-o*l),p=(c*h-o*u)*f,g=(a*u-l*h)*f;return p*p+g*g}function bM(i,e,t,n,r,s){const a=t-i,o=n-e,l=r-i,c=s-e,h=a*a+o*o,u=l*l+c*c,f=.5/(a*c-o*l),p=i+(c*h-o*u)*f,g=e+(a*u-l*h)*f;return{x:p,y:g}}function Ii(i,e,t,n){if(n-t<=20)for(let r=t+1;r<=n;r++){const s=i[r],a=e[s];let o=r-1;for(;o>=t&&e[i[o]]>a;)i[o+1]=i[o--];i[o+1]=s}else{const r=t+n>>1;let s=t+1,a=n;or(i,r,s),e[i[t]]>e[i[n]]&&or(i,t,n),e[i[s]]>e[i[n]]&&or(i,s,n),e[i[t]]>e[i[s]]&&or(i,t,s);const o=i[s],l=e[o];for(;;){do s++;while(e[i[s]]<l);do a--;while(e[i[a]]>l);if(a<s)break;or(i,s,a)}i[t+1]=i[a],i[a]=o,n-s+1>=a-t?(Ii(i,e,s,n),Ii(i,e,t,a-1)):(Ii(i,e,t,a-1),Ii(i,e,s,n))}}function or(i,e,t){const n=i[e];i[e]=i[t],i[t]=n}function wM(i){return i[0]}function TM(i){return i[1]}class CM{constructor(){ie(this,"hashMap",{})}registerMap(e,t){this.hashMap[e]=t}}const fu=new CM;class jc{constructor(e){ie(this,"_config"),ie(this,"wallPoints",{}),ie(this,"currentStyle"),ie(this,"features"),ie(this,"geometryArr",[]),ie(this,"_options"),this._config=e._store.getConfig(),this._options=e.options,this.features=fu.hashMap[e.options.map]}create(){const e=[];return this.features.forEach(t=>{var n,r,s;if(this.getCurrentStyle((n=t.properties)==null?void 0:n.name),this.currentStyle.show===!1)return;this.geometryArr=[];const a=new Ke;a.name=`countryGroup-${(r=t.properties)==null?void 0:r.name}`;let o=[];if(t.geometry.type==="Polygon"?o.push(t.geometry.coordinates):t.geometry.type==="MultiPolygon"&&(o=t.geometry.coordinates),this._options.mode==="2d"){const{lineArr:c}=this.create2d(o);a.add(...c)}else{const{lineArr:c}=this.create3d(o);a.add(...c)}const l=this.mergeGeometry();a.add(l),l.name=(s=t.properties)==null?void 0:s.name,l.userData={...t.properties,type:"country",backupColor:this.currentStyle.areaColor,opacity:this.currentStyle.opacity},e.push(a)}),e}create2d(e){const t=[];return e.forEach(n=>{if(!n[0])return;const{linePoints2d:r,allPoints2d:s,usefulIndexArr:a}=this.gridPoint(n[0]),o=this.createShapeGeometry(a,s);this.geometryArr.push(o);const l=this.createLineMesh(r);t.push(l)}),{lineArr:t}}create3d(e){const t=[];return e.forEach(n=>{if(!n[0])return;const{linePoints3d:r,allPoints3d:s,usefulIndexArr:a}=this.gridPoint(n[0]),o=this.createShapeGeometry(a,s);this.geometryArr.push(o);const l=this.createLineMesh(r);t.push(l)}),{lineArr:t}}createShapeGeometry(e,t){const n=new tt;return n.index=new rt(new Uint16Array(e),1),n.attributes.position=new rt(new Float32Array(t),3),n}createLineMesh(e){const t=new tt;t.setAttribute("position",new rt(new Float32Array(e),3));const n=new ji({color:this._config.mapStyle.lineColor});return new yh(t,n)}mergeGeometry(){let e;this.geometryArr.length>1?e=uu(this.geometryArr):e=this.geometryArr[0],e.computeVertexNormals();const t=this.createMaterial();return new it(e,t)}createMaterial(){const e=this.currentStyle.material||this._config.mapStyle.material||"MeshBasicMaterial",t=typeof this.currentStyle.opacity=="number"&&this.currentStyle.opacity<1,n={color:this.currentStyle.areaColor,side:Et,opacity:this.currentStyle.opacity,transparent:t};return e==="MeshLambertMaterial"?new xs(n):e==="MeshPhongMaterial"?new Er(n):new Yt(n)}gridPoint(e){const t=[],n=[],r=[],s=[],a=[],o=[];e.forEach(_=>{a.push(_[0]),o.push(_[1]);const y=Zt(this._config.R+.1,_[0],_[1]),A=Zt(this._config.R,_[0],_[1]);n.push(y.x,y.y,y.z),s.push(..._,0),t.push(A.x,A.y,A.z),r.push(..._,0)});const[l,c]=this.minMax(a),[h,u]=this.minMax(o),f=2,p=Math.ceil((c-l)/f),g=Math.ceil((u-h)/f),v=[];for(let _=0;_<p+1;_++)for(let y=0;y<g+1;y++)v.push([l+_*f,h+y*f]);const m=[];v.forEach(_=>{if(this.pointInPolygon(_,e)){m.push(_);const y=Zt(this._config.R,_[0],_[1]),{x:A,y:C,z:U}=y;t.push(A,C,U),r.push(_[0],_[1],0)}});const d=[...e,...m],M=this.trianglePlan(d,e);return{linePoints3d:n,allPoints3d:t,linePoints2d:s,usefulIndexArr:M,allPoints2d:r}}minMax(e){return e.sort(this.compareNum),[Math.floor(e[0]),Math.ceil(e[e.length-1])]}compareNum(e,t){return e<t?-1:e>t?1:0}pointInPolygon(e,t){const n=e[0],r=e[1];let s=!1;for(let a=0,o=t.length-1;a<t.length;o=a++){const l=t[a][0],c=t[a][1],h=t[o][0],u=t[o][1];c>r!=u>r&&n<(h-l)*(r-c)/(u-c)+l&&(s=!s)}return s}trianglePlan(e,t){const n=Sa.from(e).triangles,r=[];for(let s=0;s<n.length;s+=3){const a=e[n[s]],o=e[n[s+1]],l=e[n[s+2]],c=[(a[0]+o[0]+l[0])/3,(a[1]+o[1]+l[1])/3];this.pointInPolygon(c,t)&&r.push(n[s],n[s+1],n[s+2])}return r}getCurrentStyle(e){var t;this.currentStyle={...this._config.mapStyle},(t=this._config.regions)!=null&&t[e]&&Object.assign(this.currentStyle,this._config.regions[e])}}const RM="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF7WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMy0wNS0xN1QxNToxMjoyNCswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjMtMDUtMTdUMTU6Mjk6MzgrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjMtMDUtMTdUMTU6Mjk6MzgrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTk0ZTQ4MTItMzFiYS00MDU4LTlmOGEtYjAxOGM4YjYxNDhmIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwN0EwODYwNzRCMjExRUFCMzNCQzFEN0Q0QTAxNzNBIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjA3QTA4NjA3NEIyMTFFQUIzM0JDMUQ3RDRBMDE3M0EiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDdBMDg1RDc0QjIxMUVBQjMzQkMxRDdENEEwMTczQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDdBMDg1RTc0QjIxMUVBQjMzQkMxRDdENEEwMTczQSIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxOTRlNDgxMi0zMWJhLTQwNTgtOWY4YS1iMDE4YzhiNjE0OGYiIHN0RXZ0OndoZW49IjIwMjMtMDUtMTdUMTU6Mjk6MzgrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkgLAT0AAGqESURBVHic7b35tyxHcTUa914NIIGQEGKwzWBs7M9+673///94632fzWjAWCAhJASah/N+qNPcPnVz2DFlZlXvvdZZXZUZEZndpzr3jsjq7kd3d3dC3BQenWycEWNFxh/5uhwNkYtR9sI2cuEcNRbJ4MbwiALgZjCCeM4gLiJik+TjEbFQZS52ZyJpksKNgALg3DgDIWeP4Ym7CtHPmMcqC4dnHlnP4Uwkvcr/mUgABcA5cWRCzh7DGvNMWxozcISSecYczyIGSBQnBAXAuXBUUs6Mb4l3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",PM=i=>{const t=new Yi().load(RM),n=new Ts({color:i.spriteStyle.color,map:t,transparent:!0,opacity:1,depthWrite:!1}),r=new Oi(n),s=i.spriteStyle.size||3;return r.scale.set(i.R*s,i.R*s,1),r},LM={R:160,flyLineRFactor:.2,enableZoom:!0,zoom:1,pixelRatio:void 0,earth:{color:"#13162c",material:"MeshPhongMaterial",dragConfig:{rotationSpeed:1,inertiaFactor:.95,panSpeed:.2,disableX:!1,disableY:!1}},map:"world",stopRotateByHover:!0,texture:{path:"",mixed:!1},bgStyle:{color:"#040D21",opacity:1},mapStyle:{areaColor:"#2e3564",lineColor:"#797eff",opacity:1,material:"MeshBasicMaterial"},spriteStyle:{color:"#797eff",show:!0},pathStyle:{color:"#cd79ff",show:!0},flyLineStyle:{color:"#cd79ff"},roadStyle:{flyLineStyle:{color:"#cd79ff"},pathStyle:{color:"#cd79ff"}},barStyle:{color:"#cd79ff",width:.5,height:.5},hoverRegionStyle:{areaColor:"#cd79ff",opacity:1,show:!0},scatterStyle:{color:"#cd79ff",show:!0},wallStyle:{color:"#cd79ff",opacity:.5,height:2,width:2},mapStreamStyle:{color:"#f0f0f0",opacity:.5,speed:1,splitLine:3},textMark:{style:{fontSize:20,color:"#fff"},data:[]}};class IM{constructor(){ie(this,"mode","3d"),ie(this,"config",{...LM}),ie(this,"flyLineMap",{})}setConfig(e){this.mode=e.mode||"3d",this.config=Rr({},this.config,e.config)}getConfig(){return this.config}}class UM{constructor(e){ie(this,"eventMap",{}),ie(this,"buildInEventMap",{}),ie(this,"_chartScene"),ie(this,"currentMesh"),ie(this,"areaColorNeedChange",!1),ie(this,"raycaster"),ie(this,"listeners",[]),this._chartScene=e,this.raycaster=new Ih,this.areaColorNeedChange=this._chartScene.options.config&&this._chartScene.options.config.hoverRegionStyle&&this._chartScene.options.config.hoverRegionStyle.show,this.registerBuildInEventMap("mousemove",()=>{this.areaColorNeedChange&&this.currentMesh&&(this.currentMesh.material.color.set(this.currentMesh.userData.backupColor),this.currentMesh.material.opacity=this.currentMesh.userData.opacity)})}registerEventMap(e,t){this.eventMap[e]=t;const n=r=>{this.notification(r)};this.listeners.push({event:e,handler:n}),this._chartScene.options.dom.addEventListener(e,n)}registerBuildInEventMap(e,t){const n=r=>{const s=this.handleRaycaster(r);s&&s.type!=="TransformControlsPlane"?this._chartScene.earthHovered=!0:this._chartScene.earthHovered=!1,t(),s&&s.userData.type==="country"&&this.areaColorNeedChange?(this.buildInEventMap[e]=t,this.currentMesh=s,this.currentMesh.material.color.set(this._chartScene.options.config.hoverRegionStyle.areaColor),this.currentMesh.material.opacity=this._chartScene.options.config.hoverRegionStyle.opacity):this.currentMesh=null};this.listeners.push({event:e,handler:n}),this._chartScene.options.dom.addEventListener(e,n)}notification(e){const t=this.handleRaycaster(e);t&&this.eventMap[e.type](e,t)}getMousePosition(e){const t=this._chartScene.renderer.domElement.getBoundingClientRect();return{clientX:(e.clientX-t.left)/t.width*2-1,clientY:-((e.clientY-t.top)/t.height)*2+1}}handleRaycaster(e){const t=this.getMousePosition(e),n=t.clientX,r=t.clientY;this.raycaster.setFromCamera(new ae(n,r),this._chartScene.camera);const s=this.raycaster.intersectObjects(this._chartScene.scene.children,!0);if(s.length>0)return s[0].object}destroy(){this.listeners.forEach(({event:e,handler:t})=>{this._chartScene.options.dom.removeEventListener(e,t)}),this.listeners=[],this.eventMap={},this.buildInEventMap={},this.currentMesh=null}}class DM{constructor(e,t,n){ie(this,"earth"),ie(this,"isDragging"),ie(this,"previousMousePosition"),ie(this,"raycaster"),ie(this,"options",{rotationSpeed:1,inertiaFactor:.95,panSpeed:1,disableX:!1,disableY:!1}),ie(this,"rotationVelocity"),ie(this,"mouse"),this.earth=e,this.isDragging=!1,this.previousMousePosition={x:0,y:0},Object.assign(this.options,n),this.options.inertiaFactor>1?this.options.inertiaFactor=1:this.options.inertiaFactor,this.raycaster=new Ih,this.rotationVelocity={x:0,y:0},t.domElement.addEventListener("mousedown",this.onMouseDown.bind(this),!1),t.domElement.addEventListener("mousemove",this.onMouseMove.bind(this),!1),t.domElement.addEventListener("mouseup",this.onMouseUp.bind(this),!1)}onMouseDown(e){this.isDragging=!0,this.previousMousePosition.x=e.clientX,this.previousMousePosition.y=e.clientY}onMouseMove(e){var t;if(this.isDragging){const n=e.clientX-this.previousMousePosition.x,r=e.clientY-this.previousMousePosition.y;if(e.ctrlKey||e.metaKey){const s=((t=this.earth.scale)==null?void 0:t.x)||1,a=this.options.panSpeed/s;this.earth.position.x+=n*a,this.earth.position.y-=r*a}else this.options.disableY||(this.rotationVelocity.x=r*this.options.rotationSpeed*.005),this.options.disableX||(this.rotationVelocity.y=n*this.options.rotationSpeed*-.005),this.earth.rotateOnWorldAxis(new T(0,1,0),-this.rotationVelocity.y),this.earth.rotateX(this.rotationVelocity.x);this.previousMousePosition.x=e.clientX,this.previousMousePosition.y=e.clientY}}onMouseUp(e){this.isDragging=!1}isDraggingEarth(e){return this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.intersectObject(this.earth).length>0}update(){this.isDragging||(this.earth.rotateOnWorldAxis(new T(0,1,0),-this.rotationVelocity.y),this.earth.rotateX(this.rotationVelocity.x),this.rotationVelocity.x*=this.options.inertiaFactor,this.rotationVelocity.y*=this.options.inertiaFactor)}}class NM{constructor(e){ie(this,"chart"),ie(this,"panel"),ie(this,"controlsContainer"),ie(this,"dragState",{isDragging:!1,offsetX:0,offsetY:0}),this.chart=e,this.panel=document.createElement("div"),this.panel.style.position="absolute",this.panel.style.top="12px",this.panel.style.right="12px",this.panel.style.width="260px",this.panel.style.maxHeight="none",this.panel.style.overflow="visible",this.panel.style.padding="12px",this.panel.style.background="rgba(0,0,0,0.65)",this.panel.style.color="#fff",this.panel.style.fontSize="12px",this.panel.style.lineHeight="1.4",this.panel.style.borderRadius="8px",this.panel.style.backdropFilter="blur(6px)",this.panel.style.zIndex="9999",this.panel.style.boxShadow="0 6px 24px rgba(0,0,0,0.35)";const t=document.createElement("div");t.textContent="Debug Helper",t.style.fontWeight="600",t.style.marginBottom="6px",t.style.cursor="grab",this.controlsContainer=document.createElement("div"),this.panel.appendChild(t),this.panel.appendChild(this.controlsContainer),this.buildControls();const n=this.chart.options.dom.parentElement||this.chart.options.dom;n.style.position=n.style.position||"relative",n.appendChild(this.panel),this.enableDrag(t)}enableDrag(e){const t=s=>{this.dragState.isDragging=!0,e.style.cursor="grabbing";const a=this.panel.getBoundingClientRect();this.panel.style.position="fixed",this.panel.style.right="auto",this.panel.style.left=`${a.left}px`,this.panel.style.top=`${a.top}px`,this.dragState.offsetX=s.clientX-a.left,this.dragState.offsetY=s.clientY-a.top,document.addEventListener("mousemove",n),document.addEventListener("mouseup",r)},n=s=>{if(!this.dragState.isDragging)return;const a=s.clientX-this.dragState.offsetX,o=s.clientY-this.dragState.offsetY;this.panel.style.left=`${a}px`,this.panel.style.top=`${o}px`},r=()=>{this.dragState.isDragging=!1,e.style.cursor="grab",document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r)};e.addEventListener("mousedown",t)}buildControls(){var e,t,n,r,s,a,o,l,c,h,u,f,p,g,v;const m=this.chart._store.getConfig(),d=this.chart.initOptions.rotateSpeed!==void 0?this.chart.initOptions.rotateSpeed:.01;[{label:"Auto Rotate",type:"checkbox",value:(e=this.chart.options.autoRotate)!=null?e:!0,onChange:y=>{this.chart.options.autoRotate=y,this.syncOptionsConfig()}},{label:"停悬停止旋转",type:"checkbox",value:m.stopRotateByHover,onChange:y=>{m.stopRotateByHover=y,this.syncOptionsConfig(),this.chart._eventStore&&(this.chart._eventStore.areaColorNeedChange=y)}},{label:"启用缩放",type:"checkbox",value:(t=m.enableZoom)!=null?t:!0,onChange:y=>{m.enableZoom=y;const A=this.chart.controls;A&&"enableZoom"in A&&(A.enableZoom=y),this.syncOptionsConfig()}},{label:"Rotate Speed",type:"range",min:-.1,max:.1,step:.001,value:d,onChange:y=>{this.chart.setRotateSpeed(y),this.syncOptionsConfig()}},{label:"Earth Material",type:"select",value:m.earth.material||"MeshPhongMaterial",options:[{label:"Phong",value:"MeshPhongMaterial"},{label:"Basic",value:"MeshBasicMaterial"},{label:"Lambert",value:"MeshLambertMaterial"},{label:"Matcap",value:"MeshMatcapMaterial"},{label:"Normal",value:"MeshNormalMaterial"}],onChange:y=>{m.earth.material=y,this.updateEarthMaterial(y),this.syncOptionsConfig()}},{label:"Background",type:"color",value:m.bgStyle.color,onChange:y=>{m.bgStyle.color=y,this.chart.renderer.setClearColor(y,m.bgStyle.opacity),this.syncOptionsConfig()}},{label:"背景透明度",type:"range",min:0,max:1,step:.05,value:(n=m.bgStyle.opacity)!=null?n:1,onChange:y=>{m.bgStyle.opacity=y,this.chart.renderer.setClearColor(m.bgStyle.color,y),this.syncOptionsConfig()}},{label:"Earth Color",type:"color",value:m.earth.color,onChange:y=>{m.earth.color=y,this.updateEarthColor(y),this.syncOptionsConfig()}},{label:"精灵光圈",type:"checkbox",value:(r=m.spriteStyle.show)!=null?r:!0,onChange:y=>{m.spriteStyle.show=y,this.updateSpriteVisibility(y),this.syncOptionsConfig()}},{label:"光圈尺寸",type:"number",min:.5,max:6,step:.1,value:(s=m.spriteStyle.size)!=null?s:3,onChange:y=>{m.spriteStyle.size=y,this.updateSpriteSize(y),this.syncOptionsConfig()}},{label:"Map Fill",type:"color",value:m.mapStyle.areaColor,onChange:y=>{m.mapStyle.areaColor=y,this.updateCountryAreaColor(y),this.syncOptionsConfig()}},{label:"Map Material",type:"select",value:m.mapStyle.material||"MeshBasicMaterial",options:[{label:"Basic",value:"MeshBasicMaterial"},{label:"Lambert",value:"MeshLambertMaterial"},{label:"Phong",value:"MeshPhongMaterial"}],onChange:y=>{m.mapStyle.material=y,this.updateCountryMaterial(y),this.syncOptionsConfig()}},{label:"Map 透明度",type:"range",min:.1,max:1,step:.05,value:(a=m.mapStyle.opacity)!=null?a:1,onChange:y=>{m.mapStyle.opacity=y,this.updateCountryOpacity(y),this.syncOptionsConfig()}},{label:"Map Border",type:"color",value:m.mapStyle.lineColor,onChange:y=>{m.mapStyle.lineColor=y,this.updateCountryLineColor(y),this.syncOptionsConfig()}},{label:"Sprite Color",type:"color",value:m.spriteStyle.color,onChange:y=>{m.spriteStyle.color=y,this.updateSpriteColor(y),this.syncOptionsConfig()}},{label:"Fly Path Color",type:"color",value:m.pathStyle.color,onChange:y=>{m.pathStyle.color=y,this.updatePathColor(y),this.syncOptionsConfig()}},{label:"飞行路径显示",type:"checkbox",value:(o=m.pathStyle.show)!=null?o:!0,onChange:y=>{m.pathStyle.show=y,this.updatePathVisibility(y),this.syncOptionsConfig()}},{label:"Fly Head Color",type:"color",value:m.flyLineStyle.color,onChange:y=>{m.flyLineStyle.color=y,this.syncOptionsConfig()}},{label:"Scatter Color",type:"color",value:m.scatterStyle.color,onChange:y=>{m.scatterStyle.color=y,this.updateScatterColor(y),this.syncOptionsConfig()}},{label:"Scatter Size",type:"number",min:.2,max:5,step:.1,value:(l=m.scatterStyle.size)!=null?l:1,onChange:y=>{m.scatterStyle.size=y,this.updateScatterSize(y),this.syncOptionsConfig()}},{label:"Hover 显示",type:"checkbox",value:(h=(c=m.hoverRegionStyle)==null?void 0:c.show)!=null?h:!0,onChange:y=>{m.hoverRegionStyle={...m.hoverRegionStyle||{},show:y},this.chart._eventStore&&(this.chart._eventStore.areaColorNeedChange=y),this.syncOptionsConfig()}},{label:"Hover 颜色",type:"color",value:(f=(u=m.hoverRegionStyle)==null?void 0:u.areaColor)!=null?f:"#cd79ff",onChange:y=>{m.hoverRegionStyle={...m.hoverRegionStyle||{},areaColor:y},this.syncOptionsConfig()}},{label:"Hover 透明度",type:"range",min:.1,max:1,step:.05,value:(g=(p=m.hoverRegionStyle)==null?void 0:p.opacity)!=null?g:1,onChange:y=>{m.hoverRegionStyle={...m.hoverRegionStyle||{},opacity:y},this.syncOptionsConfig()}},{label:"Pixel Ratio",type:"number",min:.5,max:3,step:.1,value:(v=m.pixelRatio)!=null?v:window.devicePixelRatio,onChange:y=>{m.pixelRatio=y,this.chart.renderer.setPixelRatio(y),this.syncOptionsConfig()}}].forEach(y=>this.addControl(y));const _=document.createElement("button");_.textContent="复制当前配置",_.style.width="100%",_.style.marginTop="8px",_.style.padding="6px",_.style.border="none",_.style.borderRadius="6px",_.style.cursor="pointer",_.style.background="#3b82f6",_.style.color="#fff",_.onclick=()=>{var y;const A=JSON.stringify(this.chart._store.getConfig(),null,2);(y=navigator.clipboard)==null||y.writeText(A)},this.controlsContainer.appendChild(_)}addControl(e){var t;const n=document.createElement("div");n.style.display="flex",n.style.alignItems="center",n.style.justifyContent="space-between",n.style.marginBottom="8px";const r=document.createElement("label");r.textContent=e.label,r.style.marginRight="8px",r.style.flex="1 1 auto";let s;if(e.type==="select"){const a=document.createElement("select");a.style.flex="0 0 130px",(t=e.options)==null||t.forEach(o=>{const l=document.createElement("option");l.value=o.value,l.textContent=o.label,o.value===e.value&&(l.selected=!0),a.appendChild(l)}),a.onchange=o=>{const l=o.target;e.onChange(l.value)},s=a}else{const a=document.createElement("input");if(a.type=e.type,e.type==="color")a.value=e.value;else if(e.type==="checkbox")a.checked=!!e.value;else{const o=typeof e.value=="number"?e.value:Number(e.value);e.min!==void 0&&(a.min=String(e.min)),e.max!==void 0&&(a.max=String(e.max)),e.step!==void 0&&(a.step=String(e.step)),a.value=o.toString(),a.valueAsNumber=o}a.style.flex="0 0 110px",a.oninput=o=>{const l=o.target;let c=l.value;e.type==="checkbox"?c=l.checked:(e.type==="number"||e.type==="range")&&(c=Number(l.value)),e.onChange(c)},s=a}n.appendChild(r),n.appendChild(s),this.controlsContainer.appendChild(n)}updateEarthColor(e){const t=this.chart.scene.getObjectByName("earthMesh");t&&t.material.color&&(t.material.color.set(e),t.material.needsUpdate=!0)}updateCountryAreaColor(e){this.chart.scene.traverse(t=>{if(t instanceof it&&t.userData.type==="country"){const n=t.material;n.color&&(n.color.set(e),n.needsUpdate=!0)}})}updateCountryLineColor(e){this.chart.scene.traverse(t=>{if(t instanceof yh||t instanceof Jn){const n=t.material;n.color&&(n.color.set(e),n.needsUpdate=!0)}})}updateCountryOpacity(e){this.chart.scene.traverse(t=>{if(t instanceof it&&t.userData.type==="country"){const n=t.material;n.transparent=e<1,n.opacity=e,n.needsUpdate=!0}})}updateCountryMaterial(e){const t=this.chart._store.getConfig();this.chart.scene.traverse(n=>{var r;if(n instanceof it&&n.userData.type==="country"){const s=n.material,a=s?.color?s.color.clone():new De(t.mapStyle.areaColor),o=typeof s?.opacity=="number"?s.opacity:(r=t.mapStyle.opacity)!=null?r:1,l=this.createCountryMaterial(e,a,o);l&&(s?.dispose&&s.dispose(),n.material=l)}})}createCountryMaterial(e,t,n){const r=n<1,s={color:t,opacity:n,transparent:r,side:Et};return e==="MeshLambertMaterial"?new xs(s):e==="MeshPhongMaterial"?new Er(s):new Yt(s)}updateSpriteColor(e){this.chart.scene.traverse(t=>{t instanceof Oi&&t.material.color&&(t.material.color.set(e),t.material.needsUpdate=!0)})}updateSpriteVisibility(e){this.chart.scene.traverse(t=>{t instanceof Oi&&(t.visible=e)})}updateSpriteSize(e){this.chart.scene.traverse(t=>{t instanceof Oi&&t.scale.set(this.chart._store.getConfig().R*e,this.chart._store.getConfig().R*e,1)})}updatePathColor(e){this.chart.scene.traverse(t=>{if(t.name==="pathLine"){const n=t.material;n&&n.color&&(n.color.set(e),n.needsUpdate=!0)}})}updatePathVisibility(e){this.chart.scene.traverse(t=>{t.name==="pathLine"&&(t.visible=e)})}updateScatterColor(e){this.chart.scene.traverse(t=>{if(t instanceof it&&(t.name==="scatter"||t.name==="point")){const n=t.material;n&&n.color&&(n.color.set(e),n.needsUpdate=!0)}})}updateScatterSize(e){this.chart.scene.traverse(t=>{t instanceof it&&(t.name==="scatter"||t.name==="point")&&t.scale.set(e,e,e)})}updateEarthMaterial(e){this.chart.scene.traverse(t=>{if(t instanceof it&&t.name==="earthMesh"){const n=t.material,r=this.createEarthMaterial(e,n?.map);r&&(n?.dispose&&n.dispose(),t.material=r)}})}createEarthMaterial(e,t){const r={...this.chart._store.getConfig().earth,map:t};switch(e){case"MeshBasicMaterial":return new Yt(r);case"MeshLambertMaterial":return new xs(r);case"MeshMatcapMaterial":return new ua(r);case"MeshNormalMaterial":return new Rh;case"MeshPhongMaterial":default:return new Er(r)}}syncOptionsConfig(){this.chart.options.config=this.chart._store.getConfig()}destroy(){var e;(e=this.panel)==null||e.remove()}}class OM{constructor(e){ie(this,"options"),ie(this,"initOptions",{helper:!1,autoRotate:!0,rotateSpeed:.01,mode:"3d",controls:"custom",debugHelper:!1}),ie(this,"style",{width:0,height:0}),ie(this,"light"),ie(this,"earthHovered",!1),ie(this,"camera"),ie(this,"notLockFps"),ie(this,"mainContainer"),ie(this,"scene"),ie(this,"renderer"),ie(this,"controls"),ie(this,"_orbitControls"),ie(this,"_store"),ie(this,"_eventStore"),ie(this,"_OperateView"),ie(this,"animationFrameId",null),ie(this,"_debugHelper",null),ie(this,"setData",async(t,n)=>{try{this.remove(t,"removeAll");const r=await this._OperateView.setData(t,n);this.mainContainer.add(...r)}catch(r){console.log(r)}}),ie(this,"addData",async(t,n)=>{try{const r=await this._OperateView.setData(t,n);this.mainContainer.add(...r)}catch(r){console.log(r)}}),this._store=new IM,this._OperateView=new pM(this._store),this.options={...this.options,config:this._store.getConfig()},this.options=Rr({},this.options,this.initOptions,e),this.notLockFps=this.lockFps(this.options.limitFps),this.init(),this._eventStore=new UM(this)}on(e,t){this._eventStore.registerEventMap(e,t)}clearThree(e){for(;e.children.length>0;)this.clearThree(e.children[0]),e.remove(e.children[0]);e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(n=>{n.dispose&&n.dispose()}),e.texture&&e.texture.dispose&&e.texture.dispose()}destroy(){var e,t,n,r;this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.clearThree(this.scene),(t=(e=this._eventStore)==null?void 0:e.destroy)==null||t.call(e),(n=this._debugHelper)==null||n.destroy(),this._orbitControls?(this._orbitControls.dispose(),this._orbitControls=void 0):this.controls&&"dispose"in this.controls&&this.controls.dispose(),(r=this.renderer)==null||r.dispose(),this.options.dom.innerHTML=""}init(){var e;const{dom:t,cameraType:n="OrthographicCamera",light:r="DirectionalLight",helper:s=!1,map:a="world",config:o}=this.options;this._store.setConfig(this.options),this.mainContainer=this.createCube(),this.style=t.getBoundingClientRect(),this.scene=this.createScene(),n==="OrthographicCamera"?this.camera=this.createOrthographicCamera():this.camera=this.createCamera(),this.light=this.createLight(r),s&&this.createHelper(),this.renderer=this.createRender(),this.createCountryNamesText();const l=this.options.controls==="custom",c=this._store.config.enableZoom!==!1;let h;(!l||c)&&(h=new S_(this.camera,this.renderer.domElement),this._orbitControls=h,l?(h.enableRotate=!1,h.enablePan=!1,h.enableZoom=!0):c||(h.enableZoom=!1)),l?this.controls=new DM(this.mainContainer,this.renderer,(e=this.options.config.earth)==null?void 0:e.dragConfig):this.controls=h,this._store.mode==="2d"?this.addFigures2d():this._store.mode==="3d"&&this.addFigures3d();const u=this.options.config.zoom;this.mainContainer.scale.set(u,u,u),this.animate(),t.appendChild(this.renderer.domElement),this.initDebugHelper()}createOrthographicCamera(){const e=this.style.width/this.style.height,t=200,n=new ia(-t*e,t*e,t,-t,1,1500);return n.position.set(0,0,500),n.lookAt(0,0,0),n}createScene(){return new Lv}createCamera(){const e=new Nt(95,this.style.width/this.style.height,1,1500);return e.position.set(350,350,350),e.lookAt(new T(0,0,0)),e}createLight(e){const t="#fff";if(e==="DirectionalLight"){const n=new sc(t,1);return n.position.set(2e3,2e3,3e3),n.castShadow=!0,this.scene.add(n),n}else if(e==="AmbientLight"){const n=new g_(t,1);return this.scene.add(n),n}else if(e=="PointLight"){const n=new p_(t,1,100);return n.position.set(200,200,40),this.scene.add(n),n}else{const n=new sc(t,1);return n.position.set(2e3,2e3,3e3),n.castShadow=!0,this.scene.add(n),n}}createHelper(){const e=new x_(250);this.scene.add(e)}addFigures3d(){var e,t;const n=new mM(this._store).create();if((e=this.options.config.texture)!=null&&e.mixed||!((t=this.options.config.texture)!=null&&t.path)){const r=new jc(this);n.add(...r.create())}this._store.config.spriteStyle.show&&this.mainContainer.add(PM(this._store.getConfig())),this.mainContainer.add(n),this.scene.add(this.mainContainer)}addFigures2d(){const e=new Ke;e.name="mapGroup";const t=new jc(this);e.add(...t.create()),this.mainContainer.add(e),this.scene.add(this.mainContainer)}createCube(){const e=new Ke;return e.name="mainContainer",e}addWall(){const e=new Ke;return e.name="wall",e}createRender(){var e,t,n;const r=new gh({antialias:!0,alpha:!0}),s=(e=this.options.config.pixelRatio)!=null?e:window.devicePixelRatio;return r.setPixelRatio(s),r.setSize(this.style.width,this.style.height),r.setClearColor((t=this.options.config.bgStyle)==null?void 0:t.color,(n=this.options.config.bgStyle)==null?void 0:n.opacity),r}lockFps(e=!1){const t=new __,r=1/30;let s=0;return function(){if(!e)return!0;const a=t.getDelta();if(s=s+a,s>r)return s=0,!0}}shouldRotate(){return this.options.mode==="3d"?this.options.config.stopRotateByHover?this.earthHovered?!1:this.options.autoRotate:this.options.autoRotate:!1}createCountryNamesText(){var e;const t=this.options.config.textMark;if(!((e=t?.data)!=null&&e.length))return null;const n=new Ke;n.name="countryNames",n.userData.figureType="textMark";const r=new hu(this._store);t.data.forEach(s=>{const a=r.create(s);n.add(a)}),this.mainContainer.add(n)}animate(){this.notLockFps()&&(I_(),this.shouldRotate()&&this.mainContainer.rotateY(this.options.rotateSpeed),this.renderer.render(this.scene,this.camera)),this.options.mode==="3d"&&this.controls.update(),this.animationFrameId=requestAnimationFrame(()=>{this.animate()})}initDebugHelper(){var e;this.options.debugHelper&&((e=this._debugHelper)==null||e.destroy(),this._debugHelper=new NM(this))}setRotateSpeed(e){Number.isNaN(e)||(this.options.rotateSpeed=e)}remove(e,t="removeAll"){this._OperateView.remove(this.mainContainer,e,t)}}function BM(i){return new OM(i)}function FM(i,e){const t=e.features;fu.registerMap(i,t)}const zM={init:BM,registerMap:FM};export{zM as default};
