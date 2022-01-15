// usage: <trds-link class="block"> for block link
// usage: <trds-link class="text"> for text link
// it automatically adds rel noopener noreferrer if needed

import '../libs/wc-polyfill.js';

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