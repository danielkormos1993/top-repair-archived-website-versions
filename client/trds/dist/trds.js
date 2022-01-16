const setCookie = (cookieKey, cookieValue, expirationDays) => {

    let expiryDate = '';
  
    if (expirationDays) {

        const date = new Date();
    
        date.setTime(`${date.getTime()}${(expirationDays || 30 * 24 * 60 * 60 * 1000)}`);
    
        expiryDate = `; expiryDate=" ${date.toUTCString()}`;

    }
  
    document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;

}
  
const getCookie = (cookieKey) => {

    let cookieName = `${cookieKey}=`;

    let cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }

    }
    
}


const FindClosestBgColor = element => {
    let currentElement = element.parentElement || element.getRootNode().host;
    while(currentElement !== null || currentElement !== 'undefined') {
        const style = window.getComputedStyle(currentElement);
        const bgColor = style.getPropertyValue('background-color');
        if (bgColor != 'rgba(0, 0, 0, 0)') return bgColor;
        currentElement = currentElement.parentElement || element.getRootNode().host;
    }

    return null;

}


const RgbToRgba = (rgb, a) => {

    return rgb.replace(/rgb/i, "rgba").replace(/\)/i,`,${a})`)

}


!function(){"use strict";var e=Promise,t=(e,t)=>{const n=e=>{for(let t=0,{length:n}=e;t<n;t++)r(e[t])},r=({target:e,attributeName:t,oldValue:n})=>{e.attributeChangedCallback(t,n,e.getAttribute(t))};return(l,o)=>{const{observedAttributes:s}=l.constructor;return s&&e(o).then((()=>{new t(n).observe(l,{attributes:!0,attributeOldValue:!0,attributeFilter:s});for(let e=0,{length:t}=s;e<t;e++)l.hasAttribute(s[e])&&r({target:l,attributeName:s[e],oldValue:null})})),l}};const{document:n,MutationObserver:r,Set:l,WeakMap:o}=self,s=e=>"querySelectorAll"in e,{filter:c}=[];var a=e=>{const t=new o,a=t=>{const{query:n}=e;if(n.length)for(let e=0,{length:r}=t;e<r;e++)u(c.call(t[e].addedNodes,s),!0,n),u(c.call(t[e].removedNodes,s),!1,n)},u=(n,r,o,s=new l)=>{for(let c,a,f=0,{length:d}=n;f<d;f++)if(!s.has(a=n[f])){if(s.add(a),r)for(let n,s=i(a),u=0,{length:f}=o;u<f;u++)s.call(a,n=o[u])&&(t.has(a)||t.set(a,new l),c=t.get(a),c.has(n)||(c.add(n),e.handle(a,r,n)));else t.has(a)&&(c=t.get(a),t.delete(a),c.forEach((t=>{e.handle(a,r,t)})));u(h(a),r,o,s)}},i=e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector,f=(t,n=!0)=>{u(t,n,e.query)},h=e=>p.length?e.querySelectorAll(p):p,d=new r(a),g=e.root||n,{query:p}=e;return d.observe(g,{childList:!0,subtree:!0}),f(h(g)),{drop:e=>{for(let n=0,{length:r}=e;n<r;n++)t.delete(e[n])},flush:()=>{a(d.takeRecords())},observer:d,parse:f}};const{document:u,Map:i,MutationObserver:f,Object:h,Set:d,WeakMap:g,Element:p,HTMLElement:y,Node:w,Error:m,TypeError:b,Reflect:E}=self,v=self.Promise||e,{defineProperty:M,keys:S,getOwnPropertyNames:q,setPrototypeOf:O}=h;let A=!self.customElements;const C=e=>{const t=S(e),n=[],{length:r}=t;for(let l=0;l<r;l++)n[l]=e[t[l]],delete e[t[l]];return()=>{for(let l=0;l<r;l++)e[t[l]]=n[l]}};if(A){const{createElement:n}=u,r=new i,l=new i,o=new i,s=new i,c=[],h=(e,t,n)=>{const r=o.get(n);if(t&&!r.isPrototypeOf(e)){const t=C(e);g=O(e,r);try{new r.constructor}finally{g=null,t()}}const l=(t?"":"dis")+"connectedCallback";l in r&&e[l]()},{parse:d}=a({query:c,handle:h});let g=null;const p=t=>{if(!l.has(t)){let n,r=new e((e=>{n=e}));l.set(t,{$:r,_:n})}return l.get(t).$},E=t(p,f);function N(){const{constructor:e}=this;if(!r.has(e))throw new b("Illegal constructor");const t=r.get(e);if(g)return E(g,t);const l=n.call(u,t);return E(O(l,e.prototype),t)}M(self,"customElements",{configurable:!0,value:{define:(e,t)=>{if(s.has(e))throw new m(`the name "${e}" has already been used with this registry`);r.set(t,e),o.set(e,t.prototype),s.set(e,t),c.push(e),p(e).then((()=>{d(u.querySelectorAll(e))})),l.get(e)._(t)},get:e=>s.get(e),whenDefined:p}}),M(N.prototype=y.prototype,"constructor",{value:N}),M(self,"HTMLElement",{configurable:!0,value:N}),M(u,"createElement",{configurable:!0,value(e,t){const r=t&&t.is,l=r?s.get(r):s.get(e);return l?new l:n.call(u,e)}}),"isConnected"in w.prototype||M(w.prototype,"isConnected",{configurable:!0,get(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else try{function T(){return self.Reflect.construct(HTMLLIElement,[],T)}T.prototype=HTMLLIElement.prototype;const e="extends-li";self.customElements.define("extends-li",T,{extends:"li"}),A=u.createElement("li",{is:e}).outerHTML.indexOf(e)<0;const{get:t,whenDefined:n}=self.customElements;M(self.customElements,"whenDefined",{configurable:!0,value(e){return n.call(this,e).then((n=>n||t.call(this,e)))}})}catch(e){A=!A}if(A){const e=self.customElements,{attachShadow:n}=p.prototype,{createElement:r}=u,{define:l,get:o}=e,{construct:s}=E||{construct(e){return e.call(this)}},c=new g,h=new d,y=new i,w=new i,S=new i,A=new i,N=[],T=[],L=t=>A.get(t)||o.call(e,t),P=(e,t,n)=>{const r=S.get(n);if(t&&!r.isPrototypeOf(e)){const t=C(e);_=O(e,r);try{new r.constructor}finally{_=null,t()}}const l=(t?"":"dis")+"connectedCallback";l in r&&e[l]()},{parse:k}=a({query:T,handle:P}),{parse:$}=a({query:N,handle(e,t){c.has(e)&&(t?h.add(e):h.delete(e),T.length&&D.call(T,e))}}),I=e=>{if(!w.has(e)){let t,n=new v((e=>{t=e}));w.set(e,{$:n,_:t})}return w.get(e).$},H=t(I,f);let _=null;function D(e){const{parse:t,root:n}=c.get(e);t(n.querySelectorAll(this),e.isConnected)}q(self).filter((e=>/^HTML/.test(e))).forEach((e=>{const t=self[e];function n(){const{constructor:e}=this;if(!y.has(e))throw new b("Illegal constructor");const{is:n,tag:l}=y.get(e);if(n){if(_)return H(_,n);const t=r.call(u,l);return t.setAttribute("is",n),H(O(t,e.prototype),n)}return s.call(this,t,[],e)}O(n,t),M(n.prototype=t.prototype,"constructor",{value:n}),M(self,e,{value:n})})),M(u,"createElement",{configurable:!0,value(e,t){const n=t&&t.is;if(n){const t=A.get(n);if(t&&y.get(t).tag===e)return new t}const l=r.call(u,e);return n&&l.setAttribute("is",n),l}}),n&&M(p.prototype,"attachShadow",{configurable:!0,value(){const e=n.apply(this,arguments),{parse:t}=a({query:T,root:e,handle:P});return c.set(this,{root:e,parse:t}),e}}),M(e,"get",{configurable:!0,value:L}),M(e,"whenDefined",{configurable:!0,value:I}),M(e,"define",{configurable:!0,value(t,n,r){if(L(t))throw new m(`'${t}' has already been defined as a custom element`);let o;const s=r&&r.extends;y.set(n,s?{is:t,tag:s}:{is:"",tag:t}),s?(o=`${s}[is="${t}"]`,S.set(o,n.prototype),A.set(t,n),T.push(o)):(l.apply(e,arguments),N.push(o=t)),I(t).then((()=>{s?(k(u.querySelectorAll(o)),h.forEach(D,[o])):$(u.querySelectorAll(o))})),w.get(t)._(n)}})}}();
class TrdsContainer extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                :host{
                    display: block;
                    width: 100%;
                    max-width: var(--container--max-width);
                    padding-left: var(--container--padding-x);
                    padding-right: var(--container--padding-x);
                    box-sizing: border-box;
                    margin-left: auto;
                    margin-right: auto;
                }
            </style>
            <slot></slot>
        `;
        
    }

}

window.customElements.define('trds-container', TrdsContainer);
// usage: <trds-section class="bg-image bg-image--lazy" style="--bg-image-overlay=rgb, --bg-image-url=url('')">



const TrdsBgImageIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadBgImage();
            TrdsBgImageIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsSection extends HTMLElement{

    constructor(){

        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    padding: var(--space--xxl) 0;
                    box-sizing: border-box;
                }

                :host(:last-child){
                    flex: 1;
                }

                :host(.bg-image){
                    --bg-image-overlay: var(--color--primary-bg);
                    background: var(--bg-image-url) var(--bg-image-overlay);
                    background-position: center center;
                    background-size: cover;
                    background-blend-mode: overlay;
                }

                :host(.bg-image--lazy){
                    background: var(--bg-image-overlay);
                }

            </style>
            <trds-container>
                <slot></slot>
            </trds-container>
        `;
       
    }

    connectedCallback(){

        if(this.classList.contains('bg-image--lazy'))
            TrdsBgImageIntersectionHandler.observe(this);

    }

    loadBgImage = () => this.classList.remove('bg-image--lazy');
    
}

window.customElements.define('trds-section', TrdsSection);
// usage: <trds-icon [lazy(optional)] [icon(required)="solid/cog"]>

const TrdsIconIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadIcon();
            TrdsIconIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsIcon extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                :host{
                    width: 1em;
                    height: 1em;
                    background: currentColor;
                    -webkit-mask-size: contain;
                    mask-size: contain;
                    -webkit-mask-repeat: no-repeat;
                    mask-repeat: no-repeat;
                    -webkit-mask-position: center center;
                    mask-position: center center;
                }

                :host([onclick]){
                    cursor: pointer;
                }
            </style>

        `;

        this.icon = document.createElement('style');
        this.shadowRoot.appendChild(this.icon);

    }

    connectedCallback(){

        if(this.hasAttribute('lazy'))
            TrdsIconIntersectionHandler.observe(this);
        else this.loadIcon();

    }

    loadIcon = () => {

        const iconName = this.getAttribute('icon');

        this.icon.textContent = `
            :host{
                -webkit-mask-image: url("/trds/assets/icons/${iconName}.svg");
                mask-image: url("/trds/assets/icons/${iconName}.svg");
            }
        `;

    }

}

window.customElements.define('trds-icon', TrdsIcon);
// add trds-loader to element which will have a loader property with enable and disable functions
// can be used on nearly anything(except in elements with other position property than relative)




class TrdsLoader extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    max-height: 100vh;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    visibility: hidden;
                    top: 0;
                    left: 0;
                }

                :host([active=true]){
                    visibility: visible;
                }

                :host([active=false]){
                    animation: trdsLoaderFadeOut 1s forwards;
                }

                @keyframes trdsLoaderFadeOut{
                    0% { 
                        visibility: visible; 
                        opacity: 1;
                    }
                    100% {
                        visibility: hidden;
                        opacity: 0;
                    }
                }

                :host trds-icon{
                    animation: TrdsSpin 1.5s linear infinite;
                    font-size: 1.5em;
                }

                @keyframes TrdsSpin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

            </style>
            <trds-icon icon="solid/spinner"></trds-icon>
            
        `;

    }

    connectedCallback(){

        const parent = this.parentElement || this.getRootNode().host;

        parent.style.position = 'relative';
        parent.loader = this;

    }

    enable = () => {

        this.style.backgroundColor = FindClosestBgColor(this);

        this.setAttribute('active', true);
        this.dispatchEvent( new Event('enabled'));

    }
    
    disable = () => {

        this.setAttribute('active', false);
        this.dispatchEvent( new Event('disabled'));
    
    } 

}

window.customElements.define('trds-loader', TrdsLoader);
// usage: trds-counter > textNode with the starting number
// attribute "to" required -> it will count from the starting number to this number
// its "lazyloaded" so counter will start only when its close to viewport
// use inside a typhography

const TrdsCounterIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.start();
            TrdsCounterIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 100px 0px"});

class TrdsCounter extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        if(!this.hasAttribute('to')) console.error('trds-counter must have a "to" attribute');
        if(this.textContent === '') console.error('trds-counter cannot be empty. it needs a start number.');

        this.startNumber = Number(this.textContent);
        this.endNumber = Number(this.getAttribute('to'));

        TrdsCounterIntersectionHandler.observe(this);

    }

    start(){

        let startTimestamp = null;

        const step = timestamp => {

            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min((timestamp - startTimestamp) / 4000, 1); // 4000ms is the duration here

            this.textContent = Math.floor(progress * (this.endNumber - this.startNumber) + this.startNumber).toLocaleString('DE-de');

            if (progress < 1) window.requestAnimationFrame(step);

        };

        window.requestAnimationFrame(step);
        
    }

}

window.customElements.define('trds-counter', TrdsCounter);
// usage: trds-image[src(required), lazy(optional), alt(required), aspect-ratio="w h"(optional)]
// default its 16:9 aspect ratio



const TrdsImageIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadImage();
            TrdsImageIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsImage extends HTMLElement{
    
    constructor(){ 
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    width: 100%;
                    max-width: var(--element--max-width);
                    position: relative;
                    overflow: hidden;
                    background-color: var(--color--secondary-bg);
                    object-fit: contain;
                    object-position: center center;
                    --image-padding-bottom: 56.25%;
                }

                aspect-ratio-box{
                    padding-bottom: var(--image-padding-bottom);
                    display: block;
                    box-sizing: border-box;
                }

                img{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: inherit;
                    object-position: inherit;
                }

            </style>
            <trds-loader></trds-loader>
            <aspect-ratio-box></aspect-ratio-box>
            <img>
        `;
        
        this.image = this.shadowRoot.querySelector('img')

    }

    connectedCallback(){

        this.shadowRoot.querySelector('trds-loader').enable();

        if(!this.hasAttribute('src') || this.getAttribute('src') === '') 
            return console.error('trds-image src attribute must be declared.');

        if(!this.hasAttribute('alt') || this.getAttribute('alt') === '')
            return console.error('trds-image alt attribute must be declared.');

        this.image.setAttribute('alt', this.getAttribute('alt'));

        if(this.hasAttribute('aspect-ratio')){
            const aspectRatio = this.getAttribute('aspect-ratio').split(' ');
            const w = parseInt(aspectRatio[0]);
            const h = parseInt(aspectRatio[1]);
            const calculatedPaddingBottom = `${(h/w)*100}%`;
            this.style.setProperty('--image-padding-bottom', calculatedPaddingBottom);
        }

        if(this.hasAttribute('lazy')) TrdsImageIntersectionHandler.observe(this);
        else this.loadImage();

    }

    loadImage = () => {

        this.image.addEventListener('load', () => {
            requestAnimationFrame(() => {requestAnimationFrame(() => { 
                this.shadowRoot.querySelector('trds-loader').disable();
                this.style.backgroundColor = 'transparent'; 
            })});
        });
        
        this.image.src = this.getAttribute('src');

    }

}

window.customElements.define('trds-image', TrdsImage);
// usage: <trds-link class="block"> for block link
// usage: <trds-link class="text"> for text link
// it automatically adds rel noopener noreferrer if needed



let TrdsLinkStyle = document.createElement('style');
TrdsLinkStyle.textContent = `

    a[is=trds-link]{
        transition: filter 0.25s ease-in-out;
        color: inherit;
    }

    a[is=trds-link]:hover,
    a[is=trds-link]:active,
    a[is=trds-link]:focus{
        filter: brightness(125%);
    }

    a[is=trds-link].text{
        text-decoration: underline;
        -webkit-text-size-adjust: 100%;
    }

    a[is=trds-link].block{
        display: block;
        max-width: max-content;
        text-decoration: none;
    }

`;
document.head.appendChild(TrdsLinkStyle);

class TrdsLink extends HTMLAnchorElement{

    constructor(){
        super();
    }

    connectedCallback(){

        const href = this.getAttribute('href');

        if(href && href.startsWith('http') && !href.includes(location.hostname))
            this.setAttribute('rel', 'noopener noreferrer');

    }

}

window.customElements.define('trds-link', TrdsLink, {extends: 'a'});
// usage: video is trds-video
// add lazy-src or lazy-poster for lazy resources
// dont need to add preload none as it will be automatically added to if there is a poster



let TrdsVideoStyle = document.createElement('style');
TrdsVideoStyle.textContent = `
    video[is=trds-video]{
        display: block;
        max-width: var(--element--max-width);
        width: 100%;
        height: auto;
        object-fit: contain;           
    }
`;
document.head.appendChild(TrdsVideoStyle);

const TrdsVideoSrcIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadVideo();
            TrdsVideoSrcIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

const TrdsVideoPosterIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadPoster();
            TrdsVideoPosterIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsVideo extends HTMLVideoElement{
    
    constructor(){ 
        super();
    }

    connectedCallback(){      

        if(this.hasAttribute('lazy-poster') || this.hasAttribute('poster'))
            this.setAttribute('preload', 'none');

        if(this.hasAttribute('lazy-src')) 
            TrdsVideoSrcIntersectionHandler.observe(this)

        if(this.hasAttribute('lazy-poster'))
            TrdsVideoPosterIntersectionHandler.observe(this);

    }

    loadPoster = () => this.poster = this.getAttribute('lazy-poster');
    loadVideo = () => this.src = this.getAttribute('lazy-src');

}

window.customElements.define('trds-video', TrdsVideo, {extends: 'video'});





let TrdsButtonStyle = document.createElement('style');
TrdsButtonStyle.textContent = `

    .trds-button{
        all: unset;
        display: flex;
        box-sizing: border-box;
        padding: var(--space--s) var(--space--m);
        border-radius: 5px;
        overflow: hidden;
        max-width: max-content;
        min-width: max-content;
        --base-bg-color: var(--color--primary);
        background-color: var(--color--primary);
        font-weight: bold;
        text-transform: uppercase;
        font-size: var(--size--xs);
        transition: filter 0.25s ease-in-out, transform 0.25s ease-in-out;
        align-items: center;
        justify-content: center;
        gap: var(--space--s);
        cursor: pointer;
        position: relative;
    }

    .trds-button:hover,
    .trds-button:focus{
        filter: brightness(125%);
    }

    .trds-button:active{
        transform: scale(0.95);
    }

    .trds-button[disabled]{
        filter: brightness(0.75);
        pointer-events: none;
    }
    
    .trds-button.rounded{
        border-radius: 50px;
    }

    .trds-button.block{
        max-width: var(--element--max-width);
    }

    .trds-button.icon-on-right trds-icon{
        order: 2;
    }

    .trds-button.call{
        --base-bg-color: var(--color--success);
        background-color: var(--color--success);
        border-radius: 50px;
    }

    .trds-button.outline{
        box-shadow: inset 0 0 0 2px currentColor;
        background-color: transparent;
    }

    .trds-button.outline:hover,
    .trds-button.outline:focus{
        box-shadow: none;
        background-color: var(--base-bg-color);
    }

    .trds-button trds-icon{
        flex-shrink: 0;
    }

`;
document.head.appendChild(TrdsButtonStyle);

const renderButton = button => {

    if(button.hasAttribute('icon')){

        let Icon = button.querySelector('trds-icon');

        if(!Icon){

            Icon = document.createElement('trds-icon');
            Icon.setAttribute('icon', button.getAttribute('icon'));
            button.appendChild(Icon)

        } 

    }

    if(button.hasAttribute('text')){

        let Text = button.querySelector('span');

        if(!Text){

            Text = document.createElement('span');
            Text.textContent = button.getAttribute('text');
            button.appendChild(Text);

        }
        
    }

}

class TrdsButton extends HTMLButtonElement{

    constructor(){
        super();

        this.classList.add('trds-button');

        let ButtonLoader = this.appendChild(document.createElement('trds-loader'));
        ButtonLoader.addEventListener('enabled', () => { this.setAttribute('disabled', '') });
        ButtonLoader.addEventListener('disabled', () => { this.removeAttribute('disabled') });

    }

    connectedCallback(){

        renderButton(this);

    }

}

window.customElements.define('trds-button', TrdsButton, {extends: 'button'});

class TrdsButtonLink extends TrdsLink{

    constructor(){
        super();

        this.classList.add('trds-button');
    }

    connectedCallback(){

        if(this.classList.contains('call')){

            if(!this.hasAttribute('number')) return console.error('Number attribute to call button must be given.');

            this.setAttribute('href', `tel:${this.getAttribute('number')}`);
            this.setAttribute('icon', 'solid/phone');
            this.setAttribute('text', this.getAttribute('number'));

        }

        super.connectedCallback();

        renderButton(this);

    }

}

window.customElements.define('trds-button--link', TrdsButtonLink, {extends: 'a'});



class TrdsCarousel extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    position: relative;
                    overflow: hidden;
                }

                .blur{
                    display:block;
                    position: absolute;
                    pointer-events: none;
                    transition: opacity 300ms ease 0s;
                    top: 0;
                    left: 0;
                    background: linear-gradient(to right, var(--blur-color), 50%, var(--blur-color-0));
                    background: -webkit-linear-gradient(left, var(--blur-color), var(--blur-color-0));
                    width: 25%;
                    height: 100%;
                    z-index: 1;
                    opacity: 0;
                }

                right-blur.blur{
                    left: auto;
                    right: 0;
                    background: linear-gradient(to left, var(--blur-color), 50%, var(--blur-color-0));
                    background: -webkit-linear-gradient(right, var(--blur-color), var(--blur-color-0));
                }

                .blur.active{
                    opacity: 1;
                }

                ::slotted(*){
                    overflow: auto;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                    white-space: nowrap;
                }

            </style>
            <left-blur class="blur"></left-blur>
            <right-blur class="blur"></right-blur>
            <slot name="container"></slot>
        `;

        const LeftBlur = this.shadowRoot.querySelector('left-blur');
        const RightBlur = this.shadowRoot.querySelector('right-blur');
        const Slot = this.shadowRoot.querySelector('slot');

        // dragger

        let Slotted = new Promise(resolve => {

            Slot.addEventListener('slotchange', () => {
                resolve(Slot.assignedNodes()[0]);
            });

        });

        Slotted.then(Slot => {

            let TrdsCarouselHideScrollbarStyle = document.createElement('style');
            TrdsCarouselHideScrollbarStyle.textContent = `
                trds-carousel [slot=container]::-webkit-scrollbar {
                    display: none;
                }
            `;
            this.appendChild(TrdsCarouselHideScrollbarStyle);

            const setupBlurs = () => {

                if(Slot.scrollLeft > 0) LeftBlur.classList.add('active');
                else LeftBlur.classList.remove('active');
    
                if(Slot.scrollLeft >= (Slot.scrollWidth - Slot.clientWidth)){
                    RightBlur.classList.remove('active');
                } else RightBlur.classList.add('active');
    
            }

            setupBlurs();

            let isMousePressedDown = false;
            let MousePosWhenPressedDown;
            let Pos;

            const onDown = e => {

                e.preventDefault();

                isMousePressedDown = true;

                if(typeof e.pageX !== 'undefined') MousePosWhenPressedDown = e.pageX;
                else MousePosWhenPressedDown = e.touches[0].pageX;

                Pos = Slot.scrollLeft;

            }

            const onMove = e => {

                if(!isMousePressedDown) return;

                let x;

                if(typeof e.pageX !== 'undefined') x = e.pageX;
                else x = e.touches[0].pageX;

                setupBlurs();
                Slot.scrollLeft = Pos - x + MousePosWhenPressedDown;

            }

            const onUp = () => {
                isMousePressedDown = false;
            }

            Slot.addEventListener('mousedown', e => {onDown(e)});
    
            document.addEventListener('mousemove', e => {onMove(e)});
            document.addEventListener('touchmove', setupBlurs);

            document.addEventListener('mouseup', onUp);

        });

    }

    connectedCallback(){

        this.style.setProperty('--blur-color', FindClosestBgColor(this));
        this.style.setProperty('--blur-color-0', RgbToRgba(this.style.getPropertyValue('--blur-color'), 0));

    }

}

window.customElements.define('trds-carousel', TrdsCarousel);


class TrdsShowcase extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode:'open'}).innerHTML = `
            <style>
                :host{
                    display: block;
                    max-width: var(--element--max-width);
                    position: relative;
                    background-color: var(--color--secondary-bg);
                }
                trds-showcase__before,
                trds-showcase__after{
                    display: block;
                    transition: opacity .5s;
                    position: relative;
                }
                trds-showcase__before:before,
                trds-showcase__after:before{
                    content: 'Előtte';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: var(--space--xs) var(--space--s);
                    font-size: var(--size--s);
                    text-transform: uppercase;
                    font-weight: bold;
                    background-color: var(--color--primary-bg);
                    mix-blend-mode: screen;
                    z-index: 1;
                }
                trds-showcase__after:before{
                    content: 'Utána';
                }
                trds-showcase__after{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
                :host([after-image-active]) trds-showcase__after{
                    opacity: 1;
                }
                :host([after-image-active]) trds-showcase__before{
                    opacity: 0;
                }
                trds-image{
                    object-fit: cover;
                }
            </style>
            <trds-showcase__before>
            </trds-showcase__before>
            <trds-showcase__after>
            </trds-showcase__after>
        `;

        this.addEventListener('click', this.toggleAfterImg);
                
    }

    toggleAfterImg = () => {
        this.hasAttribute('after-image-active') ? this.removeAttribute('after-image-active') : this.setAttribute('after-image-active', '');
    }

    connectedCallback(){

        this.shadowRoot.querySelector('trds-showcase__before').innerHTML = `
            <trds-image alt="Javítás előtti kép" lazy src="${this.getAttribute('before-image-url')}"></trds-image>
        `;

        this.shadowRoot.querySelector('trds-showcase__after').innerHTML = `
            <trds-image alt="Javítás utáni kép" lazy src="${this.getAttribute('after-image-url')}"></trds-image>
        `;

    }

}

window.customElements.define('trds-showcase', TrdsShowcase);
// usage: trds-cookiebar[cookieName(required), cookieValue(required)]
// use at body > level
// add class .SetCookieButton to the cookie setter button
// put elements inside as youd like




class TrdsCookiebar extends HTMLElement{
    
    constructor(){ 
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    box-sizing: border-box;
                    padding: var(--space--xl) 0;
                    position: fixed;
                    width: 100%;
                    bottom: -100%;
                    left: 0;
                    background-color: var(--color--primary);
                    z-index: 100;
                }

                :host([show]){
                    animation: TrdsCookieBarAnimation 1s forwards ease-in-out;
                    animation-delay: 3s;
                }

                @keyframes TrdsCookieBarAnimation{
                    100%{bottom:0}
                }

            </style>
            <trds-container>
                <slot></slot>
            </trds-container>
        `;

    }

    connectedCallback(){

        if(!this.hasAttribute('cookieName') || !this.hasAttribute('cookieValue'))
            return console.error('trds-cookiebar need both attribute: cookieName cookieValue');

        if(getCookie(this.getAttribute('cookieName')) != this.getAttribute('cookieValue'))
            this.setAttribute('show', '');
        else return this.remove();

        this.querySelector('[SetCookieButton]').addEventListener('click', () => {
            setCookie(this.getAttribute('cookieName'), this.getAttribute('cookieValue'));
            this.remove();
        });
   
    }

}

window.customElements.define('trds-cookiebar', TrdsCookiebar);


class TrdsFooter extends HTMLElement{

    constructor(){

        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: block;
                    background-color: var(--color--secondary-bg);
                    padding: var(--space--xl) 0;
                    box-sizing: border-box;
                }

            </style>
            <trds-container>
                <slot></slot>
            </trds-container>
        `;
       
    }
    
}

window.customElements.define('trds-footer', TrdsFooter);



class TrdsHeader extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    background-color: var(--color--secondary-bg);
                    height: var(--header-height);
                    display: flex;
                    width: 100%;
                    position: fixed;
                    top: 0;
                    z-index: 100;
                    overflow: hidden;
                }

                trds-container{
                    display: flex;
                    justify-content: space-between;
                    padding-right: 0;
                }

                ::slotted([slot=logo]){
                    margin-right: var(--space--l);
                    flex-shrink: 1;
                    flex-basis: 6.5rem;
                    min-width: 3.5rem;
                    display: flex !important;
                    align-items: center;
                    max-width: none !important;
                    align-self: center;
                }

                nav{
                    display: flex;
                    height: 100%;
                    gap: var(--space--m);
                    align-items: center;
                    padding-right: var(--space--m);
                    box-sizing: border-box;
                }

                @media all and (min-width:1360px){

                    nav{
                        gap:var(--space--l);
                    }

                }

            </style>
            <trds-container>    
                <slot name="logo"></slot>
                <trds-carousel>
                    <nav slot="container">
                        <slot></slot>
                    </nav>
                </trds-carousel>
            </trds-container>
        `;

    }

    connectedCallback(){

        document.body.style.paddingTop = 'var(--header-height)';

    }

}

window.customElements.define('trds-header', TrdsHeader);
// usage: trds-modal[showonfirsthit(optional - acts like a popup)]
// slot name title for title
// slot for modal body
// show func and close func



class TrdsModal extends HTMLElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                :host{
                    width: 100vw;
                    height: 100vh;
                    padding: var(--space--m) 0;
                    box-sizing: border-box;
                    position: fixed;
                    top: 0;
                    left: 0;
                    display: flex;
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(1.1);
                    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                :host([show]){
                    opacity: 1;
                    visibility: visible;
                    transform: scale(1.0);
                    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
                }
                trds-modal__overlay{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: var(--color--secondary-bg);
                    background-blend-mode: overlay;
                    z-index: 1000;
                }
                trds-modal__container{
                    display: block;
                    width: 90%;
                    max-width: var(--element--max-width);
                    max-height: 100%;
                    overflow: auto;
                    position: relative;
                    z-index: 1001;
                }
                trds-modal__header{
                    display: flex;
                    align-items: center;
                    padding: var(--space--m);
                    box-sizing: border-box;
                    background-color: var(--color--primary);
                    justify-content: space-between;
                }
                trds-modal__body{
                    display: block;
                    padding: var(--space--l);
                    box-sizing: border-box;
                    background-color: var(--color--secondary-bg);
                    overflow: auto;
                    max-height: 90vh;
                }
                trds-modal__header trds-icon{
                    cursor: pointer;
                    flex-shrink: 0;
                }
                ::slotted([slot=title]){
                    text-transform: uppercase;
                    margin-right: var(--space--m);
                    letter-spacing: 2px;
                    font-weight: bold;
                    font-size: var(--size--s);
                }
            </style>
            <trds-modal__overlay></trds-modal__overlay>
            <trds-modal__container>
                <trds-modal__header>
                    <slot name="title">Modal title</slot>
                    <trds-icon icon="solid/times" onclick="this.getRootNode().host.close()"></trds-icon>
                </trds-modal__header>
                <trds-modal__body>
                    <slot></slot>
                </trds-modal__body>
            </trds-modal__container>
        `;

    }

    connectedCallback(){

        if(this.hasAttribute('showonfirsthit') && sessionStorage.getItem('popup') != 'true'){
            this.show();
            sessionStorage.setItem('popup', 'true');
        }
        
    }

    show = () => {

        let currentModal = document.querySelector('trds-modal[show]');
        if(currentModal) currentModal.close();
        
        this.setAttribute('show', '');
    }

    close = () => {
        this.removeAttribute('show');
    } 

}

window.customElements.define('trds-modal', TrdsModal);
// usage: trds-timeline
// add trds-timeline__step element for a step which MUST HAVE A NUMBER attribute which displayed as count in timeline
// it automatically set timeline to row oriented if all elements can fit 



let TrdsTimelineStyle = document.createElement('style');
TrdsTimelineStyle.textContent = `

    trds-timeline__step{
        display: block;
        position: relative;
    }

    trds-timeline__step:last-child{
        padding-bottom: 2.85rem;
    }

    trds-timeline.row-oriented trds-timeline__step:last-child{
        padding-bottom: 0;
    }

    trds-timeline__step:before{
        content: attr(number);
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color--primary);
        border-radius: 50%;
        position: absolute;
        left: -3.05rem;
        top: -.28rem;
        font-size: var(--size--m);
        font-weight: bold;
    }

    trds-timeline__step[digit-number="3"]:before{
        font-size: var(--size--s);
    }

    trds-timeline__step[digit-number="4"]:before{
        font-size: var(--size--xs);
    }

    trds-timeline.row-oriented trds-timeline__step:before{
        top: -4.1rem;
        left: auto;
    }

`;
document.head.appendChild(TrdsTimelineStyle);

class TrdsTimeline extends HTMLElement{
    
    constructor(){ 
        super();

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>

                :host{
                    display: grid;
                    border-left: 3px solid var(--color--primary);
                    gap: var(--space--xl);
                    padding-left: 2rem;
                    margin-left: 1rem;
                    box-sizing: border-box;
                    position: relative;
                }

                :host(.row-oriented){
                    grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
                    border-left: none;
                    border-top: 3px solid var(--color--primary);
                    padding-left: 0;
                    margin-left: 0;
                    padding-top: 3rem;
                }
                
                trds-timeline__finish-flag{
                    content: attr(number);
                    width: 2rem;
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color--primary);
                    border-radius: 50%;
                    position: absolute;
                    left: -1.05rem;
                    bottom: 0;
                    font-size: var(--size--m);
                    font-weight: bold;
                    animation: TrdsIconRotater 1s infinite;
                }
   
                :host(.row-oriented) trds-timeline__finish-flag{
                    top: -1.1rem;
                    left: auto;
                    right: 0;
                    bottom: auto;
                }

                @keyframes TrdsIconRotater{
                    0%{
                        transform:rotate(30deg);
                    }
                    50%{
                        transform:rotate(-30deg);
                    }
                    100%{
                        transform:rotate(30deg);
                    }
                }
            </style>
            <slot></slot>
            <trds-timeline__finish-flag>
                <trds-icon icon="solid/flag-checkered"></trds-icon>
            </trds-timeline__finish-flag>
        `;

    }

    connectedCallback(){

        let resizeTimer;
        let timelineSteps = this.querySelectorAll('trds-timeline__step');

        timelineSteps.forEach(elem => {
            if(!elem.hasAttribute('number')) return console.error("Number attribute must be added to trds-timeline__step component.");
            if(elem.getAttribute('number').length > 4) return console.error("Number attribute should not exceed 4 digits.");
            elem.setAttribute( 'digit-number', elem.getAttribute('number').length);
        });

        const setTimeline = () => {
            (this.parentElement.getBoundingClientRect().width / 400) >= timelineSteps.length ? this.classList.add('row-oriented') : this.classList.remove('row-oriented');
        };

        setTimeline();

        window.addEventListener('resize', () => {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => setTimeline(), 250);

        });

    }

}

window.customElements.define('trds-timeline', TrdsTimeline);
// usage: trds-work[format=video or image(required)]
// if image declare src attribute like src="before.jpg after.jpg"
// if video declare src and poster will be src.jpg




class TrdsWork extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){

        if(!this.hasAttribute('format')) return console.error('format on trds-work needs to be defined');

        const format = this.getAttribute('format');

        if(format === 'video')

            this.innerHTML = `
                <video is="trds-video" lazy-src="${this.getAttribute('src')}" lazy-poster="${this.getAttribute('src')}.jpg" controls></video>
            `;

        else if(format === 'image'){

            this.innerHTML = `
                <trds-showcase before-image-url="${this.getAttribute('src').split(' ')[0]}" after-image-url="${this.getAttribute('src').split(' ')[1]}"></trds-showcase>
            `;

        }

    }

}

window.customElements.define('trds-work', TrdsWork);