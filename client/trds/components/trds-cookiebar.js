// usage: trds-cookiebar[cookie-name(required), cookie-value(required)]
// use at body > level
// add class .set-cookie-button to the cookie setter button
// put elements inside as youd like

import { setCookie, getCookie } from '../libs/cookies.js';
import '../layout/container.js';
import TrdsElement from '../trds-element.js';

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
        super()

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