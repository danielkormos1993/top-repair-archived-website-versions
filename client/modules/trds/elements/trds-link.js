// usage: <trds-link class="block"> for block link
// usage: <trds-link class="text"> for text link
// it automatically adds rel noopener noreferrer if needed

import '../libs/wc-polyfill.js';
import TrdsElement from '../trds-element.js';

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

export default class TrdsLink extends HTMLAnchorElement{

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