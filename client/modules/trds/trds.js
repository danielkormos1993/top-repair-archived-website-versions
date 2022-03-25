class TrdsElement extends HTMLElement{

    constructor(){
        super();

        this.rendered = false;

    }

    connectedCallback(){

        if(!this.rendered){
            this.render();
            this.rendered = true;
        }

    }

    render(){

        console.error('TrdsElement does not have render function:');
        console.log(this);

    }

    static addStyle(cssString){

        const StyleTag = document.createElement('style');
        StyleTag.textContent = cssString;
        document.head.appendChild(StyleTag);

    }

}

TrdsElement.addStyle(`

    :root{

        --space--0: 0px;
        --space--xs: 5px;
        --space--s: 10px;
        --space--m: 20px;
        --space--l: 30px;
        --space--xl: 40px;
        --space--xxl: 80px;


        font-size: clamp(16px, 15.065px + 0.259vw, 20px);
        line-height: 1.5;
        -webkit-text-size-adjust: none;

        --size--xs: .75rem;
        --size--xs--line-height: 1.5;
        --size--s: .9rem;
        --size--s--line-height: 1.5;
        --size--m: 1rem;
        --size--m--line-height: 1.5;
        --size--l: 1.2rem;
        --size--l--line-height: 1.42;
        --size--xl: 2rem;
        --size--xl--line-height: 1.3;
        --size--xxl: clamp(2rem, 1.7662rem + 1.0390vw, 3rem);
        --size--xxl--line-height: 1.25;


        --element--base-width: 400px;
        --element--max-width: 800px;

    }

`);

window.addEventListener('load', () => document.body.classList.remove('loading'));

// usage: span

TrdsElement.addStyle(`

    span{
        max-width: var(--element--max-width);
    }

`);

// usage: p

TrdsElement.addStyle(`

    p{
        margin: 0;
        max-width: var(--element--max-width);
    }

`);

// usage: label

TrdsElement.addStyle(`

    label{
        display: block;
        max-width: var(--element--max-width);
    }

`);

// class helpers for sizing typhography elements and trds-icon

TrdsElement.addStyle(`

    .size--xs{
        font-size: var(--size--xs);
        line-height: var(--size--xs--line-height);
    }
    .size--s{
        font-size: var(--size--s);
        line-height: var(--size--s--line-height);
    }
    .size--m{
        font-size: var(--size--m);
        line-height: var(--size--m--line-height);
    }
    .size--l{
        font-size: var(--size--l);
        line-height: var(--size--l--line-height);
    }
    .size--xl{
        font-size: var(--size--xl);
        line-height: var(--size--xl--line-height);
    }
    .size--xxl{
        font-size: var(--size--xxl);
        line-height: var(--size--xxl--line-height);
    }

`);

// usage: <trds-title level={1-6} ...

TrdsElement.addStyle(`

    trds-title{
        display: block;
        font-weight: bold;
        max-width: var(--element--max-width);
    }

    .trds-title_tag{
        margin: 0;
        font-weight: inherit;
        font-size: inherit;
    }

    trds-title[level="4"] .trds-title_tag{
        text-decoration: underline;
    }

    trds-title.variant--1 .trds-title_tag{
        text-transform: uppercase;
        letter-spacing: .2rem;
        font-size: var(--size--m);
        line-height: var(--size--m--line-height);
    }

`);

const levelToClassMap = {

    1: 'size--xxl',
    2: 'size--xl',
    3: 'size--l',
    4: 'size--m',
    5: 'size--s',
    6: 'size--xs'

};

class TrdsTitle extends TrdsElement{

    constructor(){
        super();
    }

    render(){

        const level = this.getAttribute('level') || '1';
        if(levelToClassMap[level]) this.classList.add(levelToClassMap[level]);

        const Title = document.createElement(`h${level}`);
        Title.classList.add('trds-title_tag');
        Title.append(...this.childNodes);

        this.appendChild(Title);

    }

}

customElements.define('trds-title', TrdsTitle);

// container element for layout

TrdsElement.addStyle(`

    container{
        display: block;
        width: 100%;
        max-width: var(--container--max-width, 1700px);
        padding: 0 var(--container--padding-x, 5%);
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
    }

`);

// usage: trds-section

TrdsElement.addStyle(`

    trds-section{
        display: block;
        padding: var(--space--xxl) 0;
    }

    trds-section:last-child{
        flex: 1;
    }

    trds-section.bg-image{
        --bg-image-overlay: var(--color--primary-bg);
        background: var(--bg-image-src) var(--bg-image-overlay);
        background-position: center center;
        background-size: cover;
        background-blend-mode: overlay;
    }

    trds-section.lazy{
        background: var(--bg-image-overlay);
    }

`);

const TrdsSectionIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadBgImage();
            TrdsSectionIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

const TrdsSectionTemplate = document.createElement('template');
TrdsSectionTemplate.innerHTML = `
    <container></container>
`;

class TrdsSection extends TrdsElement{

    constructor(){
        super();

        this.template = TrdsSectionTemplate.content.cloneNode(true);

    }

    render(){

        this.template.querySelector('container').append(...this.children);
   
        this.appendChild(this.template);

        if(this.classList.contains('lazy'))
            TrdsSectionIntersectionHandler.observe(this);

    }

    loadBgImage = () => this.classList.remove('lazy');

}

customElements.define('trds-section', TrdsSection);

// usage

TrdsElement.addStyle(`

    body{
        display: grid;
        grid-template-rows: 1fr auto;
        min-height: 100vh;
        margin: 0;
        padding: 0;
    }

    main{
        display: flex;
        flex-direction: column;
    }

`);

// usage: trds-grid

TrdsElement.addStyle(`

    trds-grid{
        display: flex;
        flex-wrap: wrap;
        gap: var(--space--xxl);
    }

    trds-grid.boxes-layout{
        gap: var(--space--m);
    }

    trds-grid.auto-width-layout{
        gap: var(--space--s);
        align-items: center;
    }

    trds-grid > *{
        flex:1 1 var(--element--base-width);
    }

    trds-grid.auto-width-layout > *{
        flex: 0 1 auto;
    }

`);

// usage: trds-stack

TrdsElement.addStyle(`

    trds-stack{
        display: grid;
        gap: var(--space--m);
        align-content: start;
    }

`);

// usage: trds-card

TrdsElement.addStyle(`

    trds-card{
        background-color: var(--color--secondary-bg);
        display: flex;
        flex-direction: column;
        max-width: var(--element--max-width);
    }

    trds-card_media{
        display: block;
    }

    trds-card_body{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: var(--space--l);
    }

    trds-card_footer{
        display: block;
        padding: var(--space--l);
        padding-top: 0;
    }

`);

TrdsElement.addStyle(`

    input,
    select{
        display: block;
        width: 100%;
        max-width: var(--element--max-width);
        background-color: var(--color--secondary-bg);
        color: inherit;
        font-size: inherit;
        padding: var(--space--s);
        border: none;
        font-family: inherit;
        margin: 0;
    }

    select{
        font-weight: bold;
        border-bottom: 2px solid var(--color--primary);
    }        

`);

TrdsElement.addStyle(`

    trds-tag{
        background-color: var(--color--accent);
        border-radius: 50px;
        box-sizing: border-box;
        padding: var(--space--xs) var(--space--s);
        font-size: var(--size--xs);
        min-width: max-content;
        max-width: max-content;
        display: inline-flex;
        gap: var(--space--xs);
        align-items: center;
        font-weight: bold;
    }

    trds-tag.outline{
        box-shadow: inset 0 0 0 2px currentColor;
        background-color: transparent;
    }

`);

!function(){var e=Promise,t=(e,t)=>{const n=e=>{for(let t=0,{length:n}=e;t<n;t++)r(e[t]);},r=({target:e,attributeName:t,oldValue:n})=>{e.attributeChangedCallback(t,n,e.getAttribute(t));};return (l,o)=>{const{observedAttributes:s}=l.constructor;return s&&e(o).then((()=>{new t(n).observe(l,{attributes:!0,attributeOldValue:!0,attributeFilter:s});for(let e=0,{length:t}=s;e<t;e++)l.hasAttribute(s[e])&&r({target:l,attributeName:s[e],oldValue:null});})),l}};const{document:n,MutationObserver:r,Set:l,WeakMap:o}=self,s=e=>"querySelectorAll"in e,{filter:c}=[];var a=e=>{const t=new o,a=t=>{const{query:n}=e;if(n.length)for(let e=0,{length:r}=t;e<r;e++)u(c.call(t[e].addedNodes,s),!0,n),u(c.call(t[e].removedNodes,s),!1,n);},u=(n,r,o,s=new l)=>{for(let c,a,f=0,{length:d}=n;f<d;f++)if(!s.has(a=n[f])){if(s.add(a),r)for(let n,s=i(a),u=0,{length:f}=o;u<f;u++)s.call(a,n=o[u])&&(t.has(a)||t.set(a,new l),c=t.get(a),c.has(n)||(c.add(n),e.handle(a,r,n)));else t.has(a)&&(c=t.get(a),t.delete(a),c.forEach((t=>{e.handle(a,r,t);})));u(h(a),r,o,s);}},i=e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector,f=(t,n=!0)=>{u(t,n,e.query);},h=e=>p.length?e.querySelectorAll(p):p,d=new r(a),g=e.root||n,{query:p}=e;return d.observe(g,{childList:!0,subtree:!0}),f(h(g)),{drop:e=>{for(let n=0,{length:r}=e;n<r;n++)t.delete(e[n]);},flush:()=>{a(d.takeRecords());},observer:d,parse:f}};const{document:u,Map:i,MutationObserver:f,Object:h,Set:d,WeakMap:g,Element:p,HTMLElement:y,Node:w,Error:m,TypeError:b,Reflect:E}=self,v=self.Promise||e,{defineProperty:M,keys:S,getOwnPropertyNames:q,setPrototypeOf:O}=h;let A=!self.customElements;const C=e=>{const t=S(e),n=[],{length:r}=t;for(let l=0;l<r;l++)n[l]=e[t[l]],delete e[t[l]];return ()=>{for(let l=0;l<r;l++)e[t[l]]=n[l];}};if(A){const{createElement:n}=u,r=new i,l=new i,o=new i,s=new i,c=[],h=(e,t,n)=>{const r=o.get(n);if(t&&!r.isPrototypeOf(e)){const t=C(e);g=O(e,r);try{new r.constructor;}finally{g=null,t();}}const l=(t?"":"dis")+"connectedCallback";l in r&&e[l]();},{parse:d}=a({query:c,handle:h});let g=null;const p=t=>{if(!l.has(t)){let n,r=new e((e=>{n=e;}));l.set(t,{$:r,_:n});}return l.get(t).$},E=t(p,f);function N(){const{constructor:e}=this;if(!r.has(e))throw new b("Illegal constructor");const t=r.get(e);if(g)return E(g,t);const l=n.call(u,t);return E(O(l,e.prototype),t)}M(self,"customElements",{configurable:!0,value:{define:(e,t)=>{if(s.has(e))throw new m(`the name "${e}" has already been used with this registry`);r.set(t,e),o.set(e,t.prototype),s.set(e,t),c.push(e),p(e).then((()=>{d(u.querySelectorAll(e));})),l.get(e)._(t);},get:e=>s.get(e),whenDefined:p}}),M(N.prototype=y.prototype,"constructor",{value:N}),M(self,"HTMLElement",{configurable:!0,value:N}),M(u,"createElement",{configurable:!0,value(e,t){const r=t&&t.is,l=r?s.get(r):s.get(e);return l?new l:n.call(u,e)}}),"isConnected"in w.prototype||M(w.prototype,"isConnected",{configurable:!0,get(){return !(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}});}else try{function T(){return self.Reflect.construct(HTMLLIElement,[],T)}T.prototype=HTMLLIElement.prototype;const e="extends-li";self.customElements.define("extends-li",T,{extends:"li"}),A=u.createElement("li",{is:e}).outerHTML.indexOf(e)<0;const{get:t,whenDefined:n}=self.customElements;M(self.customElements,"whenDefined",{configurable:!0,value(e){return n.call(this,e).then((n=>n||t.call(this,e)))}});}catch(e){A=!A;}if(A){const e=self.customElements,{attachShadow:n}=p.prototype,{createElement:r}=u,{define:l,get:o}=e,{construct:s}=E||{construct(e){return e.call(this)}},c=new g,h=new d,y=new i,w=new i,S=new i,A=new i,N=[],T=[],L=t=>A.get(t)||o.call(e,t),P=(e,t,n)=>{const r=S.get(n);if(t&&!r.isPrototypeOf(e)){const t=C(e);_=O(e,r);try{new r.constructor;}finally{_=null,t();}}const l=(t?"":"dis")+"connectedCallback";l in r&&e[l]();},{parse:k}=a({query:T,handle:P}),{parse:$}=a({query:N,handle(e,t){c.has(e)&&(t?h.add(e):h.delete(e),T.length&&D.call(T,e));}}),I=e=>{if(!w.has(e)){let t,n=new v((e=>{t=e;}));w.set(e,{$:n,_:t});}return w.get(e).$},H=t(I,f);let _=null;function D(e){const{parse:t,root:n}=c.get(e);t(n.querySelectorAll(this),e.isConnected);}q(self).filter((e=>/^HTML/.test(e))).forEach((e=>{const t=self[e];function n(){const{constructor:e}=this;if(!y.has(e))throw new b("Illegal constructor");const{is:n,tag:l}=y.get(e);if(n){if(_)return H(_,n);const t=r.call(u,l);return t.setAttribute("is",n),H(O(t,e.prototype),n)}return s.call(this,t,[],e)}O(n,t),M(n.prototype=t.prototype,"constructor",{value:n}),M(self,e,{value:n});})),M(u,"createElement",{configurable:!0,value(e,t){const n=t&&t.is;if(n){const t=A.get(n);if(t&&y.get(t).tag===e)return new t}const l=r.call(u,e);return n&&l.setAttribute("is",n),l}}),n&&M(p.prototype,"attachShadow",{configurable:!0,value(){const e=n.apply(this,arguments),{parse:t}=a({query:T,root:e,handle:P});return c.set(this,{root:e,parse:t}),e}}),M(e,"get",{configurable:!0,value:L}),M(e,"whenDefined",{configurable:!0,value:I}),M(e,"define",{configurable:!0,value(t,n,r){if(L(t))throw new m(`'${t}' has already been defined as a custom element`);let o;const s=r&&r.extends;y.set(n,s?{is:t,tag:s}:{is:"",tag:t}),s?(o=`${s}[is="${t}"]`,S.set(o,n.prototype),A.set(t,n),T.push(o)):(l.apply(e,arguments),N.push(o=t)),I(t).then((()=>{s?(k(u.querySelectorAll(o)),h.forEach(D,[o])):$(u.querySelectorAll(o));})),w.get(t)._(n);}});}}();

// usage: video is trds-video

TrdsElement.addStyle(`
    video[is="trds-video"]{
        display: block;
        max-width: var(--element--max-width);
        width: 100%;
        height: auto;
        object-fit: contain;           
    }
`);

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

        this.rendered = false;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

    render = () => {

        if(this.hasAttribute('lazy-poster') || this.hasAttribute('poster'))
            this.setAttribute('preload', 'none');

        if(this.hasAttribute('lazy-src')) 
            TrdsVideoSrcIntersectionHandler.observe(this);

        if(this.hasAttribute('lazy-poster'))
            TrdsVideoPosterIntersectionHandler.observe(this);

        this.rendered = true;

    }

    loadPoster = () => this.poster = this.getAttribute('lazy-poster');
    loadVideo = () => this.src = this.getAttribute('lazy-src');

}

customElements.define('trds-video', TrdsVideo, {extends: 'video'});

// usage: trds-icon [icon(required)="solid/cog", lazy(optional)]

TrdsElement.addStyle(`

    trds-icon{
        display: block;
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

    trds-icon[onclick]{
        cursor:pointer;
    }

`);

const TrdsIconIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadIcon();
            TrdsIconIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsIcon extends TrdsElement{

    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.IconStyle = this.shadowRoot.appendChild(document.createElement('style'));

    }

    render(){

        if(this.hasAttribute('lazy'))
            TrdsIconIntersectionHandler.observe(this);
        else this.loadIcon();

    }

    async loadIcon(){

        const iconName = this.getAttribute('icon');

        this.IconStyle.textContent = `
            :host{
                -webkit-mask-image: url("/modules/trds/assets/icons/${iconName}.svg");
                mask-image: url("/modules/trds/assets/icons/${iconName}.svg");
            }
        `;

    }

}

customElements.define('trds-icon', TrdsIcon);

const FindClosestBgColor = element => {
    let currentElement = element.parentElement;
    while(currentElement !== null) {
        const style = window.getComputedStyle(currentElement);
        const bgColor = style.getPropertyValue('background-color');
        if (bgColor != 'rgba(0, 0, 0, 0)') return bgColor;
        currentElement = currentElement.parentElement;
    }

    return null;

};

const RgbToRgba = (rgb, a) => {

    return rgb.replace(/rgb/i, "rgba").replace(/\)/i,`,${a})`)

};

// usage: add trds-loader element to almost any element(except elements with position property)

TrdsElement.addStyle(`

    trds-loader{
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

    trds-loader.active{
        visibility: visible;
    }

    trds-loader.active trds-icon{
        animation: TrdsSpin 1.5s linear infinite;
        font-size: 1.5em;
    }

    @keyframes TrdsSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

`);

class TrdsLoader extends TrdsElement{

    constructor(){
        super();
    }

    render(){

        this.innerHTML = '<trds-icon icon="solid/spinner"></trds-icon>';

    }

    enable = () => {

        this.parentElement.style.position = 'relative';
        this.style.backgroundColor = FindClosestBgColor(this);
        this.classList.add('active');
        this.dispatchEvent( new Event('enabled'));

    }

    disable = () => {

        this.classList.remove('active');
        this.dispatchEvent( new Event('disabled'));

    }

}

customElements.define('trds-loader', TrdsLoader);

// usage: trds-image[src(required), lazy(optional), alt(required), aspect-ratio="w h"(optional)]

TrdsElement.addStyle(`

    trds-image{
        display: block;
        width: 100%;
        max-width: var(--element--max-width);
        position: relative;
        background-color: var(--color--secondary-bg);
        object-fit: contain;
        object-position: center center;
        --image-padding-bottom: 56.25%;
    }

    trds-image aspect-ratio-box{
        padding-bottom: var(--image-padding-bottom);
        display: block;
        box-sizing: border-box;
    }

    trds-image img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: inherit;
        object-position: inherit;
    }

`);

const TrdsImageIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadImage();
            TrdsImageIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsImage extends TrdsElement{
    
    constructor(){ 
        super();
    }

    render(){

        this.innerHTML = `
            <trds-loader></trds-loader>
            <aspect-ratio-box></aspect-ratio-box>
            <img>
        `;

        this.querySelector('trds-loader').enable();
        this.ImgTag = this.querySelector('img');

        this.ImgTag.setAttribute('alt', this.getAttribute('alt'));

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

        this.ImgTag.addEventListener('load', () => {
            requestAnimationFrame(() => {requestAnimationFrame(() => { 
                this.querySelector('trds-loader').disable();
                this.style.backgroundColor = 'transparent'; 
            });});
        });
        
        this.ImgTag.src = this.getAttribute('src');

    }

}

customElements.define('trds-image', TrdsImage);

// usage: <trds-link class="block"> for block link

TrdsElement.addStyle(`

    a[is="trds-link"]{
        transition: filter 0.25s ease-in-out;
        color: inherit;
        cursor: pointer;
    }

    a[is="trds-link"]:hover,
    a[is="trds-link"]:active,
    a[is="trds-link"]:focus{
        filter: brightness(125%);
    }

    a[is="trds-link"].text{
        text-decoration: underline;
    }

    a[is="trds-link"].block{
        display: block;
        max-width: max-content;
        text-decoration: none;
    }

`);

class TrdsLink extends HTMLAnchorElement{

    constructor(){
        super();

        this.rendered = false;

    }

    render(){

        const href = this.getAttribute('href');

        if(href && href.startsWith('http') && !href.includes(location.hostname))
            this.setAttribute('rel', 'noopener noreferrer');

        this.rendered = true;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

}

customElements.define('trds-link', TrdsLink, {extends: 'a'});

// usage: trds-counter > textNode with the starting number
// attribute "to" required -> it will count from the starting number to this number
// its "lazyloaded" so counter will start only when its close to viewport
// use inside a typhography element

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

        if(!this.hasAttribute('to')){
            console.error('trds-counter must have a "to" attribute');
            console.log(this);
        }

        if(this.textContent === ''){
            console.error('trds-counter cannot be empty. it needs a start number.');
            console.log(this);
        }

        this.startNumber = Number(this.textContent);
        this.endNumber = Number(this.getAttribute('to'));

        TrdsCounterIntersectionHandler.observe(this);

    }

    disconnectedCallback(){

        this.textContent = this.startNumber;

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

customElements.define('trds-counter', TrdsCounter);

// usage: button is=trds-button

TrdsElement.addStyle(`

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

    .trds-button.disabled{
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

`);

const renderButton = button => {

    button.innerHTML = `

        ${button.hasAttribute('icon') ?
            `<trds-icon icon="${button.getAttribute('icon')}"></trds-icon>`
            :
            ''
        }

        ${button.hasAttribute('text') ?
            `<span>${button.getAttribute('text')}</span>`
            :
            ''
        }

    `;

};

class TrdsButton extends HTMLButtonElement{

    constructor(){
        super();

        this.rendered = false;

    }

    render = () => {

        this.classList.add('trds-button');

        renderButton(this);

        const ButtonLoader = this.appendChild(document.createElement('trds-loader'));
        ButtonLoader.addEventListener('enabled', () => this.classList.add('disabled'));
        ButtonLoader.addEventListener('disabled', () => this.classList.remove('disabled'));

        this.rendered = true;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

}

customElements.define('trds-button', TrdsButton, {extends: 'button'});

class TrdsButtonLink extends TrdsLink{

    constructor(){
        super();

        this.rendered = false;

    }

    render(){

        this.classList.add('trds-button');

        if(this.classList.contains('call')){

            if(!this.hasAttribute('number')) return console.error('Number attribute to call button must be given.');

            this.setAttribute('href', `tel:${this.getAttribute('number')}`);
            this.setAttribute('icon', 'solid/phone');
            this.setAttribute('text', this.getAttribute('number'));

        }

        super.render();

        renderButton(this);

        this.rendered = true;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

}

customElements.define('trds-button--link', TrdsButtonLink, {extends: 'a'});

// usage: trds-carousel

TrdsElement.addStyle(`

    trds-carousel{
        display: block;
        position: relative;
        overflow: hidden;
        max-width: 100%;
    }

    trds-carousel .blur{
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

    trds-carousel right-blur.blur{
        left: auto;
        right: 0;
        background: linear-gradient(to left, var(--blur-color), 50%, var(--blur-color-0));
        background: -webkit-linear-gradient(right, var(--blur-color), var(--blur-color-0));
    }

    trds-carousel .blur.active{
        opacity: 1;
    }

    trds-carousel .slot{
        overflow: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        white-space: nowrap;
    }

    trds-carousel .slot::-webkit-scrollbar {
        display: none;
    }

`);

const TrdsCarouselTemplate = document.createElement('template');
TrdsCarouselTemplate.innerHTML = `
    <div class="slot"></div>
    <left-blur class="blur"></left-blur>
    <right-blur class="blur"></right-blur>
`;

class TrdsCarousel extends TrdsElement{

    constructor(){
        super();

        this.isMousePressedDown = false;
        this.MousePosWhenPressedDown = null;
        this.Pos = null;

    }

    disconnectedCallback(){

        this.Slot.removeEventListener('mousedown', this.onPressDown);
        document.removeEventListener('mousemove', this.onPressMove);
        document.removeEventListener('touchmove', this.setupBlurs);
        document.removeEventListener('mouseup', this.onPressUp);

    }

    connectedCallback(){

        super.connectedCallback();

        this.style.setProperty('--blur-color', FindClosestBgColor(this));
        this.style.setProperty('--blur-color-0', RgbToRgba(this.style.getPropertyValue('--blur-color'), 0));

        this.setupBlurs();

        this.Slot.addEventListener('mousedown', this.onPressDown);
        document.addEventListener('mousemove', this.onPressMove);
        document.addEventListener('touchmove', this.setupBlurs);
        document.addEventListener('mouseup', this.onPressUp);

    }

    render(){

        this.template = TrdsCarouselTemplate.content.cloneNode(true);

        this.Slot = this.template.querySelector('.slot');
        this.LeftBlur = this.template.querySelector('left-blur');
        this.RightBlur = this.template.querySelector('right-blur');

        this.Slot.append(...this.children);

        this.append(this.template);

    }

    setupBlurs = () => {

        if(this.Slot.scrollLeft > 0) this.LeftBlur.classList.add('active');
        else this.LeftBlur.classList.remove('active');

        if(this.Slot.scrollLeft >= (this.Slot.scrollWidth - this.Slot.clientWidth)){
            this.RightBlur.classList.remove('active');
        } else this.RightBlur.classList.add('active');

    }

    onPressDown = e => {

        e.preventDefault();

        this.isMousePressedDown = true;

        if(typeof e.pageX !== 'undefined') this.MousePosWhenPressedDown = e.pageX;
        else this.MousePosWhenPressedDown = e.touches[0].pageX;

        this.Pos = this.Slot.scrollLeft;

    }

    onPressMove = e => {

        if(!this.isMousePressedDown) return;

        let x;

        if(typeof e.pageX !== 'undefined') x = e.pageX;
        else x = e.touches[0].pageX;

        this.setupBlurs();
        this.Slot.scrollLeft = this.Pos - x + this.MousePosWhenPressedDown;

    }

    onPressUp = () => {
        this.isMousePressedDown = false;
    }

}

customElements.define('trds-carousel', TrdsCarousel);

const setCookie = (cookieKey, cookieValue, expirationDays) => {

    let expiryDate = '';
  
    if (expirationDays) {

        const date = new Date();
    
        date.setTime(`${date.getTime()}${(expirationDays || 30 * 24 * 60 * 60 * 1000)}`);
    
        expiryDate = `; expiryDate=" ${date.toUTCString()}`;

    }
  
    document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;

};
  
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
    
};

// usage: trds-cookiebar[cookie-name(required), cookie-value(required)]

TrdsElement.addStyle(`

    trds-cookiebar{
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

    trds-cookiebar.show{
        animation: TrdsCookieBarAnimation 1s forwards ease-in-out;
        animation-delay: 3s;
    }

    @keyframes TrdsCookieBarAnimation{
        100%{bottom:0}
    }

`);

class TrdsCookiebar extends TrdsElement{

    constructor(){
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <container>
            </container>
        `;

    }

    connectedCallback(){

        super.connectedCallback();

        if(getCookie(this.getAttribute('cookie-name')) != this.getAttribute('cookie-value'))
            this.classList.add('show');
        else return this.remove();
        
    }

    render(){

        if(!this.hasAttribute('cookie-name') || !this.hasAttribute('cookie-value'))
            return console.error('trds-cookiebar need both attribute: cookieName cookieValue');

        this.template.content.querySelector('container').append(...this.children);

        this.appendChild(this.template.content);

        this.querySelector('.set-cookie-button').addEventListener('click', () => {
            setCookie(this.getAttribute('cookie-name'), this.getAttribute('cookie-value'));
            this.remove();
        });

    }

}

customElements.define('trds-cookiebar', TrdsCookiebar);

TrdsElement.addStyle(`

    trds-footer{
        display: block;
        background-color: var(--color--secondary-bg);
        padding: var(--space--xl) 0;
        box-sizing: border-box;
    }

`);

class TrdsFooter extends TrdsElement{

    constructor(){
        super();

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <container>
            </container>
        `;

    }

    render(){

        this.template.content.querySelector('container').append(...this.children);

        this.appendChild(this.template.content);

    }

}

customElements.define('trds-footer', TrdsFooter);

TrdsElement.addStyle(`

    :root{
        --header-height: 5rem;
    }

    trds-header{
        background-color: var(--color--secondary-bg);
        height: var(--header-height);
        display: flex;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 100;
        overflow: hidden;
    }

    trds-header container{
        display: flex;
        justify-content: space-between;
        padding-right: 0;
    }

    trds-header .logo-link{
        margin-right: var(--space--l);
        flex-shrink: 1;
        flex-basis: 6.5rem;
        min-width: 3.5rem;
        display: flex !important;
        align-items: center;
        max-width: none !important;
        align-self: center;
    }

    trds-header .slot{
        display: flex;
        height: 100%;
        gap: var(--space--m);
        align-items: center;
        padding-right: var(--space--m);
        box-sizing: border-box;
    }

    @media all and (min-width:1360px){

        trds-header .slot{
            gap:var(--space--l);
        }

    }

`);

const TrdsHeaderTemplate = document.createElement('template');
TrdsHeaderTemplate.innerHTML = `
    <container>
        <a is="trds-link" class="block logo-link" href="/">
            <trds-image alt="Logo"></trds-image>
        </a>
        <trds-carousel>
        </trds-carousel>
    </container>
`;

class TrdsHeader extends TrdsElement{

    constructor(){
        super();

        this.template = TrdsHeaderTemplate.content.cloneNode(true);

    }

    connectedCallback(){

        super.connectedCallback();
        document.body.style.paddingTop = 'var(--header-height)';

    }

    disconnectedCallback(){

        document.body.style.paddingTop = 0;

    }

    render(){

        if(!this.hasAttribute('logo-src')) console.error('trds-header must have logo-src attribute.');

        this.template.querySelector('.logo-link trds-image').setAttribute('src', this.getAttribute('logo-src'));

        this.template.querySelector('trds-carousel').append(...this.children);

        this.append(this.template);

    }

}

customElements.define('trds-header', TrdsHeader);

TrdsElement.addStyle(`

    trds-modal{
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
        background-color: rgba(0,0,0,.72);
    }
    trds-modal.show{
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    trds-modal_container{
        display: block;
        width: 90%;
        max-width: var(--element--max-width);
        max-height: 100%;
        overflow: auto;
    }
    trds-modal_header{
        display: flex;
        align-items: center;
        padding: var(--space--m);
        box-sizing: border-box;
        background-color: var(--color--primary);
        justify-content: space-between;
    }
    trds-modal_body{
        display: block;
        padding: var(--space--l);
        box-sizing: border-box;
        background-color: var(--color--secondary-bg);
        overflow: auto;
        max-height: 90vh;
    }
    trds-modal_header trds-icon{
        flex-shrink: 0;
    }
    trds-modal_header trds-title{
        text-transform: uppercase;
        margin-right: var(--space--m);
        letter-spacing: 2px;
        font-weight: bold;
        font-size: var(--size--s) !important;
    }

`);

const TrdsModalTemplate = document.createElement('template');
TrdsModalTemplate.innerHTML = `
    <trds-modal_container>
        <trds-modal_header>
            <trds-title level="2"></trds-title>
            <trds-icon icon="solid/times" onclick="this.closest('trds-modal').close()"></trds-icon>
        </trds-modal_header>
        <trds-modal_body>
        </trds-modal_body>
    </trds-modal_container>
`;

class TrdsModal extends TrdsElement{

    constructor(){
        super();

        this.template = TrdsModalTemplate.content.cloneNode(true);

    }

    connectedCallback(){

        super.connectedCallback();

        if(this.hasAttribute('showonfirsthit') && sessionStorage.getItem('popup') != 'true'){
            this.show();
            sessionStorage.setItem('popup', 'true');
        }
        
    }

    render(){

        this.template.querySelector('trds-modal_body').append(...this.children);
        this.template.querySelector('trds-modal_header trds-title').textContent = this.getAttribute('title');

        this.append(this.template);

    }

    show = () => {

        let currentModal = document.querySelector('trds-modal.show');
        if(currentModal) currentModal.close();
        
        this.classList.add('show');

        window.addEventListener('click', this.outsideClick);

    }

    close = () => {
        this.classList.remove('show');
        window.removeEventListener('click', this.outsideClick);
    }

    outsideClick = e => {

        if(e.target.matches('trds-modal'))
            this.close();

    }
    
}

customElements.define('trds-modal', TrdsModal);

TrdsElement.addStyle(`
    trds-showcase{
        display: block;
        max-width: var(--element--max-width);
        position: relative;
        background-color: var(--color--secondary-bg);
    }
    trds-showcase_before,
    trds-showcase_after{
        display: block;
        transition: opacity .5s;
        position: relative;
    }
    trds-showcase_before:before,
    trds-showcase_after:before{
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
    trds-showcase_after:before{
        content: 'Utána';
    }
    trds-showcase_after{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    trds-showcase.active trds-showcase_after{
        opacity: 1;
    }
    trds-showcase.active trds-showcase_before{
        opacity: 0;
    }
    trds-showcase trds-image{
        object-fit: cover;
    }
`);

class TrdsShowcase extends TrdsElement{

    constructor(){
        super();
    }

    connectedCallback(){

        super.connectedCallback();
        this.addEventListener('click', this.toggleAfterImg);

    }

    disconnectedCallback(){

        this.removeEventListener('click', this.toggleAfterImg);

    }

    render(){

        this.innerHTML = `
            <trds-showcase_before>
                <trds-image alt="Javítás előtti kép" lazy src="${this.getAttribute('before-image-url')}"></trds-image>
            </trds-showcase_before>
            <trds-showcase_after>
                <trds-image alt="Javítás utáni kép" lazy src="${this.getAttribute('after-image-url')}"></trds-image>
            </trds-showcase_after>
        `;

    }

    toggleAfterImg = () => {
        this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active');
    }

}

customElements.define('trds-showcase', TrdsShowcase);

TrdsElement.addStyle(`

    trds-timeline{
        display: grid;
        border-left: 3px solid var(--color--primary);
        gap: var(--space--xl);
        padding-left: 2rem;
        margin-left: 1rem;
        box-sizing: border-box;
        position: relative;
    }

    trds-timeline.row-oriented{
        grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
        border-left: none;
        border-top: 3px solid var(--color--primary);
        padding-left: 0;
        margin-left: 0;
        padding-top: 3rem;
    }

    trds-timeline_finish-flag{
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

    trds-timeline.row-oriented trds-timeline_finish-flag{
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

    trds-timeline_step{
        display: block;
        position: relative;
    }

    trds-timeline_step:last-of-type{
        padding-bottom: 2.85rem;
    }

    trds-timeline.row-oriented trds-timeline_step:last-of-type{
        padding-bottom: 0;
    }

    trds-timeline_step:before{
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

    trds-timeline_step[digit-number="3"]:before{
        font-size: var(--size--s);
    }

    trds-timeline_step[digit-number="4"]:before{
        font-size: var(--size--xs);
    }

    trds-timeline.row-oriented trds-timeline_step:before{
        top: -4.1rem;
        left: auto;
    }

`);

const TrdsTimelineTemplate = document.createElement('template');
TrdsTimelineTemplate.innerHTML = `
    <trds-timeline_finish-flag>
        <trds-icon icon="solid/flag-checkered"></trds-icon>
    </trds-timeline_finish-flag>
`;

class TrdsTimeline extends TrdsElement{
    
    constructor(){ 
        super();

        this.template = TrdsTimelineTemplate.content.cloneNode(true);

    }

    render(){

        [...this.children].forEach(child => {

            this.template.insertBefore(child, this.template.querySelector('trds-timeline_finish-flag'));

        });

        this.append(this.template);

        this.TimelineSteps =  this.querySelectorAll('trds-timeline_step');

        this.TimelineSteps.forEach(elem => {
            if(!elem.hasAttribute('number'))
                return console.error("Number attribute must be added to trds-timeline_step component.");
            if(elem.getAttribute('number').length > 4)
                return console.error("Number attribute should not exceed 4 digits.");

            elem.setAttribute( 'digit-number', elem.getAttribute('number').length);
        });

        this.setTimeline();

    }

    connectedCallback(){

        super.connectedCallback();

        window.addEventListener('resize', this.setTimeline);

    }

    disconnectedCallback(){

        window.removeEventListener('resize', this.setTimeline);

    }

    setTimeline = () => {

        (this.parentElement.getBoundingClientRect().width / 400) >= this.TimelineSteps.length ? this.classList.add('row-oriented') : this.classList.remove('row-oriented');

    }

}

customElements.define('trds-timeline', TrdsTimeline);

TrdsElement.addStyle(`

    trds-toasts-container{
        display: grid;
        width: 90%;
        max-width: var(--element--max-width);
        gap: var(--space--m);
        position: fixed;
        z-index: 100;
        bottom: var(--space--m);
        left: 5%;
    }

    trds-toast{
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        max-width: var(--element--max-width);
        padding: var(--space--m);
        background-color: var(--color--secondary-bg);
        animation: TrdsToastAnimation .5s;
        gap: var(--space--m);
    }

    @keyframes TrdsToastAnimation{
        from { transform: translateY(100vh) }
        to { transform: translateY(0) }
    }

    trds-toast.danger{
        background-color: var(--color--primary);
    }

    trds-toast.success{
        background-color: var(--color--success);
    }

    trds-toast_content{
        display: block;
        flex: 1;
    }

    trds-toast_close-icon-container{
        display: block;
    }

`);

const TrdsToastTemplate = document.createElement('template');
TrdsToastTemplate.innerHTML = `
    <trds-toast_content>
    </trds-toast_content>
    <trds-toast_close-icon-container>
        <trds-icon icon="solid/times" onclick="this.closest('trds-toast').remove()"></trds-icon>
    </trds-toast_close-icon-container>
`;

class TrdsToast extends TrdsElement{

    constructor(){ 
        super();

        this.template = TrdsToastTemplate.content.cloneNode(true);

    }

    connectedCallback(){

        super.connectedCallback();

        setTimeout(() => {
            this.remove();
        }, 10000);

    }

    render(){

        this.template.querySelector('trds-toast_content').append(...this.childNodes);

        this.append(this.template);

    }

    show = (options) => {

        if(options && options.hasOwnProperty('after'))
            options.after.parentNode.insertBefore(this, options.after.nextSibling);
        else if(options && options.hasOwnProperty('before'))
            options.before.parentNode.insertBefore(this, options.before);
        else {
            
            if(document.body.querySelectorAll('trds-toasts-container trds-toast').length === 0)
                document.body.appendChild(document.createElement('trds-toasts-container'));
            
            document.body.querySelector('trds-toasts-container').appendChild(this);

        } 

    }

}

customElements.define('trds-toast', TrdsToast);

// usage: trds-workmedia [ALL REQUIRED, before-media-type(image or video), before-media-src, after-media-type(image or video), after-media-src, category(string), tags(stringy array lol)]

TrdsElement.addStyle(`

    trds-workmedia{
        display: block;
        background-color: var(--color--secondary-bg);
        max-width: var(--element--max-width);
        position: relative;
    }

    trds-workmedia_media{
        display: block;
        overflow: hidden;
        position: relative;
        background-color: black;
        padding-bottom: 56.25%;
    }

    trds-workmedia_media_before,
    trds-workmedia_media_after{
        display: block;
        transition: opacity .5s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    trds-workmedia_media_after{
        z-index: 0;
        opacity: 0;
    }

    trds-workmedia_media video{
        height: 100% !important;
        width: 100%;
    }

    trds-workmedia.after-media-active trds-workmedia_media_after{
        opacity: 1;
        z-index: 2;
    }

    trds-workmedia.after-media-active trds-workmedia_media_before{
        opacity: 0;
    }

`);

const TrdsWorkmediaTemplate = document.createElement('template');
TrdsWorkmediaTemplate.innerHTML = `

    <trds-workmedia_media>
        <trds-workmedia_media_before>
        </trds-workmedia_media_before>
        <trds-workmedia_media_after>
        </trds-workmedia_media_after>
    </trds-workmedia_media>

    <trds-stack style="gap: var(--space--l); padding: var(--space--l)">
        <trds-grid class="auto-width-layout" style="gap: var(--space--s)">
            <button 
                is="trds-button"
                text="Előtte"
                onclick="this.closest('trds-workmedia').toggleBefore()"
            ></button>
            <button 
                is="trds-button"
                class="outline"
                text="Utána"
                onclick="this.closest('trds-workmedia').toggleAfter()"
            ></button>
        </trds-grid>
        <trds-stack>
            <trds-stack style="gap:var(--space--xs)">
                <trds-title level="2" class="variant--1">Kategória</trds-title>
                <span class="size--xl category" style="font-weight: bold"></span>
            </trds-stack>
            <trds-stack style="gap:var(--space--xs)">
                <trds-title level="2" class="variant--1">Tagek</trds-title>
                <trds-grid class="auto-width-layout tags-grid"></trds-grid>
            </trds-stack>
        </trds-stack>
    </trds-stack>

`;

class TrdsWorkmedia extends TrdsElement{

    constructor(){
        super();

        this.template = TrdsWorkmediaTemplate.content.cloneNode(true);
        this.BeforeToggler = this.template.querySelector('button[text="Előtte"]');
        this.AfterToggler = this.template.querySelector('button[text="Utána"]');

    }

    render(){

        this.beforeMediaType = this.getAttribute('before-media-type');
        this.afterMediaType = this.getAttribute('after-media-type');

        if(this.beforeMediaType === 'image'){

            this.BeforeMedia = document.createElement('trds-image');
            this.BeforeMedia.setAttribute('alt', 'Javítás előtt');
            this.BeforeMedia.setAttribute('lazy', '');
            this.BeforeMedia.setAttribute('src', this.getAttribute('before-media-src'));

        } else {

            this.BeforeMedia = document.createElement('video', {is: 'trds-video'});
            this.BeforeMedia.setAttribute('preload', 'metadata');
            this.BeforeMedia.setAttribute('onplay', 'this.closest("trds-workmedia").onPlay(this)');
            this.BeforeMedia.setAttribute('lazy-src', `${this.getAttribute('before-media-src')}#t=1`);
            this.BeforeMedia.setAttribute('controls', '');
            this.BeforeMedia.setAttribute('playsinline', '');
            this.BeforeMedia.muted = true;

        }

        if(this.afterMediaType === 'image'){

            this.AfterMedia = document.createElement('trds-image');
            this.AfterMedia.setAttribute('alt', 'Javítás után');
            this.AfterMedia.setAttribute('lazy', '');
            this.AfterMedia.setAttribute('src', this.getAttribute('after-media-src'));

        } else {

            this.AfterMedia = document.createElement('video', {is: 'trds-video'});
            this.AfterMedia.setAttribute('preload', 'metadata');
            this.AfterMedia.setAttribute('onplay', 'this.closest("trds-workmedia").onPlay(this)');
            this.AfterMedia.setAttribute('lazy-src', `${this.getAttribute('after-media-src')}#t=1`);
            this.AfterMedia.setAttribute('controls', '');
            this.AfterMedia.setAttribute('playsinline', '');
            this.AfterMedia.muted = true;

        }

        this.template.querySelector('trds-workmedia_media_before').appendChild(this.BeforeMedia);
        this.template.querySelector('trds-workmedia_media_after').appendChild(this.AfterMedia);

        this.template.querySelector('.category').textContent = this.getAttribute('category');

        const tags = this.getAttribute('tags').split(',');
        tags.forEach(tag => {
            const Tag = document.createElement('trds-tag');
            Tag.textContent = tag;
            Tag.classList.add('outline');
            this.template.querySelector('.tags-grid').appendChild(Tag);
        });

        this.appendChild(this.template);
    
    }

    toggleBefore(){

        this.BeforeToggler.classList.remove('outline');
        this.AfterToggler.classList.add('outline');
        this.classList.remove('after-media-active');

        if(this.beforeMediaType !== 'image'){

            this.BeforeMedia.play();

        }

    }

    toggleAfter(){

        this.AfterToggler.classList.remove('outline');
        this.BeforeToggler.classList.add('outline');
        this.classList.add('after-media-active');

        if(this.afterMediaType !== 'image'){

            this.AfterMedia.play();

        }

    }

    onPlay(video){

        if(TrdsWorkmedia.currentVideo){

            TrdsWorkmedia.currentVideo.pause();
            TrdsWorkmedia.currentVideo.currentTime = 0;

        }

        TrdsWorkmedia.currentVideo = video;

    }

    static currentVideo = null; 

}

customElements.define('trds-workmedia', TrdsWorkmedia);

//  usage: 

TrdsElement.addStyle(`

    trds-drawer{
        display: block;
    }

    trds-drawer_toggler{
        display: flex;
        width: max-content;
        gap: var(--space--s);
        align-items: center;
        margin-bottom: var(--space--s);
        cursor: pointer;
    }

    trds-drawer_toggler > *{
        flex: 0 1 auto;
    }

    trds-drawer .drawer-toggler-icon{
        transition: transform .5s;
    }

    trds-drawer.opened .drawer-toggler-icon{
        transform: rotate(180deg);
    }

    trds-drawer_drawer{
        display: block;
        height: 0;
        overflow: hidden;
    }

    trds-drawer.opened trds-drawer_drawer{
        height: auto;
    }

`);

class TrdsDrawer extends TrdsElement{

    constructor(){
        super();
    }

    render(){

        this.DrawerTogglerIcon = document.createElement('trds-icon');
        this.DrawerTogglerIcon.setAttribute('icon', 'solid/angle-down');
        this.DrawerTogglerIcon.classList.add('drawer-toggler-icon');

        this.DrawerToggler = this.querySelector('trds-drawer_toggler');

        this.DrawerToggler.appendChild(this.DrawerTogglerIcon);

    }

    connectedCallback(){
        super.connectedCallback();

        this.DrawerToggler.addEventListener('click', () => this.toggleDrawer());

    }

    disconnectedCallback(){
        this.DrawerToggler.removeEventListener('click', () => this.toggleDrawer());
    }

    toggleDrawer(){
        this.classList.contains('opened') ? 
            this.classList.remove('opened') : this.classList.add('opened');
    }

}

customElements.define('trds-drawer', TrdsDrawer);
